export type SceneType = 'title' | 'media' | 'split' | 'quote' | 'bullets';
export type AnimationStyle = 'fade-up' | 'scale-in' | 'typewriter' | 'blur-in' | 'reveal' | 'none';
export type TransitionType = 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'none';

export type BackgroundType = 'solid' | 'gradient' | 'noise';

export interface BackgroundConfig {
  type: BackgroundType;
  color1?: string;
  color2?: string;
  opacity?: number;
}

export interface BaseSceneData {
  id: string;
  type: SceneType;
  durationInFrames: number;
  transitionIn?: TransitionType;
}

export interface TitleSceneData extends BaseSceneData {
  type: 'title';
  title: string;
  subtitle?: string;
  textColor?: string;
  backgroundColor?: string;
  backgroundConfig?: BackgroundConfig;
  animationStyle?: AnimationStyle;
}

export interface MediaSceneData extends BaseSceneData {
  type: 'media';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  overlayText?: string;
  overlayAnimation?: AnimationStyle;
  kenBurns?: boolean;
}

export interface SplitSceneData extends BaseSceneData {
  type: 'split';
  leftText: string;
  rightMediaUrl: string;
  rightMediaType: 'image' | 'video';
  backgroundColor?: string;
  backgroundConfig?: BackgroundConfig;
}

export interface QuoteSceneData extends BaseSceneData {
  type: 'quote';
  quote: string;
  author?: string;
  textColor?: string;
  backgroundColor?: string;
  backgroundConfig?: BackgroundConfig;
  animationStyle?: AnimationStyle;
}

export interface BulletsSceneData extends BaseSceneData {
  type: 'bullets';
  title: string;
  bullets: string[];
  textColor?: string;
  backgroundColor?: string;
  backgroundConfig?: BackgroundConfig;
  animationStyle?: AnimationStyle;
}

export type SceneData = TitleSceneData | MediaSceneData | SplitSceneData | QuoteSceneData | BulletsSceneData;

export interface VideoScript {
  id: string;
  title: string;
  audioUrl?: string;
  audioVolume?: number;
  scenes: SceneData[];
}
