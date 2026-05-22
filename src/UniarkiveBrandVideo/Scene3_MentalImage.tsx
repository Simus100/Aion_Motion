import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont();

export const Scene3_MentalImage: React.FC = () => {
  const frame = useCurrentFrame();

  const phrases = [
    "BIBLIOTECA SEGRETA.",
    "ARCHIVIO DIGITALE ELEGANTE.",
    "DOSSIER RISERVATO.",
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
            [startFrame, startFrame + 20, endFrame - 20, endFrame],
            [0, 1, 1, 0],
            {
              easing: Easing.inOut(Easing.ease),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Subtle tracking effect (expanding letter spacing slightly over time)
          const letterSpacingAmount = interpolate(
            frame,
            [startFrame, endFrame],
            [0.15, 0.25],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <AbsoluteFill
              key={phrase}
              style={{
                justifyContent: "center",
                alignItems: "center",
                opacity,
              }}
            >
              <span
                style={{
                  fontFamily,
                  color: "#9CA3AF", // Cold Grey
                  fontSize: "36px",
                  fontWeight: "300",
                  letterSpacing: `${letterSpacingAmount}em`,
                }}
              >
                {phrase}
              </span>
            </AbsoluteFill>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
