# collab.canvas

https://user-images.githubusercontent.com/5301136/215365476-50e087ba-17b3-49e3-a7a8-2020c5061fa9.mov

Simple collaborative free-drawing app. Powered by conflict-free replicated data type (CRDT) via `yjs` and `y-websocket`. For smooth drawing uses `perfect-freehand`.

To run locally:

```
## dev server
yarn dev

## ws server to forward messages
yarn ws

## both
yarn start

## e2e test
yarn e2e

```

### project structure

-   **/views** - UI components without much logic
-   **/containers** - wraps some of the common logic, drives basic `views`
-   **/pages** - combines `containers` and `views`
-   **/hooks** - some custom logic extracted as a react hook
-   **/utils** - simple helper functions. mostly pure
-   **App.tsx** - keeps basic routing
-   **state.ts** - facade for yjs relatedc stuff. state which gets distributed between participants

### what works so far

-   generative unique boards with custom background colors
-   multiple unique users in the same canvas boards
-   setting a name
-   unique line color per user
-   2 tabs identifies as 2 sessions of the same user
-   displaying all users currently connected to the board
-   zooming
-   clearing a board

### what is missing

-   dragging a canvas
-   zooming by mousewheel
-   different sizes of the line
-   predefined shapes
-   seing position of the other participants
-   pinch to zoom on mobile

### known issues

-   scaling canvas based on `devicePixelRatio` have some issues
-   using 2 fingers on mobile creates funny artifacts
