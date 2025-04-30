<template>
  <div class="container">
    <transition name="title-fade">
      <h1 class="title" v-if="!journeyStarted">A Day in the Life of Daniel</h1>
    </transition>
    <div class="content">
      <transition name="character-move">
        <div
          v-if="showCharacter"
          class="character"
          :class="{ 'character-hover': characterHover, 'character-journey': journeyStarted }"
          @mouseover="characterHover = true"
          @mouseleave="characterHover = false"
        >
          <img
            src="https://images.squarespace-cdn.com/content/v1/55947ac3e4b0fa882882cd65/1487641787332-9F8W4SAPWAFBHXSM46V4/NS_0148.png?format=750w"
            alt="Cartoon Character"
          />
          <div v-if="!journeyStarted" class="bubble-link">
            <div class="bubble small" v-show="bubbleStep >= 1"></div>
            <div class="bubble medium" v-show="bubbleStep >= 2"></div>
            <div class="bubble large" v-show="bubbleStep >= 3">
              <span class="bubble-text">
                Go through a day in Daniel's life, a 27-year-old IT professional, and help him make sustainable choices.
              </span>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="video-container" v-if="!journeyStarted" :class="{ 'video-jump': videoShouldJump }" @click="onVideoClick">
          <iframe
            class="video"
            src="https://www.youtube.com/embed/mwzAht335zA"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <transition name="tip-person-fade">
            <div
              v-if="showTipPerson"
              class="tip-person-on-video"
              :class="{ 'tip-person-animate': tipPersonEntered }"
            >
              <img
                class="tip-person-img"
                src="https://images.squarespace-cdn.com/content/v1/55947ac3e4b0fa882882cd65/1487641701189-HLMRBK62ZRZATDBHME9O/NS_0098.png?format=500w"
                alt="tip person"
              />
              <div class="tip-bubble-link tip-bubble-diag">
                <div class="bubble small" v-show="bubbleStep2 >= 1"></div>
                <div class="bubble medium" v-show="bubbleStep2 >= 2"></div>
                <div class="bubble large" v-show="bubbleStep2 >= 3">
                  <span class="bubble-text2">Watch video to know what sustainable is!</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>

    <transition name="card-fade">
      <div v-if="journeyStarted" class="story-card-center new-style-card">
        <div class="progress-bar new-progress-bar">
          <template v-for="(step, idx) in steps" :key="idx">
            <div
              class="step new-step"
              :class="{active: currentStep === idx}"
            >{{ (idx+1).toString().padStart(2,'0') }}</div>
            <div v-if="idx < steps.length-1" class="new-line"></div>
          </template>
        </div>
        <div class="big-title">{{ steps[currentStep].title }}</div>

        <div v-if="currentStep === 3">
          <div class="choice-card">
            <div class="question-title">{{ steps[3].question }}</div>
            <div class="question-desc">{{ steps[3].subdesc }}</div>
            <div class="options">
              <button
                v-for="opt in steps[3].options"
                :key="opt.value"
                :class="{ selected: choice === opt.value }"
                @click="choose(opt.value)"
              >
                {{ opt.text }}
              </button>
            </div>
          </div>
          <transition name="fade">
            <div v-if="!choice" class="pro-tip-wrap">
              <div class="pro-tip">
                <span class="pro-tip-icon">💡</span>
                <b>Pro tip</b>
              </div>
              <div class="pro-tip-text">{{ steps[3].protip }}</div>
            </div>
          </transition>
          <transition name="fade">
            <button
              v-if="choice"
              class="next-btn2"
              @click="goNext"
              style="float: right; margin-top: 44px; margin-right:24px;"
            >
              Next <span class="arrow">&#8594;</span>
            </button>
          </transition>
        </div>

        <template v-else>
          <div v-if="steps[currentStep].overlay" class="img-overlay-box">
            <img class="card-img" :src="steps[currentStep].img" alt="Step image" />
            <div class="img-overlay">
              <div class="img-overlay-text" v-html="steps[currentStep].overlay"></div>
            </div>
          </div>
          <img v-else class="card-img" :src="steps[currentStep].img" alt="Step image" />
          <button
            class="next-btn2"
            :disabled="currentStep === steps.length - 1"
            @click="goNext"
          >
            Next
            <span class="arrow">&#8594;</span>
          </button>
        </template>
      </div>
    </transition>

    <transition name="fade">
      <button
        class="start-button"
        v-if="!journeyStarted"
        @click="startJourney"
      >
        Start Journey
      </button>
    </transition>
  </div>
</template>

