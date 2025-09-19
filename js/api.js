class APIManager {
  constructor() {
    this.map = null;
    
    this.mockData = {
      weather: {
        "New York": { temperature: 22, condition: "Sunny" },
        Paris: { temperature: 18, condition: "Cloudy" },
        Tokyo: { temperature: 25, condition: "Clear" },
        London: { temperature: 15, condition: "Rainy" },
        Barcelona: { temperature: 28, condition: "Clear" },
        Amsterdam: { temperature: 16, condition: "Cloudy" },
        Berlin: { temperature: 19, condition: "Sunny" },
        Sydney: { temperature: 20, condition: "Rainy" },
        Rome: { temperature: 26, condition: "Sunny" },
        Bangkok: { temperature: 32, condition: "Rainy" },
        Dubai: { temperature: 35, condition: "Sunny" },
        "Mexico City": { temperature: 24, condition: "Cloudy" },
        "Rio de Janeiro": { temperature: 28, condition: "Rainy" },
        Cairo: { temperature: 30, condition: "Clear" },
        Moscow: { temperature: 10, condition: "Cloudy" },
        Toronto: { temperature: 17, condition: "Sunny" },
        Singapore: { temperature: 31, condition: "Rainy" },
        Seoul: { temperature: 20, condition: "Clear" },
      },
      cityInfo: {
        "New York": { population: "8.4M", language: "English" },
        Paris: { population: "2.1M", language: "French" },
        Tokyo: { population: "14M", language: "Japanese" },
        London: { population: "8.9M", language: "English" },
        Barcelona: { population: "1.6M", language: "Spanish" },
        Amsterdam: { population: "872K", language: "Dutch" },
        Berlin: { population: "3.7M", language: "German" },
        Sydney: { population: "5.3M", language: "English" },
        Rome: { population: "2.8M", language: "Italian" },
        Bangkok: { population: "8.2M", language: "Thai" },
        Dubai: { population: "3.1M", language: "Arabic, English" },
        "Mexico City": { population: "8.9M", language: "Spanish" },
        "Rio de Janeiro": { population: "6.7M", language: "Portuguese" },
        Cairo: { population: "9.8M", language: "Arabic" },
        Moscow: { population: "12.6M", language: "Russian" },
        Toronto: { population: "2.9M", language: "English" },
        Singapore: { population: "5.7M", language: "English, Malay, Mandarin" },
        Seoul: { population: "9.7M", language: "Korean" },
      },
      mapData: {
        "New York": {
          center: [40.758, -73.985],
          famousPlaces: [
            {
              lat: 40.7484,
              lon: -73.9857,
              name: "Empire State Building",
              description: "A famous skyscraper with an observation deck.",
            },
            {
              lat: 40.7831,
              lon: -73.9712,
              name: "Central Park",
              description: "Vast urban park, home to many attractions.",
            },
            {
              lat: 40.7128,
              lon: -74.006,
              name: "Statue of Liberty",
              description: "Iconic symbol of freedom and democracy.",
            },
          ],
          foodRecommendations: [
            {
              lat: 40.7589,
              lon: -73.9865,
              name: "Joe's Pizza",
              description: "Classic New York slice.",
            },
            {
              lat: 40.7618,
              lon: -73.9822,
              name: "Pastrami Queen",
              description: "Legendary pastrami sandwiches.",
            },
          ],
          safeRoute: [
            [40.7589, -73.9865],
            [40.7584, -73.9857],
            [40.7618, -73.9822],
          ],
        },
        Paris: {
          center: [48.8584, 2.2945],
          famousPlaces: [
            {
              lat: 48.8584,
              lon: 2.2945,
              name: "Eiffel Tower",
              description: "Iconic wrought-iron lattice tower.",
            },
            {
              lat: 48.8606,
              lon: 2.3376,
              name: "Louvre Museum",
              description:
                "World's largest art museum and a historic monument.",
            },
          ],
          foodRecommendations: [
            {
              lat: 48.8566,
              lon: 2.3522,
              name: "Le Bouillon Chartier",
              description: "Classic French brasserie.",
            },
            {
              lat: 48.8647,
              lon: 2.351,
              name: "L'As du Fallafel",
              description: "Famous falafel spot in Le Marais.",
            },
          ],
          safeRoute: [
            [48.8584, 2.2945],
            [48.8606, 2.3376],
            [48.8566, 2.3522],
          ],
        },
        Tokyo: {
          center: [35.6895, 139.6917],
          famousPlaces: [
            {
              lat: 35.7148,
              lon: 139.7967,
              name: "Senso-ji",
              description: "Ancient Buddhist temple.",
            },
            {
              lat: 35.6591,
              lon: 139.7018,
              name: "Shibuya Crossing",
              description: "World's busiest intersection.",
            },
          ],
          foodRecommendations: [
            {
              lat: 35.6666,
              lon: 139.7317,
              name: "Tsukiji Outer Market",
              description: "Famous for fresh seafood.",
            },
            {
              lat: 35.6744,
              lon: 139.7617,
              name: "Ramen Street",
              description: "A collection of popular ramen shops.",
            },
          ],
          safeRoute: [
            [35.6895, 139.6917],
            [35.6591, 139.7018],
            [35.6666, 139.7317],
          ],
        },
      },
      popularPlaces: {
        "New York": [
          {
            name: "Central Park",
            description: "Vast urban park with many attractions.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=Central+Park",
            price: "$1,100",
            rating: "5.0",
          },
          {
            name: "Statue of Liberty",
            description: "Iconic symbol of freedom and democracy.",
            image:
              "https://via.placeholder.com/400x300/4b5563/ffffff?text=Statue+of+Liberty",
            price: "$1,200",
            rating: "4.8",
          },
          {
            name: "Maldives",
            description:
              "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
            image:
              "https://via.placeholder.com/400x300/fcd34d/000000?text=Maldives",
            price: "$3,000",
            rating: "5.0",
          },
          {
            name: "Toronto",
            description:
              "Qui Tempore Voluptate Qui Quia Commodi Rem Praesentium Alias Et.",
            image:
              "https://via.placeholder.com/400x300/34d399/ffffff?text=Toronto",
            price: "$3,500",
            rating: "4.6",
          },
        ],
        Paris: [
          {
            name: "Eiffel Tower",
            description: "Wrought-iron lattice tower on the Champ de Mars.",
            image:
              "https://via.placeholder.com/400x300/fcd34d/000000?text=Eiffel+Tower",
            price: "$900",
            rating: "4.9",
          },
          {
            name: "Louvre Museum",
            description: "World's largest art museum and a historic monument.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=Louvre+Museum",
            price: "$1,050",
            rating: "4.7",
          },
        ],
        Tokyo: [
          {
            name: "Senso-ji Temple",
            description: "Ancient Buddhist temple in Asakusa.",
            image:
              "https://via.placeholder.com/400x300/4b5563/ffffff?text=Senso-ji+Temple",
            price: "$1,500",
            rating: "4.8",
          },
          {
            name: "Shibuya Crossing",
            description: "One of the most famous pedestrian crossings.",
            image:
              "https://via.placeholder.com/400x300/fcd34d/000000?text=Shibuya+Crossing",
            price: "$1,600",
            rating: "5.0",
          },
        ],
        London: [
          {
            name: "Tower of London",
            description:
              "Historic castle on the north bank of the River Thames.",
            image:
              "https://via.placeholder.com/400x300/1e40af/ffffff?text=Tower+of+London",
            price: "$850",
            rating: "4.7",
          },
          {
            name: "Buckingham Palace",
            description:
              "London residence and administrative headquarters of the monarch.",
            image:
              "https://via.placeholder.com/400x300/4b5563/ffffff?text=Buckingham+Palace",
            price: "$950",
            rating: "4.6",
          },
        ],
        Dubai: [
          {
            name: "Burj Khalifa",
            description: "The world's tallest building.",
            image:
              "https://via.placeholder.com/400x300/10b981/ffffff?text=Burj+Khalifa",
            price: "$2,500",
            rating: "5.0",
          },
          {
            name: "The Dubai Mall",
            description: "One of the world's largest shopping malls.",
            image:
              "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Dubai+Mall",
            price: "$2,200",
            rating: "4.9",
          },
        ],
      },
    };
  }

  getWeather(city) {
    return this.getCityCoordinates(city).then(async (coords) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,weather_code`;
      const res = await fetch(url);
      const data = await res.json();
      const code = data?.current?.weather_code;
      const temp = Math.round(data?.current?.temperature_2m ?? 0);
      const condition = this._weatherCodeToText(code);
      return { temperature: temp, condition };
    }).catch(() => ({ temperature: "?", condition: "Unknown" }));
  }

  getCityInfo(city) {
    return this._getWikipediaSummary(city);
  }

  getChatResponse(message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes("best restaurants")) {
          resolve("The best restaurants are the ones you discover yourself!");
        } else if (lowerCaseMessage.includes("things to do")) {
          resolve(
            "There are countless things to do. What are you in the mood for?"
          );
        } else if (lowerCaseMessage.includes("getting around")) {
          resolve(
            "The public transport is very efficient. Consider using the metro or bus."
          );
        } else if (lowerCaseMessage.includes("hidden gems")) {
          resolve(
            "The city is full of hidden gems. Just wander off the main streets to find them."
          );
        } else {
          resolve(
            "I'm sorry, I don't have information on that topic yet. Please try asking about a different topic."
          );
        }
      }, 1500);
    });
  }

  async _getWikipediaSummary(city) {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`);
      const data = await res.json();
      const extract = data?.extract || '';
      // Fallback minimal info
      return {
        population: "",
        language: "",
        summary: extract
      };
    } catch {
      return { population: "?", language: "?", summary: "" };
    }
  }

  _weatherCodeToText(code) {
    const map = {
      0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog',
      51: 'Drizzle light', 53: 'Drizzle moderate', 55: 'Drizzle dense',
      61: 'Rain slight', 63: 'Rain moderate', 65: 'Rain heavy',
      71: 'Snow slight', 73: 'Snow moderate', 75: 'Snow heavy',
      80: 'Rain showers', 81: 'Rain showers', 82: 'Rain showers heavy',
      95: 'Thunderstorm', 96: 'Thunderstorm hail', 99: 'Thunderstorm hail'
    };
    return map[code] || 'Clear';
  }

  getMapData(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockData.mapData[city]);
      }, 1000);
    });
  }

  getPopularPlaces(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockData.popularPlaces[city] || []);
      }, 1000);
    });
  }

  // Initialize MapLibre map (OpenStreetMap tiles)
  async initializeMapLibre(mapElement) {
    if (!window.maplibregl) {
      throw new Error('MapLibre not loaded');
    }
    const liveOsmStyle = {
      version: 8,
      sources: {
        osm: {
          type: 'raster',
          tiles: [
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '© OpenStreetMap contributors'
        }
      },
      layers: [
        {
          id: 'osm',
          type: 'raster',
          source: 'osm',
          minzoom: 0,
          maxzoom: 19
        }
      ]
    };
    this.map = new maplibregl.Map({
      container: mapElement,
      style: liveOsmStyle,
      center: [-73.985, 40.758],
      zoom: 13,
    });
    this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
    return new Promise((resolve) => {
      this.map.on('load', () => resolve());
    });
  }

  // Get coordinates for a city via Nominatim
  async getCityCoordinates(cityName) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      cityName
    )}&limit=1`;
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'Streetly/1.0 (demo)'
      },
    });
    const data = await res.json();
    if (!data || data.length === 0) {
      throw new Error('Geocoding failed');
    }
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }

  // Generic geocoding helper (place, address, city)
  async geocodeText(text) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      text
    )}&limit=1`;
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'Streetly/1.0 (demo)'
      },
    });
    const data = await res.json();
    if (!data || data.length === 0) {
      throw new Error('Location not found: ' + text);
    }
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), displayName: data[0].display_name };
  }

  // Search for restaurants via Overpass API
  async searchRestaurants(cityName) {
    const center = await this.getCityCoordinates(cityName);
    const radius = 5000; // meters
    const query = `[
      out:json
    ];
    (
      node["amenity"="restaurant"](around:${radius},${center.lat},${center.lng});
      way["amenity"="restaurant"](around:${radius},${center.lat},${center.lng});
    );
    out center 20;`;
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(query),
    });
    const data = await res.json();
    const items = (data.elements || []).slice(0, 20).map((el) => {
      const lat = el.lat || (el.center && el.center.lat);
      const lng = el.lon || (el.center && el.center.lon);
      return {
        name: (el.tags && (el.tags.name || 'Restaurant')),
        rating: null,
        priceLevel: 0,
        vicinity: el.tags && (el.tags.addr_full || el.tags['addr:street'] || '') || '',
        photos: [],
        coordinates: { lat, lng },
      };
    });
    return items;
  }

  // Search for tourist attractions via Overpass API
  async searchAttractions(cityName) {
    const center = await this.getCityCoordinates(cityName);
    const radius = 10000;
    const query = `[
      out:json
    ];
    (
      node["tourism"="attraction"](around:${radius},${center.lat},${center.lng});
      way["tourism"="attraction"](around:${radius},${center.lat},${center.lng});
    );
    out center 20;`;
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(query),
    });
    const data = await res.json();
    const items = (data.elements || []).slice(0, 20).map((el) => {
      const lat = el.lat || (el.center && el.center.lat);
      const lng = el.lon || (el.center && el.center.lon);
      return {
        name: (el.tags && (el.tags.name || 'Attraction')),
        rating: null,
        vicinity: el.tags && (el.tags.addr_full || el.tags['addr:street'] || '') || '',
        photos: [],
        coordinates: { lat, lng },
      };
    });
    return items;
  }

  // Center and zoom maplibre map
  setCenterAndZoom({ lat, lng }, zoom = 13) {
    if (!this.map) return;
    this.map.setCenter([lng, lat]);
    this.map.setZoom(zoom);
  }

  // Add markers to MapLibre map
  addMarkersToMap(places, color = 'red') {
    if (!this.map || !Array.isArray(places)) return;
    places.forEach((place) => {
      if (!place.coordinates || place.coordinates.lat == null || place.coordinates.lng == null) return;
      const el = document.createElement('div');
      el.style.width = '14px';
      el.style.height = '14px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = color;
      new maplibregl.Marker(el)
        .setLngLat([place.coordinates.lng, place.coordinates.lat])
        .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML(`
          <div style="min-width:180px"> 
            <h3 style="font-weight:600">${place.name || 'Place'}</h3>
            ${place.vicinity ? `<div>${place.vicinity}</div>` : ''}
          </div>
        `))
        .addTo(this.map);
    });
  }

  addPointMarker(lat, lng, color = 'green', title = '') {
    if (!this.map) return;
    const el = document.createElement('div');
    el.style.width = '14px';
    el.style.height = '14px';
    el.style.borderRadius = '50%';
    el.style.border = '2px solid white';
    el.style.backgroundColor = color;
    const marker = new maplibregl.Marker(el).setLngLat([lng, lat]);
    if (title) marker.setPopup(new maplibregl.Popup({ offset: 24 }).setText(title));
    marker.addTo(this.map);
  }

  // Track user location with Geolocation API and show marker + accuracy circle
  startUserLocationTracking() {
    if (!navigator.geolocation || !this.map) return;
    let userMarker = null;
    let accuracyCircleId = 'user-accuracy';

    const update = (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      if (!userMarker) {
        const el = document.createElement('div');
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.backgroundColor = '#2563EB';
        userMarker = new maplibregl.Marker(el).setLngLat([longitude, latitude]).addTo(this.map);
      } else {
        userMarker.setLngLat([longitude, latitude]);
      }

      // Accuracy circle as a GeoJSON polygon approximating a circle
      const circle = this._createGeoJSONCircle([longitude, latitude], accuracy);
      if (this.map.getSource(accuracyCircleId)) {
        this.map.getSource(accuracyCircleId).setData(circle);
      } else {
        this.map.addSource(accuracyCircleId, { type: 'geojson', data: circle });
        this.map.addLayer({ id: accuracyCircleId, type: 'fill', source: accuracyCircleId, paint: { 'fill-color': '#3B82F6', 'fill-opacity': 0.15 } });
      }
    };

    navigator.geolocation.watchPosition(update, console.warn, { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 });
  }

  _createGeoJSONCircle(center, radiusInMeters, points = 64) {
    const [lng, lat] = center;
    const coords = { latitude: lat * Math.PI / 180, longitude: lng * Math.PI / 180 };
    const distanceX = radiusInMeters / 111320; // degrees
    const distanceY = radiusInMeters / 110540; // degrees
    const ret = [];
    for (let i = 0; i < points; i++) {
      const theta = (i / points) * (2 * Math.PI);
      const x = distanceX * Math.cos(theta);
      const y = distanceY * Math.sin(theta);
      ret.push([lng + x, lat + y]);
    }
    ret.push(ret[0]);
    return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ret] } };
  }

  // Route between two text locations using OSRM and draw it
  async showRouteBetween(fromText, toText) {
    if (!fromText || !toText) return;
    const [from, to] = await Promise.all([
      this.geocodeText(fromText),
      this.geocodeText(toText),
    ]);

    // Ensure style is ready before adding/updating sources/layers
    if (!this.map.isStyleLoaded()) {
      await new Promise((r) => this.map.once('idle', r));
    }

    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data || !data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }
    const route = data.routes[0].geometry; // GeoJSON LineString
    const distanceMeters = data.routes[0].distance; // meters
    const durationSeconds = data.routes[0].duration; // seconds

    // Remove existing route layers/sources to avoid stale state
    if (this.map.getLayer('route-line')) this.map.removeLayer('route-line');
    if (this.map.getLayer('route-outline')) this.map.removeLayer('route-outline');
    if (this.map.getSource('route')) this.map.removeSource('route');

    // Add fresh source and high-contrast layers
    const routeFeature = { type: 'Feature', geometry: route };
    this.map.addSource('route', { type: 'geojson', data: routeFeature });
    this.map.addLayer({
      id: 'route-outline',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': '#000000',
        'line-width': 12,
        'line-opacity': 0.25
      }
    });
    this.map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      paint: {
        'line-color': '#ff3b30',
        'line-width': 8,
        'line-opacity': 0.95,
        'line-cap': 'round',
        'line-join': 'round'
      }
    });

    // Add markers for start and end
    this.addPointMarker(from.lat, from.lng, '#10B981', 'Start');
    this.addPointMarker(to.lat, to.lng, '#3B82F6', 'Destination');

    // Fit bounds
    const coords = route.coordinates;
    const bounds = coords.reduce(
      (b, c) => b.extend(c),
      new maplibregl.LngLatBounds(coords[0], coords[0])
    );
    this.map.fitBounds(bounds, { padding: 60 });

    // Update UI summary if present
    const summary = document.getElementById('routeSummary');
    if (summary) {
      const km = (distanceMeters / 1000).toFixed(1);
      const mins = Math.round(durationSeconds / 60);
      summary.textContent = `${km} km • ~${mins} min`;
      summary.classList.remove('hidden');
    }

    // Render step-by-step directions
    const dirPanel = document.getElementById('directionsPanel');
    const dirList = document.getElementById('directionsList');
    if (dirPanel && dirList && data.routes[0].legs && data.routes[0].legs[0]) {
      const steps = data.routes[0].legs[0].steps || [];
      dirList.innerHTML = '';
      steps.forEach((s, idx) => {
        const li = document.createElement('li');
        const dist = (s.distance / 1000).toFixed(2);
        const instr = s.name ? `on ${s.name}` : '';
        li.textContent = `${s.maneuver.instruction || 'Continue'} ${instr} (${dist} km)`;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
          if (s.geometry && s.geometry.coordinates && s.geometry.coordinates.length) {
            this.highlightStep(s.geometry);
          } else if (s.maneuver && s.maneuver.location) {
            const [lng, lat] = s.maneuver.location;
            this.map.easeTo({ center: [lng, lat], zoom: Math.max(this.map.getZoom(), 15) });
          }
        });
        dirList.appendChild(li);
      });
      dirPanel.classList.remove('hidden');
    }
  }

  // Highlight a specific step geometry on the map
  highlightStep(geometry) {
    if (!this.map || !geometry) return;
    if (!this.map.isStyleLoaded()) {
      this.map.once('idle', () => this.highlightStep(geometry));
      return;
    }
    if (this.map.getSource('route-step')) {
      this.map.getSource('route-step').setData({ type: 'Feature', geometry });
    } else {
      this.map.addSource('route-step', { type: 'geojson', data: { type: 'Feature', geometry } });
      this.map.addLayer({
        id: 'route-step-line',
        type: 'line',
        source: 'route-step',
        paint: { 'line-color': '#10B981', 'line-width': 6 }
      });
    }
    const coords = geometry.coordinates;
    const bounds = coords.reduce((b, c) => b.extend(c), new maplibregl.LngLatBounds(coords[0], coords[0]));
    this.map.fitBounds(bounds, { padding: 60 });
  }

  // Get detailed place information
  async getPlaceDetails(placeId) {
    if (!this.placesService) {
      throw new Error('Places service not initialized');
    }

    return new Promise((resolve, reject) => {
      const request = {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'opening_hours', 'rating', 'reviews', 'photos', 'price_level']
      };

      this.placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(place);
        } else {
          reject(new Error('Place details failed: ' + status));
        }
      });
    });
  }

  // Enhanced chat response with real data
  async getEnhancedChatResponse(message, cityName) {
    const lowerCaseMessage = message.toLowerCase();
    
    try {
      // If user asks general info about the city
      if (lowerCaseMessage.includes('about') || lowerCaseMessage.includes('info') || lowerCaseMessage.includes('information')) {
        const summary = await this._getWikipediaSummary(cityName);
        if (summary.summary) {
          return summary.summary;
        }
      }
      if (lowerCaseMessage.includes('restaurant') || lowerCaseMessage.includes('food') || lowerCaseMessage.includes('eat')) {
        const restaurants = await this.searchRestaurants(cityName, 'restaurants');
        if (restaurants.length > 0) {
          const topRestaurants = restaurants.slice(0, 3);
          let response = `Here are some great restaurants in ${cityName}:\n\n`;
          topRestaurants.forEach((restaurant, index) => {
            response += `${index + 1}. **${restaurant.name}** ⭐ ${restaurant.rating}\n`;
            response += `   📍 ${restaurant.vicinity}\n`;
            if (restaurant.priceLevel > 0) {
              response += `   💰 ${'$'.repeat(restaurant.priceLevel)}\n`;
            }
            response += '\n';
          });
          return response;
        }
      }
      
      if (lowerCaseMessage.includes('attraction') || lowerCaseMessage.includes('visit') || lowerCaseMessage.includes('see')) {
        const attractions = await this.searchAttractions(cityName, 'tourist attractions');
        if (attractions.length > 0) {
          const topAttractions = attractions.slice(0, 3);
          let response = `Here are some must-visit attractions in ${cityName}:\n\n`;
          topAttractions.forEach((attraction, index) => {
            response += `${index + 1}. **${attraction.name}** ⭐ ${attraction.rating}\n`;
            response += `   📍 ${attraction.vicinity}\n\n`;
          });
          return response;
        }
      }
      
      if (lowerCaseMessage.includes('getting around') || lowerCaseMessage.includes('transport')) {
        return `Getting around ${cityName}:

🚇 **Public Transport**: Most cities have excellent metro/bus systems
🚕 **Taxis/Rideshare**: Uber, Lyft, or local taxi services
🚶 **Walking**: Great way to explore neighborhoods
🚲 **Biking**: Many cities have bike-sharing programs

I recommend checking the local transport authority website for routes and schedules!`;
      }
      
      if (lowerCaseMessage.includes('hidden gems') || lowerCaseMessage.includes('local')) {
        return `Hidden gems in ${cityName}:

🏪 **Local Markets**: Great for authentic food and culture
🎨 **Street Art Districts**: Often overlooked but amazing
☕ **Local Cafes**: Away from tourist areas
🌳 **Parks & Gardens**: Perfect for relaxation
🏛️ **Local Museums**: Smaller, specialized collections

Ask locals for their favorite spots - they know the best places!`;
      }
      
      // Fallback to original responses
      return this.getChatResponse(message);
      
    } catch (error) {
      console.error('Error getting enhanced response:', error);
      return this.getChatResponse(message);
    }
  }
}