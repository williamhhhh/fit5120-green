<template>
  <!-- <div> -->
    <!-- Search Input for Places -->
    <!-- <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a place"
      @keyup.enter="searchPlace"
      class="search-input"
    /> -->

    <!-- Search Result -->
    <!-- <div v-if="searchResult">
      <h3>Search Result:</h3>
      <p>{{ searchResult.place_name }}</p>
      <button @click="navigateTo(searchResult.geometry.coordinates)">
        Navigate to this location
      </button>
    </div> -->

    <!-- Map Container -->
    <div class="container main-container">
      <!-- First Row -->
      <div class="row justify-content-center mb-4 top-custom" style="padding-top: 120px;">
        <div class="col-12 col-md-10 col-lg-4 text-center">
          <h1>Let's discover green spaces</h1>
        </div>
      </div>

      <!-- Second Row -->
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-4 mb-3 text-center">
          <h2>Search for a place</h2>
          <!-- <select v-model="transportMode" @change="updateTransportMode" class="transport-select">
            <option value="mapbox/walking">🚶 Walking</option>
            <option value="mapbox/driving">🚗 Driving</option>
            <option value="mapbox/cycling">🚴 Cycling</option>
          </select> -->
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div id="map" class="map-container"></div>
        </div>
      </div>
    </div>

  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import axios from 'axios'
import * as turf from '@turf/turf'
import osmtogeojson from 'osmtogeojson'

// Set Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbWpibiIsImEiOiJjbTF5dGM0MWUwMXNtMnFxM2l5MTZnbXl4In0.3NVGhIBNxF53iKLxT6MmeQ'

// State Variables
const searchQuery = ref('')
const searchResult = ref(null)
const transportMode = ref('mapbox/walking')
const userLocationBool = ref(false)
const userInMelbourne = ref(false)
let map, directions, startMarker, endMarker
let melbourneGeojson
let currentMarker = null
let currentPopup = null

// Initialize the map
onMounted(() => {
  map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [144.9631, -37.8136],
    zoom: 12,
    minZoom: 9
  })
  map.setMaxBounds([
    [144.8469619379468, -37.9006602026218],   // Southwest corner
    [145.0412978955415, -37.72544812918211]  // Northeast corner
  ])

  map.on('load', () => {
    fetch('/municipal-boundary.geojson')
      .then(response => response.json())
      .then(data => {
        melbourneGeojson = data
        console.log('Melbourne GeoJSON:', melbourneGeojson)

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userCoords = [position.coords.longitude, position.coords.latitude]
            const userPoint = turf.point(userCoords)
            const melbPolygon = turf.polygon(melbourneGeojson.features[0].geometry.coordinates[0])
            console.log(turf.booleanPointInPolygon(userPoint, melbPolygon))
            if (turf.booleanPointInPolygon(userPoint, melbPolygon)) {
              map.setCenter(userCoords)
              map.setZoom(14)
              console.log('User is in Melbourne:', userCoords)
              // Add a marker for the user's location
              startMarker = new mapboxgl.Marker({ color: 'blue' })
                .setLngLat(userCoords)
                .addTo(map)
              await loadNearbyGreenSpaces()
              console.log('Nearby green spaces loaded')
            } else {
              await loadAllGreenSpaces()
            }
            async (error) => {
              // If location denied
              console.error('Error getting location:', error)
              await loadAllGreenSpaces()
            }
          }
        )
      })

    map.addSource('melbourne', {
      type: 'geojson',
      data: '/municipal-boundary.geojson'
    })

    map.addLayer({
      id: 'melbourne-outline',
      type: 'line',
      source: 'melbourne',
      paint: {
        'line-color': '#00aa00',
        'line-width': 2
      }
    })
  })

  loadMelbourneBoundary()

  directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'metric',
  profile: transportMode.value,
  controls: {
    inputs: false,
    instructions: true
  }
})

map.addControl(directions, 'top-left')

})

const updateTransportMode = () => {
  directions.setProfile(transportMode.value)
}

const loadMelbourneBoundary = async () => {
  const res = await fetch('/municipal-boundary.geojson')
  melbourneGeojson = await res.json()

  const melbGeometry = melbourneGeojson.features[0].geometry

  let melbPolygon
  if (melbGeometry.type === 'MultiPolygon') {
    melbPolygon = turf.multiPolygon(melbGeometry.coordinates)
  } else if (melbGeometry.type === 'Polygon') {
    melbPolygon = turf.polygon(melbGeometry.coordinates)
  }
  // Now safe to use melbPolygon
  // e.g., filtering parks within it
}


//search for nearby green