<script>
import light from '@/assets/images/light.png';
import nightlight from '@/assets/images/nightlight.png';
export default {
  data() {
    return {
      characterHover: false,
      journeyStarted: false,
      choice: null,
      showCharacter: true,
      currentStep: 0,
      bubbleStep: 0,
      videoShouldJump: false, 
      steps: [
        {
          title: "1- Wake Up",
          desc: "Daniel wakes up at 7:00 AM and turns on the light.",
          img: light
        },
        {
          title: "1- Wake Up",
          desc: "It's still a Halogen Bulb — warming up fast, but wasting energy.",
          img: nightlight
        },
        {
          title: "1- Wake Up",
          desc: "It's still a Halogen Bulb — warming up fast, but wasting energy.",
          img: nightlight,
          overlay: "It uses <b>~100 Watts</b> of electricity and can<br>rise the temperature of the room by <b>2° - 4°</b>"
        },
        {
          title: "1- Wake Up",
          question: "What should Daniel do?",
          subdesc: "Choose a option and help him make a sustainable choice",
          options: [
            { text: "Switch to LEDs", value: "led" },
            { text: "Keep using Halogen", value: "halogen" }
          ],
          protip: "Switching 3 Halogen bulbs to LEDs saves $16/year + reduce temperature by 2° ~ 4°"
        }
      ]
    };
  },
  mounted() {
    this.bubbleStep = 0;
    setTimeout(() => this.bubbleStep = 1, 900);
    setTimeout(() => this.bubbleStep = 2, 1300);
    setTimeout(() => this.bubbleStep = 3, 1750);

    this.videoShouldJump = false;
    setTimeout(() => this.videoShouldJump = true, 1800);
    setTimeout(() => this.videoShouldJump = false, 3000);

    this.showTipPerson = true;
    this.tipPersonEntered = false;
    this.bubbleStep2 = 0;
    setTimeout(() => {
      this.tipPersonEntered = true;
      setTimeout(() => this.bubbleStep2 = 1, 350);
      setTimeout(() => this.bubbleStep2 = 2, 600);
      setTimeout(() => this.bubbleStep2 = 3, 850);
    }, 300);
  },
  methods: {
    startJourney() {
      this.journeyStarted = true;
      this.currentStep = 0;
      this.choice = null;
      this.showTipPerson = false;
    },
    goNext() {
      if(this.currentStep < this.steps.length - 1) {
        this.currentStep += 1;
        this.choice = null;
      }
    },
    choose(val) {
      this.choice = val;
    },
    onVideoClick() {
    this.showTipPerson = false;
  },
  }
};
</script>

<style scoped>

.container {
  text-align: center;
  position: relative;
  width: 100%;        
  min-width: 100%;    
  max-width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #75be3a, #f0f0f0);
  min-height: 100vh;
  background-size: cover;
  background-attachment: fixed;
  box-sizing: border-box;
  padding-top: 100px;
  padding-bottom: 20px;
}

.title {
  font-size: 36px;
  margin-bottom: 30px;
  font-family: 'Georgia', serif;
  font-weight: 700;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 30px;
  min-height: 320px;
}

