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

  // Subtle entrance animation
  const opacity = interpolate(
    frame,
    [30, 90], // Starts fading in at 1 second, fully visible at 3 seconds
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = spring({
    fps,
    frame: frame - 30,
    config: {
      damping: 200,
      stiffness: 10,
    },
    durationInFrames: 200,
  });

  const animatedScale = interpolate(scale, [0, 1], [0.95, 1]);

  // Letters animation (Optional: making the letters slightly spread out as they enter)
  const letterSpacing = interpolate(
    frame,
    [30, 150],
    [0.2, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFF0", // Ivory
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity,
          transform: `scale(${animatedScale})`,
        }}
      >
        <h1
          style={{
            fontFamily,
            color: "#000000",
            fontSize: "80px",
            fontWeight: "400",
            letterSpacing: `${letterSpacing}em`,
            textAlign: "center",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Esplora il nostro catalogo
        </h1>
      </AbsoluteFill>

      {/* Atmospheric audio track - we will place a dummy file or fetch one */}
      {/* <Audio src={staticFile("atmospheric.mp3")} volume={0.5} /> */}
    </AbsoluteFill>
  );
};
