import "./index.css";
import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";
import { UniversalisPromo } from "./UniversalisPromo/index";
import { UniarkiveHero } from "./UniarkiveHero/index";
import { UniarkiveBrandVideo } from "./UniarkiveBrandVideo/index";
import { DirectorComposition } from "./DirectorFramework/DirectorComposition";
import { VideoScript } from "./DirectorFramework/schema";
import exampleScriptData from "./DirectorFramework/exampleScript.json";

const exampleScript = exampleScriptData as VideoScript;

const calculateTotalDuration = (script: VideoScript) => {
  return script.scenes.reduce((acc, scene) => acc + scene.durationInFrames, 0);
};

const DIRECTOR_FORMATS = [
  { id: "DirectorHorizontal", width: 1920, height: 1080 },
  { id: "DirectorVertical", width: 1080, height: 1920 },
  { id: "DirectorSquare", width: 1080, height: 1080 },
];

export const RemotionRoot: React.FC = () => {
  const durationInFrames = calculateTotalDuration(exampleScript) || 300;

  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="UniarkiveBrandVideo"
        component={UniarkiveBrandVideo}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="UniarkiveHero"
        component={UniarkiveHero}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="UniversalisPromo"
        component={UniversalisPromo}
        durationInFrames={1155}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Director Framework Compositions */}
      {DIRECTOR_FORMATS.map((format) => (
        <Composition
          key={format.id}
          id={format.id}
          component={DirectorComposition}
          durationInFrames={durationInFrames}
          fps={30}
          width={format.width}
          height={format.height}
          defaultProps={{ script: exampleScript }}
        />
      ))}
    </>
  );
};
