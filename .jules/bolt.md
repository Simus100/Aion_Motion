## 2024-05-22 - React Hook placement in conditional rendering
 **Learning:** React hooks like `useMemo` cannot be called conditionally. When fixing an unmemoized variable that only exists inside an `if` block, the memoized version must be hoisted to the top level of the component alongside other unconditional hooks, even if the result is only utilized when that `if` block is executed.
 **Action:** Always review the placement of new hooks to ensure they are at the top level and not wrapped inside `if` statements or early returns.
