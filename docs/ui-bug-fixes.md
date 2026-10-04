# UI Bug Hunt & Fix Plan

Based on a critical static analysis of the UI layouts across desktop and mobile viewports, the following issues and inconsistencies have been identified. 

## Identified UI Bugs

1. **Metric Cards "Widow" Wrapping on Mobile (`GoalDetail.tsx`)**
   - **Bug**: The three metric cards (Total, Current Streak, Best Streak) use `flex: 1` with a `minWidth: 110px`. On narrow viewports (e.g., 375px mobile screens), the container isn't wide enough to fit all three (which require at least 330px + gaps). When they wrap, two cards sit on the top row, and the third card drops to the bottom row, stretching to 100% width. This creates an unbalanced, asymmetrical layout.
   - **Fix**: Convert the metric cards wrapper to a CSS Grid using `gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'` or `gridTemplateColumns: 'repeat(3, 1fr)'` with a media query to stack them vertically on extra-small screens, ensuring symmetrical visual weight.

2. **Long Title Overflow in Goal Cards (`GoalList.tsx`)**
   - **Bug**: The goal card header uses `display: 'flex', justifyContent: 'space-between'`. If a user enters an extremely long goal title without spaces, it can force the flexbox to push the check-in button (the circle icon) off-screen or warp it, because the title container lacks overflow handling and the button lacks `flex-shrink: 0`.
   - **Fix**: Add `flexShrink: 0` to the check-in button container. Add `wordBreak: 'break-word'` and `overflowWrap: 'anywhere'` to the goal title `<h3>` to ensure text wraps correctly.

3. **Heatmap Cell Squishing on Small Screens (`Heatmap.tsx`)**
   - **Bug**: The Heatmap forces 13 columns with a static `gap: 6px`. On very small mobile screens, the 6px gap consumes a large percentage of the horizontal space (12 gaps * 6px = 72px), causing the 13 cells to become extremely small relative to the gaps.
   - **Fix**: Update the gap to be responsive (e.g., `gap: 'min(6px, 1.5vw)'`) or reduce it to `4px` so the cells retain a larger touch/visual target on narrow screens.

4. **App Header Padding on Mobile (`index.css`)**
   - **Bug**: The `.header` class has a static padding of `32px 20px 24px 20px`. While this looks premium on desktop, it wastes valuable vertical space on mobile devices where screen real estate is critical.
   - **Fix**: Introduce a simple `@media (max-width: 600px)` query in `index.css` to reduce the top/bottom padding of the `.header` to `20px 16px 16px 16px`.

## Implementation Steps

1. Edit `src/index.css` to add the mobile media query for the `.header` padding.
2. Edit `src/components/GoalDetail.tsx` to refactor the metric cards layout from Flexbox to CSS Grid.
3. Edit `src/components/GoalList.tsx` to add `flexShrink: 0` to the check-in button and word-wrapping to the title.
4. Edit `src/components/Heatmap.tsx` to optimize the grid gap for mobile.
