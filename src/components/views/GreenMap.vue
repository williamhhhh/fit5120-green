<template>
        <!-- User Guide  -->
    <transition name="modal" appear>
    <div class="modal" v-if="showUserGuide">
        <div class="modal-content swing-in-top-fwd">
          <h2>Welcome to GreenMap! 🌳</h2>
              <ul>
                <li>Allow location access to see parks near your current position within Melbourne.</li>
                <li>Adjust the green space size filter to explore parks of different sizes.</li>
                <li>Click the "Load green Spaces" button to find nearby parks or view all parks in Greater Melbourne.</li>
                <li>Tap on a green marker to view park details, then click “Navigate Here” to get directions from your location.</li>
              </ul>
            <button @click="hideUserGuide">Got it!</button>
        </div>
    </div>
    </transition>

    <!-- Map Container -->
    <div class="container">
      <!-- First Row -->
      <div class="row justify-content-center mb-4 top-custom" style="padding-top: 120px;">
        <div class="col-12 col-md-10 col-lg-4 text-center">
          <h1>Let's discover parks and gardens in melbourne city!</h1>
          <p> (✅Hint) Click on the marker and press navigate to navigate to the park!</p>
        </div>
      </div>

      <!-- Second Row -->
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-4 col-lg-4 mb-3 text-center">
            <div class="row fade-in">
              <div class="col-6">
                <h5>Select a range</h5>
              </div>
              <div class="col-6">
                            <!-- Distance Selector -->
              <select id="distanceSelect" v-model="selectedDistance" class="form-select mb-3">
                <option value="0.05">500m</option>
                <option value="0.1">1km</option>
                <option value="0.2">2km</option>
                <option value="0.3">3km</option>
                <option value="0.4">4km</option>
                <option value="0.5">5km</option>
                <option value="0.8">8km</option>
                <option value="1">10km</option>
                <option value="all">All Parks in Melbourne</option>
              </select>
              <!-- <p v-if="locationError" class="textDanger">{{ locationError }}</p> -->
              </div>
            </div>

            <div class="row fade-in" style="margin-top: 50px;">
              <div class="col-6"><h5>Select a park size</h5></div>
              <div class="col-6">
            <select id="sizeSelect" v-model="sizeSelect" class="form-select mb-3">
              <option value="20000">large</option>
              <option value="10000">medium</option>
              <option value="5000">small</option>
            </select></div>
            </div>
            
            <button  @click="handleLoadClick" class="btn-load fade-in" style="margin-top: 50px; font-family: Garamond, serif;">
              Load Green Spaces
            </button>
          </div>

          <div class="col-12 col-md-8 col-lg-6">
            <div class="map-wrapper zoom-in">
              <div id="map" class="map-container"></div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center" style="margin-top: 30px;">
          <div class="col-6 col-md-8 col-lg-6 text-center">
            <h3 style="margin-top: 30px; font-family: Garamond, serif;">Want to grow plants for yourself? Click to to find out how!➡️</h3>
          </div>
          <div class="col-6 col-md-6 col-lg-6 text-center">
            <button @click="navigateToChat" class="btn-load" style="margin-top: 20px; font-family: Garamond, serif; ">Chat with Green specialist</button>
          </div>  
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
import { IftaLabel } from 'primevue'

// Set Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGlhbWpibiIsImEiOiJjbTF5dGM0MWUwMXNtMnFxM2l5MTZnbXl4In0.3NVGhIBNxF53iKLxT6MmeQ'

// State Variables
const searchQuery = ref('')
const searchResult = ref(null)
const transportMode = ref('mapbox/walking')
const userLocationBool = ref(false)
const userInMelbourne = ref(false)
const selectedDistance = ref(0.1)
const locationError = ref('')
const sizeSelect = ref('5000') // Default size filter
const showUserGuide = ref(false) // Show user guide by default

