## 2024-04-09 - [Memoize derived state in Remotion]
**Learning:** Remotion components re-render on every single frame up to 60 times a second. String splitting or other derived state calculation in the render loop without memoization will be re-executed constantly, harming performance.
**Action:** Always wrap derived data or static calculations that don't depend on the current frame in `useMemo` to protect the hot render loop in Remotion projects.
