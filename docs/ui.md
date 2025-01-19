User Interface API
---
The user interface API has only one exported function.

Initialize
---
Parameters
- type

Returns
- Object

All functions that create user interface components return an object to allow control of that component. Components that contain other components provide functions to add those components.

Types
---
- "navigation": Provides a navigation bar in portrait, navigation rail in landscape
  - tabs: an array of objects
- "hierarchy": Provides a header bar in both portrait and landscape, includes a title and actions menu

Events
---
This API uses Async Iterators in place of extending EventTarget. Event handlers are implemented as "for await" loops. The loop ends when the element is removed.

Skin Design Considerations
---
- Touch targets must be large enough to click reliably.
- Font size scales with distance, touch targets do not.