let map, directions, startMarker, endMarker
let melbourneGeojson
let userCoords = null
let currentMarker = null
let currentPopup = null
let greenSpaceMarkers = []


// Initialize the map
onMounted(() => {

  showUserGuide.value = true // Show user guide when the component is mounted
  map = new mapboxgl.Map({
    container: 'map', // Container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [144.9631, -37.8136],
    zoom: 12,
    minZoom: 9
  })

  map.setMaxBounds([
  [144.593742, -38.433859], // Southwest corner
  [145.512529, -37.511274]  // Northeast corner
]);


  map.on('load', () => {
    fetch('/municipal-boundary.geojson')
      .then(response => response.json())
      .then(data => {
        melbourneGeojson = data
        console.log('Melbourne GeoJSON:', melbourneGeojson)

        navigator.geolocation.getCurrentPosition(
          // ✅ Success callback
          async (position) => {
            userCoords = [position.coords.longitude, position.coords.latitude]
            const userPoint = turf.point(userCoords)
            const melbPolygon = turf.polygon(melbourneGeojson.features[0].geometry.coordinates[0])

            const inMelbourne = turf.booleanPointInPolygon(userPoint, melbPolygon)

            userLocationBool.value = true
            userInMelbourne.value = inMelbourne

            if (inMelbourne) {
              map.setCenter(userCoords)
              map.setZoom(14)

              startMarker = new mapboxgl.Marker({ color: 'blue' })
                .setLngLat(userCoords)
                .addTo(map)
            } else {

              locationError.value = '⚠️ You are outside Melbourne. You can only view parks in Melbourne with green space size filter.'
            }
          },

          // ❌ Error callback — e.g. user denies location
          async (error) => {
            console.error('❌ Error getting location:', error)
            userLocationBool.value = false
            userInMelbourne.value = false
            // Show error message or fallback
            locationError.value = '⚠️ Location access denied. Please allow access to use nearby search.'
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

})

const navigateToChat = () => {
  window.location.href = '/chat'
}

const hideUserGuide = () => {
  showUserGuide.value = false
}

const updateTransportMode = () => {

  if (directions) {
    map.removeControl(directions) // Remove old one
  }

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
  // Optional: turn off map click-to-set
  map.off('click', directions._onMapClick)

  }



const handleLoadClick = () => {
  const selectedDistanceValue = parseFloat(selectedDistance.value)
  if (selectedDistanceValue && userLocationBool.value && userInMelbourne.value) {
    loadNearbyGreenSpaces(userCoords, selectedDistanceValue, sizeSelect.value)
  } else if (!userLocationBool.value && !selectedDistanceValue) {
    loadAllGreenSpaces(sizeSelect.value)
  } else if (userLocationBool.value && !userInMelbourne.value) {
    alert("You are outside Melbourne. You can only view parks in Melbourne with green space size filter.")
    loadAllGreenSpaces(sizeSelect.value)
  } else if(!selectedDistanceValue && userInMelbourne.value){
    loadAllGreenSpaces(sizeSelect.value)
  }
  else {
    alert("Please allow location access to use nearby search. Or you can only search for parks in Melbourne.")
    selectedDistance.value = "all"
    locationError.value = '⚠️ Location access denied. Please allow access to use nearby search.'
  }
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
const loadAllGreenSpaces = async (parkSize) => {
  
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


    const filteredFeatures = geojson.features.filter((feature) => {
      const area = turf.area(feature)

      if (parkSize === '5000') return area < 5000
      if (parkSize === '10000') return area >= 5000 && area <= 20000
      if (parkSize === '20000') return area > 20000
      return true // If no parkSize filter, show all
      
    })

    // Remove previous layer and source if they exist 
    if (map.getLayer('green-spaces-layer')) {
      map.removeLayer('green-spaces-layer')
    }
    if (map.getSource('green-spaces')) {
      map.removeSource('green-spaces')
    }

    // Add new filtered layer
    const filteredGeoJSON = {
      type: 'FeatureCollection',
      features: filteredFeatures
    }

    map.addSource('green-spaces', {
      type: 'geojson',
      data: filteredGeoJSON
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

    // Remove previous markers if they exist
    greenSpaceMarkers.forEach(currentMarker => currentMarker.remove())
    greenSpaceMarkers = [] // Clear the array

    filteredFeatures.forEach((feature) => {
    const name = feature.properties.name || 'Unnamed Green Space'
    const center = turf.centroid(feature).geometry.coordinates

    const currentMarker = new mapboxgl.Marker({ color: 'green' })
      .setLngLat(center)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <strong>${name}</strong><br/>
          <button id="go-to-${name.replace(/\s+/g, '-')}" style="margin-top:5px; border-radius:10px; color: white; background-color: #75BE3A">Navigate Here</button>
        `)
      )
      .addTo(map)
    
    greenSpaceMarkers.push(currentMarker) // Store the marker in the array

    // Open the popup when marker is clicked
    currentMarker.getElement().addEventListener('click', async() => {
      // Delay to ensure popup is rendered
      setTimeout(() => {
        const btn = document.getElementById(`go-to-${name.replace(/\s+/g, '-')}`)
        if (btn) {
          btn.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const userCoords = [position.coords.longitude, position.coords.latitude]
              const originStr = `${userCoords[1]},${userCoords[0]}` // lat,lon
              const destStr = `${center[1]},${center[0]}` // lat,lon

              const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&travelmode=driving`

              window.open(gmapsUrl, '_blank')
            },
          (error) => {
            console.error('Error getting user location:', error)
            alert('Unable to get your location. Please allow location access.')
          })
          })
        }
      }, 300)
    })

  })

  } catch (err) {
    console.error('Failed to load Overpass data:', err)
  }
}

