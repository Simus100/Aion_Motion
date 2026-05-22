import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene2_BrandLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text = "Storie di archivi inesplorati.".split(" ");

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
          flexDirection: "row",
          gap: "24px",
          flexWrap: "wrap",
          padding: "0 100px",
        }}
      >
        {text.map((word, wordIndex) => {
          const delay = wordIndex * 15 + 10;

          const blurAmount = interpolate(
            frame - delay,
            [0, 30],
            [15, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const wordOpacity = interpolate(
            frame - delay,
            [0, 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const translateY = interpolate(
            spring({
              frame: frame - delay,
              fps,
              config: { damping: 200, mass: 1 },
            }),
            [0, 1],
            [30, 0]
          );

          return (
            <span
              key={`${word}-${wordIndex}`}
              style={{
                fontFamily,
                color: "#F2F2F2", // Bianco caldo / Grigio freddo chiaro
                fontSize: "72px",
                fontWeight: "400",
                letterSpacing: "0.02em",
                opacity: wordOpacity,
                filter: `blur(${blurAmount}px)`,
                transform: `translateY(${translateY}px)`,
                display: "inline-block",
                lineHeight: "1.2",
              }}
            >
              {word}
            </span>
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
