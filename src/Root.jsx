import "./index.css";
import { Composition } from "remotion";
import { BookTrailer } from "./BookTrailer";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="BookTrailer"
        component={BookTrailer}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