// get nearby parks quety
const getNearbyParks = (lat, lon, distance) => {
  const distanceMeters = distance * 1000

return `
  [out:json][timeout:25];
  (
    way["leisure"="park"](around:${distanceMeters},${lat},${lon});
    way["leisure"="garden"](around:${distanceMeters},${lat},${lon});
    way["leisure"="nature_reserve"](around:${distanceMeters},${lat},${lon});
  );
  out body;
  >;
  out skel qt;
`
}

// Load all parks in Melbourne
const loadNearbyGreenSpaces = async (coords, distance, parkSize) => {
  console.log(coords)
  const lat = coords[1]
  const lon = coords[0]
  const query = getNearbyParks(lat, lon, distance)

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: query
  })

  const osmJson = await response.json()
  const geojson = osmtogeojson(osmJson)


  const filteredFeatures = geojson.features.filter((feature) => {
      const area = turf.area(feature)

      if (parkSize === '5000') return area < 1000
      if (parkSize === '10000') return area >= 1000 && area <= 5000
      if (parkSize === '20000') return area > 5000
      // return true // If no parkSize filter, show all
    })

  // Add new filtered layer
  const filteredGeoJSON = {
    type: 'FeatureCollection',
    features: filteredFeatures
  }

  // Remove previous layer and source if they exist
  if (map.getLayer('green-spaces-layer')) {
    map.removeLayer('green-spaces-layer')
  }
  if (map.getSource('green-spaces')) {
    map.removeSource('green-spaces')
  }

  map.addSource('green-spaces', {
    type: 'geojson',
    data: filteredGeoJSON
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

  // Remove previous markers if they exist
  greenSpaceMarkers.forEach(currentMarker => currentMarker.remove())
  greenSpaceMarkers = [] // Clear the array
  
  // 💡 Add markers with popups (e.g., park name)
  filteredFeatures.forEach((feature) => {
    const name = feature.properties.name || 'Unnamed Green Space'
    const center = turf.centroid(feature).geometry.coordinates

    const currentMarker = new mapboxgl.Marker({ color: 'green' })
      .setLngLat(center)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <strong>${name}</strong><br/>
          <button id="go-to-${name.replace(/\s+/g, '-')}" style="margin-top:5px; border-radius:10px; color: white; background-color: #75BE3A">Navigate Here</button>
        `)
      )
      .addTo(map)
    
    greenSpaceMarkers.push(currentMarker) // Store the marker in the array

    // Open the popup when marker is clicked
    currentMarker.getElement().addEventListener('click', () => {
      // Delay to ensure popup is rendered
      setTimeout(() => {
        const btn = document.getElementById(`go-to-${name.replace(/\s+/g, '-')}`)
        if (btn) {
          btn.addEventListener('click', () => {
            navigator.geolocation.getCurrentPosition((position) => {
              const userCoords = [position.coords.longitude, position.coords.latitude]
              const originStr = `${userCoords[1]},${userCoords[0]}` // lat,lon
              const destStr = `${center[1]},${center[0]}` // lat,lon

              const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&travelmode=driving`

              window.open(gmapsUrl, '_blank')

            },
          (error) => {
            console.error('Error getting user location:', error)
            alert('Unable to get your location. Please allow location access.')
          })
          })
        }
      }, 300)
    })
  })

  if(filteredFeatures.length <= 0) {
    alert('No parks found in the selected range.')

  }

    
  // Center the map on user's location
  map.setCenter([lon, lat])
  map.setZoom(14)
}
</script>