.character {
  position: relative;
  width: 30%;
  transition: transform 0.7s cubic-bezier(.68,-0.55,.27,1.55);
  z-index: 3;
  min-width: 160px;
  max-width: 240px;
  min-height: 230px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.character-hover {
  transform: rotate(5deg);
}
.character img {
  width: 100%;
  max-width: 200px;
  transition: width 0.3s;
}

.bubble-link {
  position: absolute;
  top: 50px;   
  left: 80%;   
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  gap: 7px;
}

.bubble {
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 9px rgba(0,0,0,0.13);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #222;
  overflow: hidden;
}

.small {
  width: 13px;
  height: 13px;
  margin-left: -30px;
}
.medium {
  width: 24px;
  height: 24px;
  margin-left: -10px;
}
.large {
  width: 180px;
  height: 180px;
  min-width: 180px;
  min-height: 180px;
  max-width: 220px;
  max-height: 220px;
  font-size: 16px;
  padding: 22px;
}
.bubble-text {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #333;
  line-height: 1.3;
  word-break: break-word;
}
.bubble-text2 {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #333;
  line-height: 1.3;
  word-break: break-word;
}

@media (max-width: 700px) {
  .bubble-link {
    left: 70%;
    top: 0;
    gap: 6px;
  }
  .large {
    width: 90px;
    height: 90px;
    min-width: 90px;
    min-height: 90px;
    max-width: 140px;
    max-height: 140px;
    font-size: 13px;
    padding: 10px;
  }
}

.character-journey {
  transform: scale(0.45) translate(-150px, 350px);
  position: fixed !important;
  left: 0;
  bottom: 0;
  top: unset !important;
  right: unset !important;
  z-index: 10;
  width: 180px !important;
  min-width: unset;
  max-width: unset;
  min-height: unset;
  background: none;
  pointer-events: none;
}

.character-move-enter-active,
.character-move-leave-active {
  transition: all 0.7s cubic-bezier(.68,-0.55,.27,1.55);
}

.story-card-center {
  position: fixed;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 340px;
  max-width: 92vw;
  background: #fff;
  border-radius: 26px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  animation: cardIn 0.7s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes cardIn {
  0% { opacity:0; transform: scale(0.8) translate(-50%, -50%);}
  100% { opacity:1; transform: scale(1) translate(-50%, -50%);}
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.step {
  width: 32px;
  height: 32px;
  background: #e6e6e6;
  color: #ff9800;
  font-weight: bold;
  border-radius: 50%;
  line-height: 32px;
  font-size: 18px;
  text-align: center;
  margin: 0 4px;
  border: 2px solid #ff9800;
  transition: background 0.3s;
}
.step.active {
  background: #ff9800;
  color: #fff;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
}
.card-content {
  font-size: 16px;
  margin-bottom: 28px;
  text-align: center;
}
.card-options {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 12px;
}
.card-options button {
  padding: 7px 24px;
  font-size: 15px;
  border-radius: 18px;
  background: #eee;
  border: 1.5px solid #ff9800;
  color: #ff9800;
  font-weight: bold;
  transition: background 0.2s, color 0.2s, border 0.2s;
  cursor: pointer;
}
.card-options button.selected,
.card-options button:hover {
  background: #ff9800;
  color: #fff;
  border: 1.5px solid #ff9800;
}
.next-btn {
  align-self: flex-end;
  padding: 7px 18px 7px 12px;
  font-size: 15px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: not-allowed;
  opacity: 0.7;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
}
.next-btn2 {
  align-self: flex-end;
  padding: 9px 24px 9px 16px;
  font-size: 19px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  opacity: 1;
  margin-top: 22px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: bold;
  transition: opacity 0.2s;
}
.next-btn2:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.video-container {
  width: 40%;
  padding-top: 40%;
  position: relative;
  min-width: 200px;
  min-height: 180px;
  position: relative;
  z-index: 2;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
}

.start-button {
  padding: 15px 30px;
  font-size: 18px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: -100px;
}
.start-button:hover {
  transform: scale(1.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.card-fade-enter-active, .card-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(.68,-0.55,.27,1.55);
}
.card-fade-enter, .card-fade-leave-to {
  opacity: 0;
}

@media (max-width: 700px) {
  .content {
    flex-direction: column;
    align-items: center;
    min-height: unset;
  }
  .character {
    width: 90vw;
    max-width: 260px;
    min-width: 120px;
  }
  .video-container {
    width: 95vw;
    padding-top: 55vw;
    min-width: 0;
    min-height: 120px;
  }
  .character-journey {
    transform: scale(0.5) translate(-30vw, 42vw);
    width: 120px !important;
  }
  .story-card-center {
    width: 98vw;
    max-width: 99vw;
    padding: 12px 2vw;
  }
}
.new-style-card {
  background: #e8ffe0;
  border-radius: 20px;
  padding: 28px 18px 28px 18px; 
  top: 55%;  
  transform: translate(-50%, -50%);
  max-width: 600px;
  width: 92vw;
  box-shadow: 0 2px 24px 0 rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 520px;
}

.big-title {
  font-size: 42px;
  font-family: 'Georgia', serif;
  color: #165c22;
  margin-bottom: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 0;
}

.card-desc {
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  color: #222;
  margin-bottom: 32px;
  font-weight: bold;
  text-align: center;
  font-style: italic;
}

.card-img {
  width: 100%;
  max-width: 320px; 
  aspect-ratio: 4 / 3;
  object-fit: cover; 
  border-radius: 18px;
  margin: 0 auto;
  display: block;
  background: #fff;
}

@media (max-width: 700px) {
  .new-style-card {
    min-height: 320px;
    padding: 20px 5vw 18px 5vw;
  }
  .big-title {
    font-size: 25px;
    margin-bottom: 10px;
  }
  .card-desc {
    font-size: 15px;
    margin-bottom: 20px;
  }
  .card-img {
    max-width: 96vw;
    border-radius: 10px;
  }
  .new-step, .step {
    width: 26px; height: 26px; line-height: 26px; font-size: 13px;
  }
  .new-line {
    width: 18px;
    height: 3px;
  }
}
.new-progress-bar {
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 38px;
  margin-top: 6px;
  gap: 0;
}
.new-step {
  background: #b7e5b6;
  color: #247a31;
  font-weight: bold;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 18px;
  border: none;
  margin: 0 4px;
  transition: background 0.3s;
}
.new-step.active {
  background: #165c22;
  color: #fff;
}
.new-line {
  width: 38px;
  height: 4px;
  background: #b7e5b6;
  margin: 0 4px;
  border-radius: 2px;
}

.arrow {
  font-size: 22px;
  margin-left: 2px;
}

.img-overlay-box {
  position: relative;
  width: 100%;
  max-width: 320px;
  margin: 0 auto 18px auto;
}
.img-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-overlay-text {
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  padding: 24px 12px;
  font-weight: 400;
  line-height: 1.5;
}
.img-overlay-text b {
  font-weight: 700;
  font-size: 1.2em;
}
.choice-card {
  background: #a6daa7;
  border-radius: 24px;
  padding: 48px 36px 38px 36px;
  margin: 0 auto 24px auto;
  max-width: 650px;
  text-align: center;
}
.question-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
  font-family: 'Georgia', serif;
  color: #165c22;
}
.question-desc {
  color: #222;
  margin-bottom: 36px;
  font-size: 1.15rem;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
.options button {
  width: 100%;
  max-width: 500px;
  background: #fff;
  border-radius: 40px;
  border: none;
  font-size: 1.37rem;
  padding: 20px 0;
  color: #222;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.15s;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.05);
}
.options button.selected,
.options button:active {
  background: #165c22;
  color: #fff;
}

.pro-tip-wrap {
  margin: 36px auto 0 auto;
  max-width: 550px;
  text-align: center;
}
.pro-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  font-size: 1.15rem;
  font-weight: 700;
  color: #664d00;
}
.pro-tip-icon {
  font-size: 1.5em;
}
.pro-tip-text {
  margin-top: 12px;
  background: #ffeebc;
  border-radius: 18px;
  padding: 12px 18px;
  font-size: 1.08rem;
  color: #664d00;
  display: inline-block;
}

@media (max-width: 900px) {
  .choice-card { padding: 28px 2vw 18px 2vw; }
  .options button { padding: 14px 0; font-size: 1.05rem;}
  .pro-tip-wrap { font-size: 1rem;}
  .next-btn2 {
    right: 10vw;
    left: 10vw;
    bottom: 12vw;
    width: 80vw;
    max-width: 500px;
    justify-content: center;
    padding: 14px 0;
    font-size: 1.1rem;
  }
}

.title-fade-enter-active, .title-fade-leave-active {
  transition: opacity 0.7s cubic-bezier(.55,0,.1,1), transform 0.7s cubic-bezier(.55,0,.1,1);
}
.title-fade-enter, .title-fade-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.92);
}
.title-fade-enter-to, .title-fade-leave {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.video-jump {
  animation: videoJump 0.7s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes videoJump {
  0% { transform: translateY(0);}
  10% { transform: translateY(-10px);}
  20% { transform: translateY(6px);}
  30% { transform: translateY(-6px);}
  40% { transform: translateY(4px);}
  50% { transform: translateY(-2px);}
  60% { transform: translateY(1px);}
  70% { transform: translateY(0);}
  100% { transform: translateY(0);}
}
.tip-person-on-video {
  position: absolute;
  z-index: 10;
  right: -45px; 
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  transform: translateX(80px) scale(0.82);
  transition: opacity 0.6s, transform 0.85s cubic-bezier(.55,0,.1,1);
}
.tip-person-on-video.tip-person-animate {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.tip-person-img {
  width: 100px;
  height: 200px;
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(0 4px 16px rgba(0,0,0,0.14));
}

.tip-bubble-link {
  position: absolute;
  top: -44px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

@media (max-width: 700px) {
  .tip-person-img { width: 54px; height: 70px; }
  .tip-person-on-video { right: -22px; bottom: -22px; }
  .tip-bubble-link { top: -30px; }
}

.tip-person-fade-enter-active, .tip-person-fade-leave-active {
  transition: opacity 0.65s, filter 0.65s;
}
.tip-person-fade-leave-to {
  opacity: 0;
  filter: blur(3px);
}

.tip-bubble-diag {
  position: absolute;
  left: 100%; 
  bottom: 75%;
  width: 160px;
  height: 140px;
  pointer-events: none;
}

.tip-bubble-diag .bubble.small {
  position: absolute;
  left: 65px;
  top: 40px;
  width: 13px;
  height: 13px;
  z-index: 3;
  margin: 0;
  transform: none;
}

.tip-bubble-diag .bubble.medium {
  position: absolute;
  left: 80px;
  top: 25px;
  width: 22px;
  height: 22px;
  z-index: 2;
  margin: 0;
  transform: none;
}

.tip-bubble-diag .bubble.large {
  position: absolute;
  left: 72px;
  top: -80px;
  width: 110px;
  height: 110px;
  min-width: 110px;
  min-height: 110px;
  max-width: 150px;
  max-height: 150px;
  font-size: 1rem;
  padding: 10px;
  z-index: 1;
  margin: 0;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tip-bubble-diag .bubble-text {
  color: #333;
  font-size: 1rem;
  text-align: center;
  display: block;
  padding: 10px 8px;
  line-height: 1.5;
}

</style>