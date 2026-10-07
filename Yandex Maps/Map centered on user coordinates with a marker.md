Документация: https://yandex.ru/maps-api/docs/js-api/index.html<br>
Получить ключ API: https://yandex.ru/maps-api/console

```html
<script
  src="https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU"
  type="text/javascript"
></script>
```

```javascript
/**
 * Renders a Yandex Map centered at the given coordinates with a marker.
 * @param {number} latitude
 * @param {number} longitude
 */
function renderYandexMap(latitude, longitude) {
  // ymaps.ready() ensures the API is completely loaded before accessing its objects
  ymaps.ready(() => {
    const userCoordinates = [latitude, longitude];

    // Initialize the Map
    const myMap = new ymaps.Map("map", {
      center: userCoordinates,
      zoom: 16, // Close zoom level for street view
      controls: ["zoomControl", "fullscreenControl", "typeSelector"],
    });

    // Create the Placemark (Marker)
    const userMarker = new ymaps.Placemark(
      userCoordinates,
      {
        // Popup info
        hintContent: "Your Location",
        balloonContent: `<strong>You are here!</strong><br>Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`,
      },
      {
        // Styling the pin (red icon with a dot)
        preset: "islands#redDotIconWithCaption",
      },
    );

    // 3. Add the marker to the map
    myMap.geoObjects.add(userMarker);
  });
}
```
