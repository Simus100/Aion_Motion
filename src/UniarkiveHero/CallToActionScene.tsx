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

export const CallToActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Esplora il nostro catalogo"
  const text = "Esplora il nostro catalogo".split(" ");

  // Background fade-in
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        // A sophisticated ivory background with a subtle darker vignette in the center
        background: "radial-gradient(circle at center, #FFFFF0 0%, #E8E8DD 100%)",
        opacity: bgOpacity,
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
          // Staggered delay for each word
          const delay = wordIndex * 15 + 20;

          // Blur effect
          const blurAmount = interpolate(
            frame - delay,
            [0, 30],
            [20, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Opacity fade in
          const wordOpacity = interpolate(
            frame - delay,
            [0, 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Spring physics for translation Y
          const translateY = interpolate(
            spring({
              frame: frame - delay,
              fps,
              config: { damping: 200, mass: 1 },
            }),
            [0, 1],
            [40, 0]
          );

          return (
            <span
              key={`${word}-${wordIndex}`}
              style={{
                fontFamily,
                color: "#1A1A1A", // Off-black for a softer editorial look
                fontSize: "72px",
                fontWeight: "500",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
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

      {/* A subtle cinematic overlay (noise/grain effect could go here, but keeping it CSS only for elegance) */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.03)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
