/**
 * Ensures the global ymaps SDK is loaded and initialized
 * @returns Promise
 */
export function isYmapsReady() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(
        new Error("Yandex Maps can only be used in a browser environment."),
      );
      return;
    }

    if (!window.ymaps) {
      reject(
        new Error(
          "Yandex Maps script is missing. Ensure the <script> tag is present in your HTML.",
        ),
      );
      return;
    }

    window.ymaps.ready(() => resolve(window.ymaps));
  });
}

export class YandexMap {
  /**
   * @param {string} containerId - The HTML ID of the map element
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.defaultCenter = options.center || [55.755819, 37.617644];
    this.defaultZoom = options.zoom || 12;
    this.map = null;
    this.currentMarker = null;
  }

  /**
   * Initializes the map instance asynchronously.
   */
  async init() {
    const ymaps = await isYmapsReady();

    this.map = new ymaps.Map(this.containerId, {
      center: this.defaultCenter,
      zoom: this.defaultZoom,
      controls: ["zoomControl", "fullscreenControl", "geolocationControl"],
    });

    return this;
  }

  /**
   * Places or moves the single primary marker on the map.
   *
   * @param {[number, number]} coords - [latitude, longitude]
   * @param {Object} [meta={}] - Label and styling options
   */
  setMarker(coords, meta = {}) {
    if (!this.map) {
      throw new Error("Map is not initialized. Call await map.init() first.");
    }

    const ymaps = window.ymaps;

    // Remove previous marker if one already exists
    if (this.currentMarker) {
      this.map.geoObjects.remove(this.currentMarker);
    }

    this.currentMarker = new ymaps.Placemark(
      coords,
      {
        hintContent: meta.hint || "",
        balloonContent: meta.balloon || "",
      },
      {
        preset: meta.preset || "islands#redDotIconWithCaption",
      },
    );

    this.map.geoObjects.add(this.currentMarker);
    return this.currentMarker;
  }

  /**
   * Smoothly pans the camera to the given coordinates.
   *
   * @param {[number, number]} coords - [latitude, longitude]
   * @param {number} [zoom=16] - Target zoom level
   */
  async panTo(coords, zoom = 16) {
    if (!this.map) {
      throw new Error("Map is not initialized. Call await map.init() first.");
    }

    await this.map.panTo(coords, {
      flying: true,
      duration: 1000,
    });

    if (zoom) {
      this.map.setZoom(zoom);
    }
  }

  /**
   * Cleans up the map instance from memory.
   */
  destroy() {
    if (this.map) {
      this.map.destroy();
      this.map = null;
      this.currentMarker = null;
    }
  }
}
