import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Arc } from "./Arc";
import { Atom } from "./Atom";

export const Logo = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  // Bolt ⚡: Removed redundant rotationDevelopment as it was identical to development
  const development = spring({
    config: {
      damping: 100,
      mass: 0.5,
    },
    fps: videoConfig.fps,
    frame,
  });

  const scale = spring({
    frame,
    config: {
      mass: 0.5,
    },
    fps: videoConfig.fps,
  });

  const logoRotation = interpolate(
    frame,
    [0, videoConfig.durationInFrames],
    [0, 360],
  );

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) rotate(${logoRotation}deg)`,
      }}
    >
      <Arc
        rotateProgress={development}
        progress={development}
        rotation={30}
      />
      <Arc
        rotateProgress={development}
        rotation={90}
        progress={development}
      />
      <Arc
        rotateProgress={development}
        rotation={-30}
        progress={development}
      />
      <Atom scale={development} />
    </AbsoluteFill>
  );
};