<style scoped>
@import 'https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css';

.map-container {
  width: 100%;
  height: 460px;
  position: relative;
  border-radius: 5px;
}

.search-input {
  margin-top: 100px;
  margin-bottom: 10px;
  padding: 10px;
  width: 300px;
}

.container {
  background: none;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  background-color: #E4FDE2;
  border-radius: 10px;
  border-width: 2px;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

h1 {
  font-family: Garamond, serif;
}

.btn-navigator {
  background: #75BE3A;
  color: #fff;
  border: none;
  border-radius: 20px;
  height: 40px;
  width: 120px;
  transform: scale(1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.btn-load:active {
  background: #77e91a;
  color: #fff;
  transform: scale(1.03);
  box-shadow: 0 8px 12px 0px rgba(0, 0, 0, 0.1);
}


@keyframes zoomIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.zoom-in {
  animation: zoomIn 1s ease-in-out;
}

.btn-load {
  background: #75BE3A;
  color: #fff;
  border: none;
  border-radius: 20px;
  height: 60px;
  width: 250px;
  transform: scale(1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.btn-load:hover {
  background: #70ce23;
  transform: scale(1.1);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

.form-select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

@keyframes vibrate {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
}
.vibrate {
  display: inline-block;
  font-family: Garamond, serif;
  font-size: 2rem;
  font-weight: bold;
  animation: vibrate 0.7s linear infinite;
}

.modal-enter-active {
    animation: swing-in-top-fwd 4.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}

.modal-leave-active {
    animation: swing-out-top-fwd 1s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
}

/* @keyframes swing-in-top-fwd {
    0% {
        transform: rotateX(-100deg);
        transform-origin: top;
        opacity: 0;
    }
    100% {
        transform: rotateX(0deg);
        transform-origin: top;
        opacity: 1;
    }
}

@keyframes swing-out-top-fwd {
    0% {
        transform: rotateX(0deg);
        transform-origin: top;
        opacity: 1;
    }
    100% {
        transform: rotateX(-100deg);
        transform-origin: top;
        opacity: 0;
    }
} */

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 8px;
    max-width: 500px;
}

.modal-content h2 {
    color: #2c7f4b;
    margin-bottom: 10px;
}

.modal-content ul {
    margin-bottom: 20px;
}

.modal-content li {
    margin-bottom: 10px;
}

.modal-content button {
    background-color: #2c7f4b;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 15px;
    cursor: pointer;
}

p{
  font-family: Garamond, serif;
}

h5{
  font-family: Garamond, serif;
}
</style>