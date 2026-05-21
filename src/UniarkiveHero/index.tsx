import React from "react";
import { Series } from "remotion";
import { CallToActionScene } from "./CallToActionScene";

export const UniarkiveHero: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={300}>
        <CallToActionScene />
      </Series.Sequence>
    </Series>
  );
};
