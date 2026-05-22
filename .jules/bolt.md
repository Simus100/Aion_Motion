## 2025-02-09 - Remotion Render Loop Array Allocation
 **Learning:** Creating static arrays inside Remotion render loops (e.g., `new Array(10).fill(0)`) triggers unnecessary garbage collection and CPU overhead because Remotion components re-render on every frame.
 **Action:** Extract static array allocations or other non-frame-dependent calculations outside the component as module-level constants or use `useMemo` to protect the hot render loop.
