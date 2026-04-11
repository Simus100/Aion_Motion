## 2024-05-18 - [Memoizing Static Data in Remotion's Render Loop]
**Learning:** Remotion components re-render on every single frame. Static calculations like string splitting (e.g., `titleText.split(" ")`) will run continuously (e.g. 60 times a second), causing unnecessary CPU overhead and garbage collection during the video render.
**Action:** Always wrap derived data that doesn't depend on `useCurrentFrame()` in a `useMemo` hook to protect the hot render loop.
