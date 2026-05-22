import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily } = loadFont();

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [15, 60], [0, 1], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blurAmount = interpolate(frame, [15, 75], [10, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow continuous zoom-in (Dolly effect)
  const scale = interpolate(frame, [0, 150], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          transform: `scale(${scale})`,
        }}
      >
        <span
          style={{
            fontFamily,
            color: "#C5A059", // Pale Gold
            fontSize: "130px",
            fontWeight: "400",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: textOpacity,
            filter: `blur(${blurAmount}px)`,
          }}
        >
          UNIARKIVE
        </span>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
