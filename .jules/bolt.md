## 2026-04-12 - Memoization in Remotion Render Loop
**Learning:** Remotion components re-render on every single frame. This means any unmemoized derived data (like string splitting or map/filter operations) will allocate new memory per frame, causing significant garbage collection overhead during playback or rendering.
**Action:** Protect the hot render loop by eagerly memoizing static derivations using `useMemo` that don't depend on `useCurrentFrame()`.
