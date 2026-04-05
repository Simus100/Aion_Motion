import { AbsoluteFill, Sequence, useVideoConfig, useCurrentFrame, Img } from "remotion";

const Scene = ({ sceneData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: sceneData.backgroundColor || "white",
        justifyContent: "center",
        alignItems: "center",
        color: sceneData.textColor || "black",
        fontFamily: "sans-serif",
      }}
    >
      {sceneData.text && (
        <div style={{ fontSize: sceneData.fontSize || 80, textAlign: "center", zIndex: 1 }}>
          {sceneData.text}
        </div>
      )}
      {sceneData.image && (
        <Img
          src={sceneData.image}
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", opacity: sceneData.imageOpacity || 1 }}
        />
      )}
    </AbsoluteFill>
  );
};

export const DynamicComposition = ({ scenes }) => {
  const { fps } = useVideoConfig();

  let accumulatedFrames = 0;

  return (
    <AbsoluteFill>
      {scenes.map((scene, index) => {
        const duration = scene.durationInSeconds * fps;
        const startFrame = accumulatedFrames;
        accumulatedFrames += duration;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={duration}
          >
            <Scene sceneData={scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
