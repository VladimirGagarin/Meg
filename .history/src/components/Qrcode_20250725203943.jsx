import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import Logo from "../assets/images/quuen.jpeg";

export default function QRWithLogo() {
  const canvasRef = useRef(null);
  const logoSrc = Logo;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Step 1: Generate QR Code to canvas
    QRCode.toCanvas(
      canvas,
      "https://github.com/VladimirGagarin/roses-of-rome/releases/download/v.1.0.1/application-490c4c6a-8b27-4c78-a6c7-884413dabbfb.apk",
      {
        errorCorrectionLevel: "H", // High to allow logo overlay
        width: 300,
        margin: 1,
      },
      (err) => {
        if (err) return console.error(err);

        // Step 2: Draw logo at center
        const logo = new Image();
        logo.src = logoSrc;
        logo.onload = () => {
          const logoSize = 60; // Adjust size of logo
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;
          ctx.drawImage(logo, x, y, logoSize, logoSize);
        };
      }
    );
  }, []);

  return <canvas ref={canvasRef} />;
}
