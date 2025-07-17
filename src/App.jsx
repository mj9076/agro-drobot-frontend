// src/App.jsx

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

// Custom Components
import SensorDataCard from "./components/SensorDataCard";
import AIDataCard from "./components/AIDataCard";
import SoilChart from "./components/SoilChart";
import RobotMap from "./components/RobotMap";
import SplashScreen from "./components/SplashScreen";
import PiCameraFeed from "./components/PiCameraFeed";
import LoRaMessages from "./components/LoRaMessages";

import "./index.css";

const BACKEND_SERVER_URL = "http://localhost:8080";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const [sensorData, setSensorData] = useState({
    temperature: "--",
    humidity: "--",
    rainfall: "--",
    soil_moisture: "--",
    ultrasonic: "--",
    acceleration: "--",
    motion: "None",
  });

  const [aiData, setAiData] = useState({
    disease: { name: "N/A", confidence: "N/A" },
    yield: { predicted: "N/A", recommendations: "N/A" },
    weed: "N/A",
  });

  const [soilNutrients, setSoilNutrients] = useState({
    n: 80,
    p: 40,
    k: 60,
    ph: 6.5,
  });

  const [robotLocation, setRobotLocation] = useState({
    lat: 31.4677,
    lon: 74.2728,
  });

  const [loraMessageInput, setLoraMessageInput] = useState("");
  const [selectedLoRa, setSelectedLoRa] = useState("lora1");

  const [connectionStatus, setConnectionStatus] = useState(
    "Connecting to Backend Server..."
  );
  const [error, setError] = useState("");
  const [socketClient, setSocketClient] = useState(null);
  const [isSendingCommand, setIsSendingCommand] = useState(false);

  const [lora1Messages, setLora1Messages] = useState({
    received: [],
    sent: [],
  });

  const [lora2Messages, setLora2Messages] = useState({
    received: [],
    sent: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const socket = io(BACKEND_SERVER_URL, {
      path: "/socket.io",
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    setSocketClient(socket);

    socket.on("connect", () => {
      setConnectionStatus("Connected to Backend Server ✅");
      setError("");
    });

    socket.on("sensorDataUpdate", (data) => {
      setSensorData((prev) => ({
        ...prev,
        temperature: formatFloat(data.temperature, prev.temperature),
        humidity: formatFloat(data.humidity, prev.humidity),
        rainfall: data.rainfall || prev.rainfall,
        soil_moisture: formatFloat(data.soil_moisture, prev.soil_moisture),
        ultrasonic: formatFloat(data.ultrasonic, prev.ultrasonic),
        acceleration: formatFloat(data.acceleration, prev.acceleration),
        motion:
          String(data.motion).toLowerCase() === "1" ||
          String(data.motion).toLowerCase() === "true" ||
          String(data.motion).toLowerCase() === "detected"
            ? "Detected"
            : "None",
      }));

      if (data.latitude && data.longitude) {
        setRobotLocation({
          lat: parseFloat(data.latitude),
          lon: parseFloat(data.longitude),
        });
      }

      setAiData((prev) => {
        const updated = { ...prev };
        if (data.diseaseName) updated.disease.name = data.diseaseName;
        if (data.diseaseConfidence)
          updated.disease.confidence = data.diseaseConfidence;
        if (data.yieldPredicted)
          updated.yield.predicted = data.yieldPredicted;
        if (data.yieldRecommendations)
          updated.yield.recommendations = data.yieldRecommendations;
        if (data.weedDetection) updated.weed = data.weedDetection;
        return updated;
      });

      setSoilNutrients((prev) => ({
        ...prev,
        n: data.n !== undefined ? parseFloat(data.n) : prev.n,
        p: data.p !== undefined ? parseFloat(data.p) : prev.p,
        k: data.k !== undefined ? parseFloat(data.k) : prev.k,
        ph: data.ph !== undefined ? parseFloat(data.ph) : prev.ph,
      }));
    });

    socket.on("lora1Message", (msg) => {
      setLora1Messages((prev) => ({
        ...prev,
        received: [...prev.received, msg],
      }));
    });

    socket.on("lora2Message", (msg) => {
      setLora2Messages((prev) => ({
        ...prev,
        received: [...prev.received, msg],
      }));
    });

    socket.on("disconnect", () => {
      setConnectionStatus("Disconnected ❌");
      setError("Disconnected from server. Attempting to reconnect...");
    });

    socket.on("connect_error", (err) => {
      setConnectionStatus("Disconnected ❌");
      setError(
        `Connection failed: ${err.message}. Check backend URL ${BACKEND_SERVER_URL}`
      );
    });

    socket.on("commandStatus", (status) => {
      setIsSendingCommand(false);
      alert(status.success ? status.message : `Failed: ${status.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendCommand = (actionType) => {
    if (socketClient && socketClient.connected) {
      setIsSendingCommand(true);
      socketClient.emit("sendCommand", { command: actionType });
    } else {
      alert("Socket.IO client not connected.");
    }
  };

  const sendLoRaMessage = () => {
    if (!loraMessageInput.trim()) {
      alert("Please enter a message.");
      return;
    }

    const payload = {
      command: "LORA",
      message: loraMessageInput,
      from: selectedLoRa,
    };

    if (socketClient && socketClient.connected) {
      setIsSendingCommand(true);
      socketClient.emit("sendCommand", payload);

      if (selectedLoRa === "lora1") {
        setLora1Messages((prev) => ({
          ...prev,
          sent: [...prev.sent, loraMessageInput],
        }));
        setLora2Messages((prev) => ({
          ...prev,
          received: [...prev.received, loraMessageInput],
        }));
      } else {
        setLora2Messages((prev) => ({
          ...prev,
          sent: [...prev.sent, loraMessageInput],
        }));
        setLora1Messages((prev) => ({
          ...prev,
          received: [...prev.received, loraMessageInput],
        }));
      }

      setLoraMessageInput("");
    } else {
      alert("Socket.IO client not connected.");
    }
  };

  return (
    <>
      {/* ✅ Logo at top-right corner */}
      <img src="/logo.png" alt="Logo" className="logo-top-right" />

      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <SplashScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <Box sx={styles.body}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          >
            <source src="/harvester.mp4" type="video/mp4" />
          </video>

          <Box sx={styles.overlay}>
            <Container maxWidth="lg">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography variant="h3" sx={styles.heading}>
                  AI Based Agro Drobot
                </Typography>
              </motion.div>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: connectionStatus.includes("Connected")
                      ? "#aee571"
                      : connectionStatus.includes("Connecting")
                      ? "#ffc107"
                      : "#f44336",
                    mr: 1,
                  }}
                >
                  Status: {connectionStatus}
                </Typography>
                {connectionStatus.includes("Connecting") && (
                  <CircularProgress size={16} sx={{ color: "#ffc107" }} />
                )}
                {connectionStatus.includes("Connected") && (
                  <Box sx={{ fontSize: 20 }}>✅</Box>
                )}
                {connectionStatus.includes("Disconnected") && (
                  <Box sx={{ fontSize: 20 }}>❌</Box>
                )}
              </Box>

              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}

              <AnimatedSection title="📍 Robot Location & Pi Camera">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <RobotMap
                      lat={robotLocation.lat}
                      lon={robotLocation.lon}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <PiCameraFeed />
                  </Grid>
                </Grid>
              </AnimatedSection>

              <AnimatedSection title="📡 Real-Time Sensor Data">
                <Grid container spacing={2}>
                  {[
                    {
                      title: "Temperature",
                      value: sensorData.temperature,
                      unit: "°C",
                      icon: "🌡",
                    },
                    {
                      title: "Humidity",
                      value: sensorData.humidity,
                      unit: "%",
                      icon: "💧",
                    },
                    {
                      title: "Rain Status",
                      value: sensorData.rainfall,
                      unit: "",
                      icon: "☔",
                    },
                    {
                      title: "Soil Moisture",
                      value: sensorData.soil_moisture,
                      unit: "ADC",
                      icon: "🌱",
                    },
                    {
                      title: "Ultrasonic Distance",
                      value: sensorData.ultrasonic,
                      unit: "cm",
                      icon: "📏",
                    },
                    {
                      title: "Motion Detection",
                      value: sensorData.motion,
                      unit: "",
                      icon: "📦",
                    },
                    {
                      title: "Acceleration",
                      value: sensorData.acceleration,
                      unit: "",
                      icon: "📈",
                    },
                  ].map((item, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <SensorDataCard {...item} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </AnimatedSection>

              <AnimatedSection title="🧠 AI Model Results">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <AIDataCard
                      title="Crop Disease Detection"
                      icon="🦠"
                      result={`${aiData.disease.name} (Conf: ${aiData.disease.confidence})`}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <AIDataCard
                      title="Yield Prediction"
                      icon="🌾"
                      result={aiData.yield.predicted}
                      recommendation={aiData.yield.recommendations}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <AIDataCard
                      title="Weed Detection"
                      icon="🌿"
                      result={aiData.weed}
                    />
                  </Grid>
                </Grid>
              </AnimatedSection>

              <AnimatedSection title="🧪 Soil Nutrients">
                <Box sx={{ height: 300 }}>
                  <SoilChart {...soilNutrients} />
                </Box>
              </AnimatedSection>

              <AnimatedSection title="🚁 Drone Commands">
                <Button
                  variant="contained"
                  sx={styles.button}
                  onClick={() => sendCommand("seed")}
                  disabled={isSendingCommand}
                >
                  Drop Seeds
                </Button>
                <Button
                  variant="contained"
                  sx={styles.button}
                  onClick={() => sendCommand("spray")}
                  disabled={isSendingCommand}
                >
                  Spray Pesticide
                </Button>
              </AnimatedSection>

              <AnimatedSection title="📡 Send LoRa Message">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl size="small" sx={{ mr: 2, minWidth: 120 }}>
                    <InputLabel id="lora-select-label" sx={{ color: "#fff" }}>
                      From
                    </InputLabel>
                    <Select
                      labelId="lora-select-label"
                      value={selectedLoRa}
                      label="From"
                      onChange={(e) => setSelectedLoRa(e.target.value)}
                      sx={{
                        color: "#fff",
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.3)",
                        },
                      }}
                    >
                      <MenuItem value="lora1">LoRa 1</MenuItem>
                      <MenuItem value="lora2">LoRa 2</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Type message"
                    value={loraMessageInput}
                    onChange={(e) => setLoraMessageInput(e.target.value)}
                    placeholder="Your message for LoRa"
                    sx={styles.input}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    disabled={isSendingCommand}
                  />
                  <Button
                    variant="contained"
                    sx={styles.button}
                    onClick={sendLoRaMessage}
                    disabled={isSendingCommand}
                  >
                    Send
                  </Button>
                </Box>
              </AnimatedSection>

              <AnimatedSection title="📡 LoRa Messages">
                <LoRaMessages
                  lora1={lora1Messages}
                  lora2={lora2Messages}
                />
              </AnimatedSection>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
};

const AnimatedSection = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Paper sx={styles.section}>
      <Typography variant="h5" sx={styles.subheading}>
        {title}
      </Typography>
      {children}
    </Paper>
  </motion.div>
);

const formatFloat = (value, fallback = "--") =>
  value !== undefined && value !== null && !isNaN(value)
    ? parseFloat(value).toFixed(2)
    : fallback;

const styles = {
  body: {
    fontFamily: "Roboto, sans-serif",
    minHeight: "100vh",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    minHeight: "100vh",
    padding: "40px 0",
  },
  heading: {
    background: "linear-gradient(90deg, #2196f3, #1976d2)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 800,
    fontSize: "3.2rem",
    textAlign: "center",
    marginBottom: "30px",
  },
  subheading: {
    color: "#aee571",
    fontWeight: 600,
    marginBottom: "16px",
  },
  section: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    padding: "24px 30px",
    marginBottom: "30px",
    backdropFilter: "blur(10px)",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#66bb6a",
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  input: {
    width: "300px",
    "& .MuiOutlinedInput-root": {
      color: "#ffffff",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: "8px",
    },
    "& .MuiInputLabel-root": {
      color: "#ffffff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(255,255,255,0.3)",
    },
  },
};

export default App;