// Load nearby green spaces
const loadAllGreenSpaces = async () => {
  
  const query = `
    [out:json][timeout:25];
    area["name"="City of Melbourne"]["admin_level"="6"]->.searchArea;
    (
      way["leisure"="park"](area.searchArea);
      way["leisure"="garden"](area.searchArea);
      way["leisure"="nature_reserve"](area.searchArea);
    );
    out body;
    >;
    out skel qt;
  `

  try {
    const response = await fetch(
      'https://overpass-api.de/api/interpreter',
      {
        method: 'POST',
        body: query
      }
    )

    console.log('Response:', response)

    const osmData = await response.json()
    const geojson = osmtogeojson(osmData)

    geojson.features.forEach((feature) => {
  const name = feature.properties.name || 'Unnamed Green Space'
  const center = turf.centroid(feature).geometry.coordinates

  const marker = new mapboxgl.Marker({ color: 'green' })
    .setLngLat(center)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <strong>${name}</strong><br/>
        <button id="go-to-${name.replace(/\s+/g, '-')}" style="margin-top:5px;">Navigate Here</button>
      `)
    )
    .addTo(map)

  // Open the popup when marker is clicked
  marker.getElement().addEventListener('click', () => {
    // Delay to ensure popup is rendered
    setTimeout(() => {
      const btn = document.getElementById(`go-to-${name.replace(/\s+/g, '-')}`)
      if (btn) {
        btn.addEventListener('click', () => {
          navigator.geolocation.getCurrentPosition((position) => {
            const userCoords = [position.coords.longitude, position.coords.latitude]
            directions.setOrigin(userCoords)
            directions.setDestination(center)
          })
        })
      }
    }, 300)
  })
})



    map.addSource('green-spaces', {
      type: 'geojson',
      data: geojson
    })

    map.addLayer({
      id: 'green-spaces-layer',
      type: 'fill',
      source: 'green-spaces',
      paint: {
        'fill-color': '#00FF00',
        'fill-opacity': 0.5
      }
    })
  } catch (err) {
    console.error('Failed to load Overpass data:', err)
  }
}

// get nearby parks quety
const getNearbyParks = (lat, lon) => {
    // Bounding box ~ 2km around user
  const delta = 0.01 // ~1km in degrees
  const south = lat - delta
  const north = lat + delta
  const west = lon - delta
  const east = lon + delta

  return `
    [out:json][timeout:25];
    (
      way["leisure"="park"](${south},${west},${north},${east});
      way["leisure"="garden"](${south},${west},${north},${east});
      way["leisure"="nature_reserve"](${south},${west},${north},${east});
    );
    out body;
    >;
    out skel qt;
  `
}

// Load all parks in Melbourne
const loadNearbyGreenSpaces = async (coords) => {
  const lat = coords[1]
  const lon = coords[0]
  const query = getNearbyParks(lat, lon)

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: query
  })

  const osmJson = await response.json()
  const geojson = osmtogeojson(osmJson)

  // 💡 Add markers with popups (e.g., park name)
  geojson.features.forEach((feature) => {
      const center = turf.centroid(feature).geometry.coordinates
      const name = feature.properties.name || 'Unnamed Green Space'
      const type = feature.properties.leisure || 'Unknown Type'

      new mapboxgl.Marker({ color: 'green' })
        .setLngLat(center)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <strong>${name}</strong><br/>
          Type: ${type}
        `))
        .addTo(map)
    })

  // Center the map on user's location
  map.setCenter([lon, lat])
  map.setZoom(14)
}

// Render markers on the map
const renderMarkers = (results) => {
  results.forEach((result) => {
    const coordinates = result.geometry.coordinates
    const marker = new mapboxgl.Marker({ color: 'green' })
      .setLngLat(coordinates)
      .addTo(map)

    marker.getElement().addEventListener('click', () => {
      navigateTo(coordinates)
    })
  })
}

// Search for places using Geocoding API
const searchPlace = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery.value
      )}.json?access_token=pk.eyJ1Ijoid2lsbGlhbWpibiIsImEiOiJjbTF5dGM0MWUwMXNtMnFxM2l5MTZnbXl4In0.3NVGhIBNxF53iKLxT6MmeQ`
    )
    const data = await response.json()
    if (data.features.length > 0) {
      searchResult.value = data.features[0]
      // Get the coordinates of the search result
      const [longitude, latitude] = searchResult.value.geometry.coordinates

      // Center the map on the search result's location
      map.setCenter([longitude, latitude])
      map.setZoom(14)

      // Add a marker to the search result's location
      if (endMarker) endMarker.remove() // Remove previous marker, if any
      endMarker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([longitude, latitude])
        .addTo(map)
    } else {
      alert('No results found')
    }
  } catch (error) {
    console.error('Error searching place:', error)
  }
}

// route planner
window.planRoute = (coords) => {
  navigateTo(coords)
}

// Navigate to the selected place
const navigateTo = (coordinates) => {
  if (endMarker) endMarker.remove() // Remove previous end marker

  // Add a marker for the destination
  endMarker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .addTo(map)

  // Get current location as the start point
  navigator.geolocation.getCurrentPosition((position) => {
    const start = [position.coords.longitude, position.coords.latitude]
    if (startMarker) startMarker.remove() // Remove previous start marker

    // Add a marker for the start location
    startMarker = new mapboxgl.Marker({ color: 'blue' })
      .setLngLat(start)
      .addTo(map)

    // Get the route using Mapbox Directions API
    directions.setOrigin(start) // Start point
    directions.setDestination(coordinates) // End point
  })
}
</script>


<style scoped>
@import 'https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css';

.map-container {
  width: 100%;
  height: 500px;
  position: relative;
}

.search-input {
  margin-top: 100px;
  margin-bottom: 10px;
  padding: 10px;
  width: 300px;
}

.top-custom {
  top: 120px;
}
</style>