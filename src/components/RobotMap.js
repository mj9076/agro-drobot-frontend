// src/components/RobotMap.jsx

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const RobotMap = ({ lat, lon, height = 200 }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!lat || !lon) return <div>Waiting for GPS location...</div>;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "rgba(30, 60, 120, 0.4)",
        border: "1px solid rgba(100, 180, 255, 0.4)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "16px",
        color: "#ffffff",
        fontFamily: "Roboto, sans-serif",
        boxShadow: "0 0 20px rgba(0, 128, 255, 0.3)",
        width: "100%",
        height: isFullscreen ? "90vh" : "auto",
        zIndex: isFullscreen ? 1000 : "auto",
      }}
    >
      <div
        style={{
          marginBottom: "12px",
          fontSize: "1.2rem",
          color: "#64b5f6",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Robot Location Map
      </div>

      <IconButton
        onClick={toggleFullscreen}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(0,0,0,0.3)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          zIndex: 1001,
        }}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>

      <div
        style={{
          height: isFullscreen ? "calc(90vh - 80px)" : `${height}px`,
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        <MapContainer
          center={[lat, lon]}
          zoom={16}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>
              Lat: {lat.toFixed(5)} <br />
              Lon: {lon.toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {!isFullscreen && (
        <div style={{ textAlign: "center", fontSize: "1rem" }}>
          <div><strong>Latitude:</strong> {lat.toFixed(5)}</div>
          <div><strong>Longitude:</strong> {lon.toFixed(5)}</div>
        </div>
      )}
    </div>
  );
};

export default RobotMap;
