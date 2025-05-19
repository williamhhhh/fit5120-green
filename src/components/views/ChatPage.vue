<template>
  <div class="plant-app">
    <header class="fade-in">
      <h1>🌞 Recommended plants for me to grow indoors? 💦</h1>
      <p>Customize your personalized plant!</p>
    </header>

    <!-- Condition selection area -->
    <section class="condition-form slide-in-bottom">
      <div class="dropdown-group">
        <label>🌞 Sunlight</label>
        <select v-model="sunlight">
          <option value="">Please select</option>
          <option>Full sun(8 hours per day)</option>
          <option>Partial sun(4 hours per day)</option>
          <option>Bright indirect</option>
          <option>Shade tolerant</option>
        </select>
      </div>
      <div class="dropdown-group">
        <label>💧 Watering frequency</label>
        <select v-model="watering">
          <option value="">Please select</option>
          <option>Multiple times per week</option>
          <option>Once per week</option>
          <option>Once per month</option>
          <option>Rarely</option>
        </select>
      </div>
      <div class="dropdown-group">
        <label>🌱 Soil type</label>
        <select v-model="soil">
          <option value="">Please select</option>
          <option>Leaf mold soil</option>
          <option>Peat soil</option>
          <option>Sandy soil</option>
          <option>General garden soil</option>
        </select>
      </div>
      <button @click="getAdvice" :disabled="loading || !isComplete">Get advice</button>
    </section>

    <!-- GPT advice cards -->
    <section class="advice-card-area" v-if="gptCards.length">
      <div class="plant-advice-card" v-for="(card, idx) in gptCards" :key="idx">
        <div class="markdown-box" v-html="parseMarkdown(card)"></div>
      </div>
    </section>
    <div v-if="gptCards.length" class="carbon-footprint-nav-area">
      <div class="fun-tips">
        🌍 There's more to green living than keeping plants!  
        <span class="fun-highlight">Click the button below to see how amazing your carbon footprint is!</span>
        <br>
        🚴‍♂️ How much more CO₂ can be reduced? Go ahead and explore!
      </div>
      <router-link to="/GreenCalculator" class="carbon-nav-btn">
        🚀 Understanding my carbon footprint
      </router-link>
    </div>

    <!-- Plant info cards (shown only if not queried yet) -->
    <section class="plant-cards slide-in-left" v-if="!gptCards.length">
      <div v-for="plant in plants" :key="plant.id" class="plant-card">
        <img :src="plant.image" :alt="plant.name" />
        <h3>{{ plant.name }}</h3>
        <p>{{ plant.brief }}</p>
        <a href="#" @click.prevent="getPlantDetail(plant)">Learn More</a>
      </div>
    </section>
      <div v-if="loading" class="loading-overlay">
          <div class="spinner"></div>
          <div class="loading-text">🌱It is coming~~~~🌱</div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const sunlight = ref('')
const watering = ref('')
const soil = ref('')
const loading = ref(false)
const gptCards = ref([])

