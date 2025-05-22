<template>
  <div class="info-root">
    <section class="info-hero">
      <div class="info-hero-bg"></div>
      <div class="info-hero-content">
        <h1 class="info-hero-title">
          <span>Reimagine Melbourne with</span><br/>
          <span>More Green, Less Heat.</span>
        </h1>
        <p class="info-hero-desc">
          Discover how trees, parks, and rooftop gardens can transform our cities into cooler, healthier, more sustainable spaces for everyone.
        </p>
      </div>
      <div class="info-hero-img-row">
        <div class="half-grey-img">
            <img class="img-gray" src="@/assets/images/infotitlebg.png" alt="">
            <img class="img-color" src="@/assets/images/infotitlebg.png" alt="">
        </div>
      </div>
    </section>

    <nav class="info-tabs">
      <div
        v-for="(tab, i) in tabs"
        :key="tab.key"
        :class="['info-tab', { active: currentTab === i }]"
        @click="currentTab = i"
      >
        {{ tab.label }}
      </div>
    </nav>
    
    <section class="info-content">
      <transition name="fade" mode="out-in">
        <div v-if="currentTab === 0" key="tab0">
          <!-- What is Urban Greening -->
          <div class="info-section">
            <div class="info-section-row">
              <div class="info-section-col">
                <h2 class="info-section-title">
                  <span class="emoji">🌱</span>
                  What is Urban Greening?
                </h2>
                <div class="info-section-desc">
                  Urban greening means increasing vegetation — trees, plants, parks, rooftop gardens — within our city environments. It's about much more than looks. Greening helps reduce heat, improve air quality, and enhance liveability.
                </div>
              </div>
              <div class="info-section-col info-section-img">
                <img src="@/assets/images/info1.png" alt="Urban Greening" />
              </div>
            </div>
            <div class="info-section-row second">
              <div class="info-section-col info-section-img">
                <img src="@/assets/images/info2.png" alt="Melbourne needs greenery" />
              </div>
              <div class="info-section-col">
                <h3 class="info-section-title">Why Melbourne Needs It</h3>
                <div class="info-section-desc">
                  Inner Melbourne suburbs like the CBD, Southbank and Carlton are full of tall buildings and paved streets but have very little tree cover. This contributes to:
                </div>
                <ul class="info-list">
                  <li>🔥 Hotter indoor and outdoor environments</li>
                  <li>💨 Poor air quality</li>
                  <li>⚡ Increased energy consumption for cooling</li>
                  <li>🌳 Reduced use of green spaces</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="currentTab === 1" key="tab1">
          <div v-if="!impactStarted" class="impact-intro">
            <h2 class="impact-title">
              Do you know that&nbsp; heating and<br/>
              cooling can account for 20% to 50%<br/>
              of energy used in Australian homes?
            </h2>
            <div class="impact-desc">
              What will happen if 27,309,396 Australians turn off their<br/>
              air conditioner an hour earlier than before?
            </div>
            <div class="impact-btn-area">
              <button class="impact-btn" @click="impactStarted = true">What will happen?</button>
            </div>
          </div>
          <div v-else class="impact-sim">
            <div class="impact-top-figures">
              <img src="@/assets/images/girls.png" class="impact-figure" alt="Action Figure" />
              <div class="impact-sim-title">Your action toward green city matters!</div>
              <img src="@/assets/images/earth1.png" class="impact-earth" alt="Earth" />
            </div>
            <div class="impact-card">
              <div class="impact-slider-label">
                If all residents turned off their air conditioners a few minutes earlier each day, how much less residential energy would be consumed across Australia?
              </div>
              <input
                type="range"
                min="0"
                max="4"
                step="1"
                v-model="slider"
                class="impact-slider"
              />

              <div class="impact-slider-row">
                <span v-for="n in 5" :key="n" class="slider-num" :class="{active: slider == n-1}">
                  {{ (n-1)*30 }}
                </span>
              </div>

              <div class="impact-chart-area">
                <EnergyCompareChart :slider="slider"/>
              </div>
              <img src="@/assets/images/tent.png" class="impact-tent" alt="Tent Sticker" />
            </div>

            <div style="margin-left: 12px; color: #888; font-size: 14px;">
              <span style="background: #eef6fb; border-radius: 4px; padding: 4px 8px;">
                ℹ️ Australians average 2 hours of air conditioning cooling per person per day
              </span>
            </div>

            <div class="bubble-tip">
              <span class="bubble-icon">💡</span>
              <span class="bubble-content">
                Did you know that a nuclear power station generates approximately <b>35 petajoules</b> of energy per year?
              </span>
            </div>

          </div>
        </div>
      </transition>
    </section>
    <div class="discover-bar-inline">
        <button class="discover-btn"  @click="goToGreenMap">
            <span class="emoji">🌳</span> Let's discover your nearby green space!!
        </button>
        <div class="discover-tip">
            <span class="tip-emoji">💡</span>
            <span class="tip-text">Tip: Greener places are closer than you think!</span>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EnergyCompareChart from '@/components/EnergyCompareChart.vue'
