import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_BrandLine } from "./Scene2_BrandLine";
import { Scene3_MentalImage } from "./Scene3_MentalImage";
import { Scene4_Tagline } from "./Scene4_Tagline";
import { Scene5_CTA } from "./Scene5_CTA";

export const UniarkiveBrandVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={120}>
        <Scene1_Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={150}>
        <Scene2_BrandLine />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={270}>
        <Scene3_MentalImage />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={180}>
        <Scene4_Tagline />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={150}>
        <Scene5_CTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
