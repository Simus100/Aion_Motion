import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene3_MentalImage: React.FC = () => {
  const frame = useCurrentFrame();

  const phrases = [
    "Biblioteca segreta.",
    "Archivio digitale elegante.",
    "Dossier riservato."
  ];

  const phraseDuration = 90; // Frames per phrase

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050814",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {phrases.map((phrase, index) => {
          const startFrame = index * phraseDuration;
          const endFrame = startFrame + phraseDuration;

          const opacity = interpolate(
            frame,
            [startFrame, startFrame + 15, endFrame - 15, endFrame],
            [0, 1, 1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const scale = interpolate(
            frame,
            [startFrame, endFrame],
            [0.95, 1.05],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <AbsoluteFill
              key={phrase}
              style={{
                justifyContent: "center",
                alignItems: "center",
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <span
                style={{
                  fontFamily,
                  color: "#9CA3AF", // Grigio freddo
                  fontSize: "64px",
                  fontWeight: "400",
                  letterSpacing: "0.05em",
                }}
              >
                {phrase}
              </span>
            </AbsoluteFill>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.8)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