const plants = [
  { id: 1, name: 'Dracaena trifasciata', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFVeGcFNwNPOV9HvhJDGWbDFbD5uFzy7TcwZZKkdOfVegXcz1KFcRLgkMh6yz9P9S5IUvH7FTFpD_gy1HF_-FSyw', brief: 'Dracaena trifasciata like bright and ventilated environment, not hardy, pay attention to shade in summer.' },
  { id: 2, name: 'Monstera deliciosa', image: 'https://p2.itc.cn/images01/20220716/656eb023b18044e9972384b3fe839fed.png', brief: 'Monstera deliciosa are more shade-tolerant, the ornaments should be loose and airy, and watering should be moderate.' },
  { id: 3, name: 'Cactus', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SYOl3WIUcbEBXMwi8mNYmXBtoGh19qwWMQ&s', brief: 'Cactus are extremely drought tolerant and can survive without water for months.' },
]

const isComplete = computed(() => sunlight.value && watering.value && soil.value)

async function getAdvice() {
  if (!isComplete.value) return
  loading.value = true
  gptCards.value = []
  const prompt = 
According to the following plant growing conditions, please tell me in the form of a card about the recommended plants for indoor growing and their characteristics, and give me advice on their care with point-by-point descriptions, and please be informative and use markdown formatting. And only give four options. And important just give me the content of the card, not the summary information and General Care Tips and all general summary provideby you and Important Note, Only content include Characteristics and Care!!!!!!Answers are formatted in the same font as the previous entry.
- Sunlight: ${sunlight.value}
- Watering frequency: ${watering.value}
- Soil type: ${soil.value}
  .trim()
  try {
    const { data } = await axios.post('https://api.coolthecities.com/chat', { prompt })
    gptCards.value = splitIntoCards(data.message)
  } catch (e) {
    gptCards.value = ['<span style="color:red">Failed to get advice, please try again later.</span>']
  } finally {
    loading.value = false
  }
}

function splitIntoCards(md) {
// Remove first line title and separators
md = md.replace(/^#.*\n?/, '').replace(/^---+$/gm, '');

// Find all digit-dot-space numbered cards
const matches = Array.from(md.matchAll(/(\d+\.\s+)/g));
if (matches.length === 0) return [md.trim()];

const indices = matches.map(m => m.index);
const cards = [];

for (let i = 0; i < indices.length; i++) {
  const start = indices[i];
  const end = indices[i + 1] !== undefined ? indices[i + 1] : md.length;
  let card = md.slice(start, end).trim();

  if (i === indices.length - 1) {
    card = card.replace(/(\n+General (Indoor )?Plant Care Tips:.*)$/is, '');
    card = card.replace(/(\n+Conclusion.*)$/is, '');
    card = card.replace(/(\n+General Care Advice for All Plants.*)$/is, '');
  }

  cards.push(card);
}
// Filter out summary cards
return cards.filter(card => !/^summary|^#* *summary/i.test(card));
}

function parseMarkdown(md) {
md = md.replace(/^#{1,6}\s*/gm, '');
md = md.replace(/^(\d+\.\s*)([^\n]+)$/gm, (match, num, title) => {
  if (!/Characteristics|Care/i.test(title)) {
    return ${num}<span class="plant-name">${title.trim()}</span>;
  }
  return match;
});

md = md.replace(/Characteristics:/g, '<span class="section-title">Characteristics:</span>');
md = md.replace(/Care:/g, '<span class="section-title">Care:</span>');
md = md.replace(/\*\*Light Needs:\*\*/g, '<span class="not-bold">Light Needs:</span>');
md = md.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
md = md.replace(/\*(.*?)\*/g, '<em>$1</em>');
md = md.replace(/^- (.*?)$/gm, '<li>$1</li>');
md = md.replace(/\n/g, '<br>');
return md;
}

function getPlantDetail(plant) {
  let url = ''
  switch (plant.id) {
    case 1: url = 'https://en.wikipedia.org/wiki/Dracaena_trifasciata'; break
    case 2: url = 'https://en.wikipedia.org/wiki/Monstera_deliciosa'; break
    case 3: url = 'https://en.wikipedia.org/wiki/Cactus'; break
    default: return '#'
  }
  window.open(url, '_blank')
}
</script>

  
  <style scoped>
  .plant-app {
    max-width: 1100px;
    margin: auto;
    position: relative;
    min-height: 100vh;
    padding-top: 20px;
  }
  header {
    text-align: center;
    margin-bottom: 20px;
  }
  h1 { color: #2c7f4b; }
  
  .condition-form {
    background: #e4fde2;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 18px 16px 12px 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
    align-items: flex-end;
    justify-content: space-between;
  }
  .dropdown-group {
    flex: 1 1 120px;
    display: flex;
    flex-direction: column;
    min-width: 100px;
  }
  .dropdown-group label {
    font-size: 15px;
    margin-bottom: 6px;
    color: #2c7f4b;
  }
  select {
    padding: 7px 9px;
    border: 1px solid #b2dfdb;
    border-radius: 4px;
    outline: none;
    font-size: 15px;
    background: #fff;
  }
  .condition-form button {
    padding: 9px 18px;
    background: #2c7f4b;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    margin-left: 6px;
    cursor: pointer;
    min-width: 100px;
  }
  .condition-form button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .advice-card-area {
    margin: 25px auto;
    display: grid;
    gap: 18px;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    max-width: 1000px;
  }
  @media (min-width: 1100px) {
    .advice-card-area { grid-template-columns: repeat(4, 1fr); }
  }
  @media (max-width: 900px) {
    .advice-card-area { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .advice-card-area { grid-template-columns: 1fr; }
  }
  .plant-advice-card {
    background: #fffde7;
    border: 1px solid #ffe082;
    border-radius: 10px;
    padding: 20px;
    min-width: 0;
    box-shadow: 0 2px 4px #0001;
    word-break: break-word;
  }
  .markdown-box {
    font-size: 15px;
    line-height: 1.7;
    color: #333;
    overflow-x: auto;
    word-break: break-word;
  }

  .markdown-box li { margin-left: 22px; list-style: disc; }
  
  .plant-cards {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px,1fr));
    gap: 18px;
  }
  .plant-card {
    padding: 14px;
    text-align: center;
    background: #c8e6c9;
    border-radius: 8px;
    box-shadow: 0 2px 4px #0001;
  }
  .plant-card img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .plant-card a {
    color: #2c7f4b;
    font-weight: 500;
  }
  
  .fade-in {
    animation: fade-in 1s cubic-bezier(0.390,0.575,0.565,1.000) both;
  }
  .slide-in-bottom {
    animation: slide-in-bottom 1s cubic-bezier(0.250,0.460,0.450,0.940) both;
  }
  .slide-in-left {
    animation: slide-in-left 1s cubic-bezier(0.250,0.460,0.450,0.940) both;
  }
  @keyframes fade-in {
    0% { opacity: 0;}
    100% { opacity: 1;}
  }
  @keyframes slide-in-bottom {
    0% { transform: translateY(1000px); opacity: 0;}
    100% { transform: translateY(0); opacity: 1;}
  }
  @keyframes slide-in-left {
    0% { transform: translateX(-1000px); opacity: 0;}
    100% { transform: translateX(0); opacity: 1;}
  }

  .loading-overlay {
  position: fixed;
  z-index: 9999;
  left: 0; top: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.65);
}

.spinner {
  border: 6px solid #e0e0e0;
  border-top: 6px solid #4caf50;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 18px;
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
.loading-text {
  font-size: 20px;
  color: #2c7f4b;
  font-weight: 500;
  letter-spacing: 1.5px;
}
.plant-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #194d32;
  display: inline-block;
  margin-bottom: 0.2em;
}
.section-title {
  font-size: 1.13rem;
  font-weight: 600;
  color: #347d3d;
  display: inline-block;
  margin: 0.8em 0 0.3em 0;
  letter-spacing: 0.3px;
}
.not-bold {
  font-weight: normal !important;
  color: #2c5040;
}
.carbon-footprint-nav-area {
  margin: 35px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fun-tips {
  background: #fffde7;
  border: 1.5px dashed #7abd4c;
  border-radius: 10px;
  color: #347d3d;
  font-size: 1.07rem;
  padding: 18px 22px 12px 22px;
  margin-bottom: 19px;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 2px 8px #e4fde2a0;
  animation: fun-tips-pop 1s ease;
}

@keyframes fun-tips-pop {
  0% { transform: scale(0.7); opacity: 0; }
  80% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
}

.fun-highlight {
  color: #f58d39;
  font-weight: 600;
  font-size: 1.12em;
  margin-left: 2px;
}

.carbon-nav-btn {
  display: inline-block;
  background: linear-gradient(90deg, #90cf8e 0%, #7abd4c 100%);
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 30px;
  padding: 14px 38px;
  box-shadow: 0 2px 14px #a5d6a740;
  text-decoration: none;
  transition: background 0.2s, transform 0.18s;
  margin-top: 6px;
  letter-spacing: 1px;
}
.carbon-nav-btn:hover {
  background: linear-gradient(90deg, #7abd4c 0%, #90cf8e 100%);
  transform: scale(1.05) rotate(-2deg);
  color: #fff;
  text-decoration: none;
}

body, .plant-app {
  font-family: 'DM Sans', Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6,
header h1,
.big-title,
.section-title {
  font-family: 'DM Serif Display', serif;
  font-weight: 600;
  letter-spacing: 0.2px;
}
  </style>