const currentTab = ref(0)
const impactStarted = ref(false)
const slider = ref(3)


const router = useRouter()
function goToGreenMap() {
  router.push('/GreenMap')
}

const tabs = [
  { label: 'What is Urban Greening?', key: 'urban' },
  { label: 'Your Impact on Energy', key: 'impact' }
]
</script>

<style scoped>
.info-root {
  /* background: #fff; */
  min-height: 100vh;
  font-family: 'DM Sans', Arial, sans-serif;
  color: #181818;
}

.info-hero {
  position: relative;
  padding-bottom: 30px;

}
.info-hero-bg { display:none; }
.info-hero-content {
  text-align: center;
  padding: 54px 8vw 27px 8vw;
  max-width: 950px; margin: auto;
}
.info-hero-title {
  font-family: 'DM Serif Display', serif;
  font-size: 3.2rem;
  font-weight: 600;
  margin-bottom: 0.7em;
  line-height: 1.13;
  letter-spacing: 0.01em;
}
.info-hero-desc {
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 1.12rem;
  color: #222;
  max-width: 570px;
  margin: 0 auto;
  margin-bottom: 1.1em;
}

.info-hero-img-row {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  padding: 0 0 0 0;
}
.info-hero-img-split {
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 10px;
  margin: 0 auto;
}
.info-hero-img {
  width: 50%;
  height: 320px;
  object-fit: cover;
  object-position: center;
  display: block;
}
.info-img-left { filter: grayscale(1);}

@media (max-width: 900px) {
  .info-hero-title { font-size: 2.2rem; }
  .info-hero-img { height: 210px;}
}
@media (max-width: 600px) {
  .info-hero-content { padding: 32px 2vw 12px 2vw;}
  .info-hero-img-split { flex-direction: column;}
  .info-hero-img { width: 100%; height: 140px;}
}

.info-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 56px;
  margin: 0 auto 37px auto;
  /* background: #fff; */
  padding: 0;
  font-size: 1.18rem;
  font-family: 'DM Sans', Arial, sans-serif;
  border-bottom: 1.5px solid #e1e1e1;
  max-width: 100vw;
}
.info-tab {
  padding: 28px 0 18px 0;
  margin: 0 12px;
  color: #888;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2.4px solid transparent;
  transition: color 0.17s, border 0.17s;
  font-size: 1.07em;
}
.info-tab.active {
  color: #181818;
  font-weight: 700;
  border-bottom: 2.4px solid #19b548;
  background: linear-gradient(90deg, #19b54833 0%, #fff0 100%);
}

.info-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 20px 70px 20px;
}

.info-section {
  margin-bottom: 70px;
}
.info-section-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px 32px;
}
.info-section-row.second {
  margin-top: 80px;
}

