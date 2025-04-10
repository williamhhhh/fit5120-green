<template>
  <div>
    <!-- Search Input for Places -->
    <!-- <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a place"
      @keyup.enter="searchPlace"
      class="search-input"
    /> -->

    <!-- Search Result -->
    <div v-if="searchResult">
      <h3>Search Result:</h3>
      <p>{{ searchResult.place_name }}</p>
      <button @click="navigateTo(searchResult.geometry.coordinates)">
        Navigate to this location
      </button>
    </div>

    <!-- Map Container -->
    <div id="map" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import axios from 'axios'
import * as turf from '@turf/turf'

// Set Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbWpibiIsImEiOiJjbTF5dGM0MWUwMXNtMnFxM2l5MTZnbXl4In0.3NVGhIBNxF53iKLxT6MmeQ'

// State Variables
const searchQuery = ref('')
const searchResult = ref(null)
let map, directions, startMarker, endMarker, melbourneGeojson
let currentMarker = null
let currentPopup = null

fetch('/municipal-boundary.geojson')
  .then(response => response.json())
  .then(data => {
    melbourneGeojson = data

    const bbox = turf.bbox(melbourneGeojson)

    console.log('Bounding Box:', bbox)

    const world = turf.polygon([[
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90]
    ]])
    console.log('World Geometry Type:', world.geometry.type) // should be 'Polygon'
    console.log('Melbourne Geometry Type:', melbourneGeojson.features[0].geometry.type)

    const melbourneGeometry = melbourneGeojson.features[0].geometry
    const melbournePolygon = turf.feature(melbourneGeometry)
    const mask = turf.difference(world, melbournePolygon)

    map.addSource('mask', {
      type: 'geojson',
      data: mask
    })

    map.addLayer({
      id: 'mask-layer',
      type: 'fill',
      source: 'mask',
      paint: {
        'fill-color': '#000000',
        'fill-opacity': 0.5
      }
    })
  })
  .catch(error => {
    console.error('Error fetching GeoJSON:', error)
  })

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

  // Map click to see rating and show popup
  map.on('click', async (e) => {
    const lng = e.lngLat.lng
    const lat = e.lngLat.lat

    if (currentMarker) {
      currentMarker.remove() // Remove previous marker if it exists
    }

    // Add a marker at the clicked location
    currentMarker = new mapboxgl.Marker({ color: 'green' })
      .setLngLat([lng, lat])
      .addTo(map)

    // Remove existing popup if present
    if (currentPopup) {
      currentPopup.remove()
    }

    console.log(`Clicked coordinates: ${lng}, ${lat}`)

    const circle = turf.circle([lng, lat], 0.3, {
      steps: 64,
      units: 'kilometers',
    })

    if (map.getSource('circle')) {
      map.removeLayer('circle-layer')
      map.removeSource('circle')
    }

    map.addSource('circle', {
      type: 'geojson',
      data: circle
    })

    map.addLayer({
      id: 'circle-layer',
      type: 'fill',
      source: 'circle',
      paint: {
        'fill-color': '#888',
        'fill-opacity': 0.3
      }
    })

    try {
      const response = await axios.post('https://54.252.189.158/green_score', {
        lng: lng,
        lat: lat
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
    },
  })
      console.log(response.data)

      const rating = response.data.green_score

      // Display a popup with the green score
      currentPopup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat([lng, lat])
        .setHTML(`<h3>Green Score</h3><p>${rating}</p>`)
        .addTo(map)

    } catch (error) {
      console.error('Error fetching rating:', error)
    }
  })
})

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
  margin-bottom: 20px;
  margin-top: 120px;
}

.search-input {
  margin-top: 100px;
  margin-bottom: 10px;
  padding: 10px;
  width: 300px;
}
</style>