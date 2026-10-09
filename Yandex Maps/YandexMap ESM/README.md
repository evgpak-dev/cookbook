## Usage

1. Instantiate the map on `<div id="map">`
2. Wait for it to initialize
3. Add the marker
4. Smoothly zoom in to the user's location

```javascript
import { YandexMap } from "./YandexMap.js";

const myMap = new YandexMap("map", {
  center: [55.755819, 37.617644], // Default coordinates
  zoom: 16, // Default zoom
});

await myMap.init();

const userCoords = [55.755819, 37.617644];

myMap.setMarker(userCoords, {
  hint: "Your Location",
  balloon: `<strong>You are here!</strong><br>Coords: [${userCoords.join(", ")}]`,
});

await myMap.panTo(userCoords, 16);
```