.info-section-col {
  flex: 1 1 340px;
  min-width: 270px;
  /* max-width: 200%; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.info-section-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 14px #0001;
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .info-section-row { flex-direction: column; }
  .info-section-col, .info-section-img img { max-width: 100%; }
  .info-section-img img { height: 120px;}
}
@media (max-width: 600px) {
  .info-content { padding: 14px 3vw 44px 3vw;}
  .info-section-row { gap: 14px;}
}


.info-section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 2.1rem;
  font-weight: 600;
  color: #161616;
  margin: 0 0 22px 0;
  line-height: 1.18;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.info-section-title .emoji { font-size: 1.3em; margin-right: 0.2em; }
.info-section-subtitle {
  font-family: 'DM Serif Display', serif;
  font-size: 1.37rem;
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 0;
}
.info-section-desc {
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 1.09rem;
  color: #252525;
  line-height: 1.62;
  margin-bottom: 13px;
  font-weight: 400;
}
.info-list {
  margin: 18px 0 0 0;
  padding-left: 0;
  list-style: none;
}
.info-list li {
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 1.1rem;
  color: #252525;
  margin-bottom: 7px;
  padding-left: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.7em;
}
.info-list-green li {
  color: #19b548;
  font-weight: 600;
  font-size: 1.08em;
}
.info-list-green li {
  color: #181818;
  font-weight: 400;
  font-size: 1.08em;
}
.info-list-green li::before {
  content: "✔️";
  color: #19b548;
  margin-right: 0.5em;
  font-size: 1em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to { opacity: 0; }

.half-grey-img {
  position: relative;
  width: 100%;
  max-width: 1000px;
  aspect-ratio: 1280/564;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
}
.half-grey-img img {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 24px;
}
.img-gray {
  z-index: 1;
  filter: grayscale(1);
  clip-path: inset(0 50% 0 0);
}
.img-color {
  z-index: 2;
  clip-path: inset(0 0 0 50%);
}

.discover-bar-inline {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 22px;
  margin: 0px auto 40px auto;

  padding: 20px 5vw;
  max-width: 900px;
  border-radius: 28px;
  box-shadow: 0 2px 24px 0 rgba(60,180,100,0.04);
}

.discover-btn {

  font-size: 1.25rem;
  font-family: 'DM Sans', Arial, sans-serif;
  font-weight: 700;
  padding: 17px 32px;
  background: #75BE3A;
  color: #fff;
  border: none;
  border-radius: 20px;
  transform: scale(1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  align-items: center;
  gap: 0.6em;
  transition: transform 0.3s ease, background-color 0.3s ease;
}
.discover-btn:hover {
  cursor: pointer;
    background: #70ce23;
    transform: scale(1.1);
}
.discover-btn .emoji {
  font-size: 1.45em;
}

.discover-tip {
  display: flex;
  align-items: center;
  background: #e9ffe2;
  color: #1d9b4f;
  font-size: 1.08rem;
  border-radius: 16px;
  padding: 8px 18px;
  margin-left: 16px;
  box-shadow: 0 2px 12px 0 rgba(60,180,100,0.03);
  font-family: 'DM Sans', Arial, sans-serif;
  font-weight: 500;
  gap: 0.7em;
}
.tip-emoji {
  font-size: 1.2em;
}

@media (max-width: 700px) {
  .discover-bar-inline {
    flex-direction: column;
    gap: 10px;
    padding: 13px 2vw;
    border-radius: 20px;
  }
  .discover-btn {
    width: 100%;
    justify-content: center;
    padding: 13px 0;
    font-size: 1.1rem;
  }
  .discover-tip {
    width: 100%;
    justify-content: center;
    font-size: 1rem;
    padding: 7px 6px;
    margin-left: 0;
  }
}

.impact-intro {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0px;
  padding-bottom: 40px;
}

.impact-title {
  font-family: 'DM Serif Display', serif;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.15;
  margin-bottom: 48px;
  color: #181818;
}

@media (max-width: 800px) {
  .impact-title { font-size: 2.4rem; }
}
@media (max-width: 500px) {
  .impact-title { font-size: 1.45rem; }
}

.impact-desc {
  font-family: 'DM Serif Display', serif;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #181818;
  font-weight: 600;
}

.impact-btn-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}


.impact-btn {
  width: 330px;
  max-width: 90vw;
  background: #a2e8b0;
  color: #222;
  font-family: 'DM Sans', Arial, sans-serif;
  font-size: 1.18rem;
  font-weight: 600;
  border: none;
  border-radius: 38px;
  padding: 26px 0 22px 0;
  margin-top: 10px;
  box-shadow: 0 4px 24px 0 rgba(30, 180, 80, 0.08);
  cursor: pointer;
  text-align: center;
  transition: background 0.14s, transform 0.12s;
}
.impact-btn:hover {
  background: #71d08c;
  color: #fff;
  transform: scale(1.04);
}

.impact-sim {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;
}

.impact-top-figures {
  width: 100%;
  max-width: 800px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 8px;
}

.impact-figure {
  position: absolute;
  left: 0;
  top: -16px;
  width: 120px;
  height: auto;
  z-index: 2;
}

.impact-earth {
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: auto;
  z-index: 2;
}

.impact-sim-title {
  margin: 0 auto;
  padding-top: 16px;
  font-family: 'DM Serif Display', serif;
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  color: #181818;
  z-index: 3;
  max-width: 700px;
}

.impact-card {
  position: relative;
  background: #fff;
  box-shadow: 0 8px 32px 0 rgba(30, 180, 80, 0.08);
  border-radius: 32px;
  padding: 40px 32px 40px 32px;
  margin-top: 12px;
  max-width: 800px;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.impact-slider-label {
  text-align: center;
  font-size: 1.21rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 24px;
}

.impact-slider-row {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 14px;
  font-size: 1.1rem;
  font-family: 'DM Sans', Arial, sans-serif;
  color: #888;
  letter-spacing: 0.05em;
}
.slider-num.active {
  color: #19b548;
  font-weight: bold;
  font-size: 1.2em;
}

.impact-slider {
  width: 100%;
  max-width: 540px;
  margin: 0 auto 30px auto;
  accent-color: #19b548;
  height: 6px;
}

.impact-chart-area {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  margin-bottom: 16px;
}

.impact-tent {
  position: absolute;
  left: 18px;
  bottom: 8px;
  width: 60px;
  height: auto;
  z-index: 1;
}

@media (max-width: 700px) {
  .impact-top-figures {
    max-width: 98vw;
  }
  .impact-figure { width: 64px; }
  .impact-earth { width: 38px; }
  .impact-sim-title { font-size: 1.1rem; }
  .impact-card { padding: 16px 4vw 30px 4vw; }
  .impact-tent { width: 32px; }
}
.bubble-tip {
  top: -620px; 
  right: -570px;
  display: flex;
  align-items: flex-start;
  margin-left: 18px;
  background: #f2f9ff;
  padding: 14px 18px;
  border-radius: 18px;
  box-shadow: 0 2px 8px #0001;
  color: #2b607a;
  font-size: 1.05rem;
  max-width: 270px;
  position: relative;
}
.bubble-tip::before {
  content: '';
  position: absolute;
  left: -18px; top: 18px;
  border-width: 10px 18px 10px 0;
  border-style: solid;
  border-color: transparent #f2f9ff transparent transparent;
}
.bubble-icon {
  font-size: 1.3em;
  margin-right: 8px;
  margin-top: 2px;
}
.bubble-content {
  display: block;
}
@media (max-width: 700px) {
  .table-row-with-tip {
    flex-direction: column;
    align-items: stretch;
  }
  .bubble-tip {
    margin-left: 0;
    margin-top: 16px;
    max-width: 100%;
  }
  .bubble-tip::before {
    display: none;
  }
}
</style>