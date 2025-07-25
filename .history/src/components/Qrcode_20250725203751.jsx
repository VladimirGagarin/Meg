import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";
import Logo from "../assets/images/quuen.jpeg";

export default function QRWithLogo() {
  const canvasRef = useRef(null);
  const logoSrc = "/your-logo.png"; // place your logo in public folder or use URL

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Step 1: Generate QR Code to canvas
    QRCode.toCanvas(
      canvas,
      "https://example.com",
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
