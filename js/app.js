// Main app logic for StreetSmart
class StreetSmartApp {
  constructor() {
    this.currentCity = null;
    this.currentView = "citySelection";
    this.chatManager = null;
    this.apiManager = null;
    this.map = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeManagers();
    this.updateLocalTime();

    setInterval(() => this.updateLocalTime(), 60000);
  }

  setupEventListeners() {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });

    const cityInput = document.getElementById("cityInput");
    if (cityInput) {
      cityInput.addEventListener("input", (e) => this.handleCitySearch(e));
      cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.selectCity(e.target.value);
        }
      });
    }

    document.querySelectorAll(".popular-city").forEach((btn) => {
      btn.addEventListener("click", () => {
        const city = btn.dataset.city;
        this.selectCity(city);
      });
    });

    const changeCityBtn = document.getElementById("changeCityBtn");
    if (changeCityBtn) {
      changeCityBtn.addEventListener("click", () => this.showCitySelection());
    }

    document.querySelectorAll(".quick-action").forEach((btn) => {
      btn.addEventListener("click", () => {
        const question = btn.textContent.trim();
        this.chatManager.sendMessage(question);
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !e.target.closest("#cityInput") &&
        !e.target.closest("#cityDropdown")
      ) {
        this.hideCityDropdown();
      }
    });

    // Location search form
    const locationSearchForm = document.getElementById("locationSearchForm");
    if (locationSearchForm) {
      locationSearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleLocationSearch();
      });
    }

    const useMyLocationBtn = document.getElementById("useMyLocationBtn");
    if (useMyLocationBtn) {
      useMyLocationBtn.addEventListener("click", async () => {
        try {
          if (!navigator.geolocation) {
            this.showError("Geolocation not supported");
            return;
          }
          navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            const fromInput = document.getElementById("fromLocation");
            fromInput.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            if (this.apiManager && this.apiManager.map) {
              this.apiManager.setCenterAndZoom({ lat: latitude, lng: longitude }, 14);
            }
          }, (err) => this.showError("Unable to get your location"), { enableHighAccuracy: true });
        } catch (e) {
          this.showError("Unable to get your location");
        }
      });
    }

    const mapPlanToggle = document.getElementById("mapPlanToggle");
    if (mapPlanToggle) {
      mapPlanToggle.addEventListener('click', () => this.enableMapClickPlanning());
    }
  }

  initializeManagers() {
    this.apiManager = new APIManager();
    this.chatManager = new ChatManager(this.apiManager);
  }

  switchView(view) {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove(
        "active",
        "text-primary",
        "border-b-2",
        "border-primary"
      );
      btn.classList.add("text-gray-500", "hover:text-primary");
    });
    const activeBtn = document.querySelector(`.nav-btn[data-view="${view}"]`);
    if (activeBtn) {
      activeBtn.classList.add(
        "active",
        "text-primary",
        "border-b-2",
        "border-primary"
      );
      activeBtn.classList.remove("text-gray-500", "hover:text-primary");
    }

    document
      .querySelectorAll(".screen")
      .forEach((screen) => screen.classList.add("hidden"));

    if (view === "chat") {
      if (this.currentCity) {
        document.getElementById("chatInterface").classList.remove("hidden");
      } else {
        document
          .getElementById("citySelectionScreen")
          .classList.remove("hidden");
      }
    } else if (view === "explore") {
      if (this.currentCity) {
        document.getElementById("exploreInterface").classList.remove("hidden");
        this.initializeMap();
        this.loadExploreContent();
      } else {
        document
          .getElementById("citySelectionScreen")
          .classList.remove("hidden");
      }
    } else if (view === "events") {
      document.getElementById("eventsInterface").classList.remove("hidden");
      this.loadLocalEvents();
    }

    this.currentView = view;
  }

  enableMapClickPlanning() {
    if (!this.apiManager || !this.apiManager.map) return;
    const map = this.apiManager.map;
    let startMarker = null;
    let endMarker = null;
    let placing = 'start';

    const createDraggable = (lngLat, color) => {
      const el = document.createElement('div');
      el.style.width = '18px';
      el.style.height = '18px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.backgroundColor = color;
      return new maplibregl.Marker({ element: el, draggable: true }).setLngLat(lngLat).addTo(map);
    };

    const handlePlan = async () => {
      if (!startMarker || !endMarker) return;
      const s = startMarker.getLngLat();
      const e = endMarker.getLngLat();
      const from = `${s.lat}, ${s.lng}`;
      const to = `${e.lat}, ${e.lng}`;
      await this.apiManager.showRouteBetween(from, to);
    };

    const clickHandler = (e) => {
      if (placing === 'start') {
        if (startMarker) startMarker.remove();
        startMarker = createDraggable(e.lngLat, '#10B981');
        placing = 'end';
        startMarker.on('dragend', handlePlan);
      } else {
        if (endMarker) endMarker.remove();
        endMarker = createDraggable(e.lngLat, '#3B82F6');
        placing = 'start';
        endMarker.on('dragend', handlePlan);
        handlePlan();
      }
    };

    map.getCanvas().style.cursor = 'crosshair';
    map.once('click', clickHandler);
    map.once('click', clickHandler);
  }

  async handleCitySearch(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
      this.hideCityDropdown();
      return;
    }
    this.showCityDropdown(await this.getCitySuggestions(query));
  }

  async getCitySuggestions(query) {
    const cities = [
      "New York",
      "Paris",
      "Tokyo",
      "London",
      "Barcelona",
      "Amsterdam",
      "Berlin",
      "Sydney",
      "Rome",
      "Bangkok",
    ];
    return cities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }

  showCityDropdown(suggestions) {
    const dropdown = document.getElementById("cityDropdown");
    if (!dropdown) return;
    dropdown.innerHTML = "";
    if (suggestions.length === 0) {
      dropdown.classList.add("hidden");
      return;
    }
    suggestions.forEach((city) => {
      const div = document.createElement("div");
      div.className = "city-suggestion";
      div.textContent = city;
      div.addEventListener("click", () => this.selectCity(city));
      dropdown.appendChild(div);
    });
    dropdown.classList.remove("hidden");
  }

  hideCityDropdown() {
    const dropdown = document.getElementById("cityDropdown");
    if (dropdown) dropdown.classList.add("hidden");
  }

  async selectCity(cityName) {
    if (!cityName) return;
    this.showLoading();
    try {
      this.currentCity = cityName;
      document.getElementById("currentCity").textContent = cityName;
      const cityInput = document.getElementById("cityInput");
      if (cityInput) cityInput.value = "";
      this.hideCityDropdown();
      await this.loadCityData(cityName);
      document.getElementById("citySelectionScreen").classList.add("hidden");
      document.getElementById("chatInterface").classList.remove("hidden");
      this.chatManager.sendWelcomeMessage(cityName);
    } catch (error) {
      console.error("Error selecting city:", error);
      this.showError("Failed to load city data. Please try again.");
    } finally {
      this.hideLoading();
    }
  }

  async loadCityData(cityName) {
    try {
      const weather = await this.apiManager.getWeather(cityName);
      this.updateWeatherDisplay(weather);
      const cityInfo = await this.apiManager.getCityInfo(cityName);
      this.updateCityInfo(cityInfo);
    } catch (error) {
      console.error("Error loading city data:", error);
    }
  }

  updateWeatherDisplay(weather) {
    const weatherInfo = document.getElementById("weatherInfo");
    if (!weatherInfo || !weather) return;
    weatherInfo.innerHTML = `
            <div class="text-3xl mb-2">${this.getWeatherEmoji(
              weather.condition
            )}</div>
            <div class="text-2xl font-bold text-gray-900">${
              weather.temperature
            }°C</div>
            <div class="text-gray-600">${weather.condition}</div>
        `;
  }

  getWeatherEmoji(condition) {
    const map = {
      sunny: "☀️",
      cloudy: "☁️",
      rainy: "🌧️",
      snowy: "❄️",
      clear: "☀️",
    };
    return map[condition.toLowerCase()] || "🌤️";
  }

  updateCityInfo(cityInfo) {
    document.querySelector("#localTime").textContent =
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    if (cityInfo.population)
      document.querySelector(".font-medium:nth-of-type(2)").textContent =
        cityInfo.population;
    if (cityInfo.language)
      document.querySelector(".font-medium:nth-of-type(3)").textContent =
        cityInfo.language;
  }

  updateLocalTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timeElement = document.getElementById("localTime");
    if (timeElement) timeElement.textContent = timeString;
  }

  showCitySelection() {
    this.currentCity = null;
    document.getElementById("chatInterface").classList.add("hidden");
    document.getElementById("exploreInterface").classList.add("hidden");
    document.getElementById("eventsInterface").classList.add("hidden");
    document.getElementById("citySelectionScreen").classList.remove("hidden");
    this.chatManager.clearMessages();
  }

  async initializeMap() {
    if (!this.currentCity) return;
    
    this.showLoading();
    
    try {
      // Initialize MapLibre
      await this.apiManager.initializeMapLibre(document.getElementById("map"));
      this.apiManager.startUserLocationTracking();

      // Get city coordinates
      const coordinates = await this.apiManager.getCityCoordinates(this.currentCity);

      // Center map on the city
      this.apiManager.setCenterAndZoom(coordinates, 13);

      // Search for restaurants and attractions
      const [restaurants, attractions] = await Promise.all([
        this.apiManager.searchRestaurants(this.currentCity),
        this.apiManager.searchAttractions(this.currentCity)
      ]);

      // Add markers
      this.apiManager.addMarkersToMap(restaurants, 'red');
      this.apiManager.addMarkersToMap(attractions, 'blue');
      
    } catch (error) {
      console.error('Error initializing map:', error);
      this.showError("Failed to load map data. Please try again.");
    } finally {
      this.hideLoading();
    }
  }

  addMarkers(places, type) {
    const icon =
      type === "food" ? "fa-solid fa-utensils" : "fa-solid fa-landmark";
    const color = type === "food" ? "#10B981" : "#3B82F6";
    places.forEach((place) => {
      const customIcon = L.divIcon({
        html: `<div style="color: ${color}; font-size: 24px;"><i class="${icon}"></i></div>`,
        className: "custom-icon",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -12],
      });
      L.marker([place.lat, place.lon], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`<b>${place.name}</b><br>${place.description}`);
    });
  }

  addRoute(route) {
    if (route && route.length > 1) {
      L.polyline(route, {
        color: "#F59E0B",
        weight: 5,
        opacity: 0.8,
        dashArray: "10, 5",
      })
        .addTo(this.map)
        .bindPopup("This is a recommended short, safe route.");
    }
  }

  async loadExploreContent() {
    const exploreCityName = document.getElementById("exploreCityName");
    exploreCityName.textContent = this.currentCity;

    const placesGrid = document.getElementById("placesGrid");
    placesGrid.innerHTML = "";
    this.showLoading();
    
    try {
      // Get real attractions data
      const attractions = await this.apiManager.searchAttractions(this.currentCity);
      this.hideLoading();
      
      if (attractions && attractions.length > 0) {
        attractions.slice(0, 6).forEach((attraction) => {
          const card = this.createRealPlaceCard(attraction);
          placesGrid.appendChild(card);
        });
      } else {
        placesGrid.innerHTML =
          '<div class="col-span-full text-center text-gray-500">No attractions available for this city yet.</div>';
      }
    } catch (error) {
      console.error('Error loading explore content:', error);
      this.hideLoading();
      placesGrid.innerHTML =
        '<div class="col-span-full text-center text-gray-500">Failed to load attractions. Please try again.</div>';
    }
  }

  createPlaceCard(place) {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md overflow-hidden";
    card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold text-gray-900">${place.name}</h3>
                <p class="text-gray-600 text-sm mt-1">${place.description}</p>
                <div class="mt-3 flex items-center justify-between text-sm">
                    <span class="text-primary font-bold">${place.price}</span>
                    <div class="flex items-center">
                        <i class="fas fa-star text-yellow-400 mr-1"></i>
                        <span>${place.rating}</span>
                    </div>
                </div>
            </div>
        `;
    return card;
  }

  createRealPlaceCard(place) {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow";
    
    const imageUrl = place.photos && place.photos.length > 0 
      ? place.photos[0].urlSmall 
      : 'https://via.placeholder.com/400x300/4b5563/ffffff?text=No+Image';
    
    card.innerHTML = `
            <img src="${imageUrl}" alt="${place.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold text-gray-900">${place.name}</h3>
                <p class="text-gray-600 text-sm mt-1">${place.vicinity}</p>
                <div class="mt-3 flex items-center justify-between text-sm">
                    <span class="text-gray-500">Attraction</span>
                    <div class="flex items-center">
                        <i class="fas fa-star text-yellow-400 mr-1"></i>
                        <span>${place.rating || 'N/A'}</span>
                    </div>
                </div>
            </div>
        `;
    
    // Add click handler to show place details
    card.addEventListener('click', () => {
      this.showPlaceDetails(place);
    });
    
    return card;
  }

  showPlaceDetails(place) {
    // Create a modal or detailed view for the place
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-gray-900">${place.name}</h2>
          <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.fixed').remove()">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        ${place.photos && place.photos.length > 0 ? 
          `<img src="${place.photos[0].urlLarge}" alt="${place.name}" class="w-full h-48 object-cover rounded-lg mb-4">` : 
          '<div class="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">No Image</div>'
        }
        <div class="space-y-2">
          <p><strong>Location:</strong> ${place.vicinity}</p>
          <p><strong>Rating:</strong> ⭐ ${place.rating || 'N/A'}</p>
          <p><strong>Type:</strong> Tourist Attraction</p>
        </div>
        <div class="mt-6 flex space-x-3">
          <button class="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors" onclick="this.closest('.fixed').remove()">
            Close
          </button>
          <button class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors" onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(place.name)}', '_blank')">
            View on Maps
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  async loadLocalEvents() {
    const eventsList = document.getElementById("eventsList");
    if (eventsList) {
      eventsList.innerHTML =
        '<div class="col-span-full text-center text-gray-500">Local events coming soon!</div>';
    }
  }

  showLoading() {
    const spinner = document.getElementById("loadingSpinner");
    if (spinner) spinner.classList.remove("hidden");
  }

  hideLoading() {
    const spinner = document.getElementById("loadingSpinner");
    if (spinner) spinner.classList.add("hidden");
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className =
      "fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
  }

  async handleLocationSearch() {
    const fromLocation = document.getElementById("fromLocation").value.trim();
    const toLocation = document.getElementById("toLocation").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!toLocation) {
      this.showError("Please enter a destination city");
      return;
    }

    this.showLoading();
    
    try {
      // Update current city to the destination
      this.currentCity = toLocation;
      document.getElementById("currentCity").textContent = toLocation;
      document.getElementById("exploreCityName").textContent = toLocation;
      
      // Update the "Going to" placeholder to show the selected city
      document.getElementById("toLocation").placeholder = `Going to ${toLocation}`;
      
      // Initialize map with the new city
      await this.initializeMap();
      
      // Load explore content for the new city
      await this.loadExploreContent();
      
      // If both from and to provided, draw route
      if (fromLocation && toLocation) {
        await this.apiManager.showRouteBetween(fromLocation, toLocation);
      }

      // Switch to explore view
      this.switchView("explore");
      
      // Show success message
      this.showSuccess(`Now exploring ${toLocation}!`);
      
    } catch (error) {
      console.error("Error handling location search:", error);
      this.showError("Failed to load location data. Please try again.");
    } finally {
      this.hideLoading();
    }
  }

  showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.streetSmartApp = new StreetSmartApp();
});