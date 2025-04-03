<template>
    <div class="desc-container">
      <div class="img-bg w-100" :style="backgroundStyle" alt="Sun illustration">
        <div class="welcome-content">
          <h1 class="welcome-title">
            Welcome to <br /><span class="highlight">SunAware</span>
          </h1>
          <p class="welcome-text col-md-6">
            SunAware is a web application that provides real-time UV index data
            for Australian suburbs. Type in a suburb and click search to find the real-time UV!
          </p>
        </div>

        <div class="search-box">
          <input
            type="text"
            v-model="query"
            @input="searchLocations"
            placeholder="Type a suburb..."
            class="search-input"
          />
          <button
            type="submit"
            class="search-btn"
            @click="searchUvIndex"
          >
            <img
              src="https://i.imgur.com/sijPEYJ.png"
              alt="Search"
            />
          </button>
        </div>
        <ul v-if="suggestions.length > 0" class="suggestions">
          <li
            v-for="(location, index) in suggestions"
            :key="index"
            @click="selectLocation(location)"
          >
            {{ location.display_name }}
          </li>
        </ul>
      </div>
  
      <div v-if="uvData" class="uv-container">
        <div class="uv-index-top" id="uv-container-home">
          <div class="uv-index-display" :style="{ borderColor: getUvColor(uvData.now.uvi) }">
            <h2>Current UV Index</h2>
            <div class="uv-index-value">
              <span :style="{ color: getUvColor(uvData.now.uvi) }">{{ uvData.now.uvi }}</span>
            </div>
            <p class="uv-index-label" :style="{ color: getUvColor(uvData.now.uvi) }">
              {{ getUvLevel(uvData.now.uvi) }}
            </p>
          </div>
  
          <div class="uv-risk-scale">
            <h2>UV Risk Scale</h2>
            <div class="uv-risk-level" v-for="(level, index) in uvLevels" :key="index">
              <span class="uv-color-box" :style="{ backgroundColor: level.color }"></span>
              <span class="uv-level-text">{{ level.text }}</span>
            </div>
          </div>
        </div>
  
        <div class="uv-chart">
          <h2>UV Index Chart</h2>
          <canvas ref="uvChart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  </script>
  
  <style scoped>

  </style>