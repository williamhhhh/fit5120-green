<template>
    <div class="plant-app" style="padding-top: 100px;">
        <header>
            <h1>Plant Assistant</h1>
            <p>Chat with me,Learn about how to plant together!</p>
        </header>

        <!-- Chatbot Window -->
        <section class="chat-area">
            <div class="chat-box" ref="chatBox">
                <div v-for="(message, index) in messages" :key="index" :class="['chat-bubble', message.role]">
                    <div v-if="message.role === 'assistant'" v-html="message.content"></div>
                    <p v-else>{{ message.content }}</p>
                </div>
            </div>
            <div class="input-area">
                <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Please type your plant..." />
                <button @click="sendMessage" :disabled="loading">Send</button>
            </div>
        </section>

        <!-- Plant infomation card -->
        <section class="plant-cards">
            <div v-for="plant in plants" :key="plant.id" class="plant-card">
                <img :src="plant.image" :alt="plant.name" />
                <h3>{{ plant.name }}</h3>
                <p>{{ plant.brief }}</p>
                <a href="#" @click="GetPlantDetail(plant)">Learn More</a>
            </div>
        </section>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userInput: '',
            messages: [
                { role: 'assistant', content: 'Hello! I &#39m your plant assistant. welcome to my world. Let &#39s talk about plant care!  What do you want to know?' },
            ],
            plants: [
                { id: 1, name: 'Dracaena trifasciata', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSFVeGcFNwNPOV9HvhJDGWbDFbD5uFzy7TcwZZKkdOfVegXcz1KFcRLgkMh6yz9P9S5IUvH7FTFpD_gy1HF_-FSyw', brief: 'Dracaena trifasciata like bright and ventilated environment, not hardy, pay attention to shade in summer.' },
                { id: 2, name: 'Monstera deliciosa', image: 'https://p2.itc.cn/images01/20220716/656eb023b18044e9972384b3fe839fed.png', brief: 'Monstera deliciosa are more shade-tolerant, the ornaments should be loose and airy, and watering should be moderate.' },
                { id: 3, name: 'Cactus', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SYOl3WIUcbEBXMwi8mNYmXBtoGh19qwWMQ&s', brief: 'Cactus are extremely drought tolerant and can survive without water for months.' },
            ],
            loading: false,
        }
    },
    methods: {
        async sendMessage() {
            if (this.userInput.trim()) {
                const newMessage = { role: 'user', content: this.userInput };
                this.messages.push(newMessage);
                this.userInput = '';

                this.loading = true;

                try {
                    const response = await axios.post('https://api.coolthecities.com/chat', {
                        prompt: newMessage.content,
                    });

                    const aiResponse = response.data.message;
                    const formattedResponse = this.parseMarkdown(aiResponse);
                    this.messages.push({ role: 'assistant', content: formattedResponse });
                } catch (error) {
                    console.error('Error requesting ChatGPT API:', error);
                    this.messages.push({
                        role: 'assistant',
                        content: 'Sorry, I can&#39t answer your question right now. Please try again later.',
                    });
                } finally {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
                    });
                }
            }
        },
        GetPlantDetail(plant) {
            let url = ''
            switch(plant.id) {
                case 1:
                    url = 'https://en.wikipedia.org/wiki/Dracaena_trifasciata';
                    break;
                case 2:
                    url = 'https://en.wikipedia.org/wiki/Monstera_deliciosa';
                    break;
                case 3:
                    url = 'https://en.wikipedia.org/wiki/Cactus';
                    break;
                default:
                    return '#';
            }
            window.open(url, '_blank');
        },
        parseMarkdown(markdownText) {
            return markdownText
                .replace(/### (.*?)\n/g, '<h3>$1</h3>')
                .replace(/## (.*?)\n/g, '<h2>$1</h2>')
                .replace(/# (.*?)\n/g, '<h1>$1</h1>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/- (.*?)\n/g, '<li>$1</li>')
                .replace(/\n/g, '<br>');
        },
    },
}
</script>

<style scoped>
.plant-app {
    max-width: 600px;
    margin: auto;
    position: relative;
}
header {
    text-align: center;
    margin-bottom: 20px;
}
h1 {
    color: #2c7f4b;
}
.chat-area {
    border: 1px solid #ddd;
    padding: 20px;
    height: 400px;
    display: flex;
    flex-direction: column;
}
.chat-box {
    flex: 1;
    overflow-y: auto;
}
.chat-bubble {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
}
.user {
    background: #e8f5e9;
    align-self: flex-end;
}
.assistant {
    background: #e3f2fd;
}
.input-area {
    display: flex;
    margin-top: 20px;
}
input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
}
button {
    background: #2c7f4b;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 15px;
    margin-left: 10px;
    cursor: pointer;
}
button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
.plant-cards {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
.plant-card {
    padding: 15px;
    text-align: center; 
    background: #c8e6c9;
    border-radius: 8px;
}
.plant-card img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
}
.plant-card a {
    color: #2c7f4b;
}

</style>