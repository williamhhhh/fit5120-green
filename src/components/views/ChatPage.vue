<template>
    <div class="chat-page">
        <div class="chat-header">
            <h1>Grow Your Own Green Space at Home</h1>
        </div>
        <div class="main-content">
            <div class="sidebar">
                <h2>Chat history</h2>
                <ul>
                    <li
                        v-for="(conversation, index) in conversations"
                        :key="index"
                        @click="selectConversation(index)"
                        :class="{ active: selectedConversation === index }"
                        class="conversation-item"
                    >
                        <span>Conversation {{ index + 1 }}</span>
                        <button
                            @click.stop="deleteConversation(index)"
                            class="delete-btn"
                        >
                            X
                        </button>
                    </li>
                </ul>
                <button @click="startNewConversation">+ New Chat</button>
            </div>
            <div class="chat-container">
                <div class="messages">
                    <div
                        v-for="(message, index) in messages"
                        :key="index"
                        :class="['message', message.role === 'assistant' ? 'ai-message' : 'user-message']">

                        <div v-if="message.role === 'assistant'" v-html="parseMarkdown(message.content)"></div>
                        <p v-else>{{ message.content }}</p>
                    </div>
                </div>
                <div class="input-container">
                    <input
                        v-model="newMessage"
                        @keyup.enter="sendMessage"
                        type="text"
                        placeholder="Send a message..."
                    />
                    <button @click="sendMessage" :disabled="loading">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ChatPage",
    data() {
        return {
            conversations: [], // Stores all chat histories
            selectedConversation: null, // The currently selected conversation
            messages: [], // Messages in the current conversation
            newMessage: "", // User input
            loading: false, // Loading state for API requests
        };
    },
    methods: {
        async sendMessage() {
            if (this.newMessage.trim() === "") {
                alert("Please enter a message!");
                return;
            }

            if (this.selectedConversation === null) {
                this.startNewConversation();
            }

            // Add user message to the current conversation
            this.messages.push({ role: "user", content: this.newMessage });

            // Save the input and clear the text field
            const userMessage = this.newMessage;
            this.newMessage = "";

            // Set loading state
            this.loading = true;

            try {
                const response = await axios.post("https://54.252.189.158/chat", {
                    prompt: userMessage,
                });

                // Add assistant response to messages
                const aiResponse = response.data.message;
                this.messages.push({ role: "assistant", content: aiResponse });
            } catch (error) {
                console.error("Error:", error);
                this.messages.push({
                    role: "assistant",
                    content: "Error: Unable to fetch response from the server.",
                });
            } finally {
                this.loading = false;
            }

            this.saveConversations();
        },
        startNewConversation() {
            this.conversations.push([]);
            this.selectedConversation = this.conversations.length - 1;
            this.messages = this.conversations[this.selectedConversation];

            // Save the updated conversations to localStorage
            this.saveConversations();
        },
        selectConversation(index) {
            // Switch to the selected conversation
            this.selectedConversation = index;
            this.messages = this.conversations[index];
        },
        deleteConversation(index) {
            // Remove the selected conversation
            this.conversations.splice(index, 1);

            // Update selected conversation
            if (this.selectedConversation === index) {
                this.selectedConversation = this.conversations.length > 0 ? 0 : null;
                this.messages =
                    this.selectedConversation !== null
                        ? this.conversations[this.selectedConversation]
                        : [];
            } else if (this.selectedConversation > index) {
                this.selectedConversation -= 1;
            }

            // Save the updated conversations to localStorage
            this.saveConversations();
        },
        saveConversations() {
            // Save conversations to localStorage
            localStorage.setItem("chatConversations", JSON.stringify(this.conversations));
        },
        loadConversations() {
            // Load conversations from localStorage
            const storedConversations = localStorage.getItem("chatConversations");
            if (storedConversations) {
                this.conversations = JSON.parse(storedConversations);
                this.selectedConversation = this.conversations.length > 0 ? 0 : null;
                this.messages =
                    this.selectedConversation !== null
                        ? this.conversations[this.selectedConversation]
                        : [];
            } else {
                // Initialize with the first conversation if no data in localStorage
                this.startNewConversation();
            }
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
    mounted() {
        this.loadConversations();
    },
};
</script>

<style scoped>
.chat-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: Arial, sans-serif;
    margin-top: 110px;
}

.chat-header {
    color: green;
    padding: 10px 20px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-top: 1px solid #d3d3d3;
    flex-shrink: 0;
}

.main-content {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
}

.sidebar {
    width: 350px;
    background-color: #f0f0f0;
    padding: 20px;
    overflow-y: auto;
    flex-shrink: 0;
}

.conversation-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #fff;
    transition: transform 0.2s, background-color 0.2s;
    cursor: pointer;
}

.conversation-item:hover {
    transform: scale(1.05);
    background-color: #e6f7ff;
}

.conversation-item.active {
    background-color: #d6eaff;
    font-weight: bold;
}

.delete-btn {
    background-color: transparent;
    color: #ff4d4f;
    border: 1px solid #ff4d4f;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.delete-btn:hover {
    background-color: #ff4d4f;
    color: white;
}

.chat-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border-left: 1px solid #ddd;
    background-color: white;
    overflow: hidden; 
}

.message {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 8px;
    max-width: 75%;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

.ai-message {
background-color: #e1e1e1;
align-self: flex-start;
}

.user-message {
background-color: rgb(26, 205, 26);
color: white;
align-self: flex-end;
font-weight: bold;
}

.messages {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 150px);
    background-color: #f7f7f8;
}

.message h1,
.message h2,
.message h3 {
    margin: 10px 0;
    font-weight: bold;
    color: #333;
}

.message p {
    margin: 10px 0;
    line-height: 1.6;
    font-size: 22px;
    color: #555;
}

.message li {
    margin-left: 20px;
    list-style-type: disc;
    color: #555;
}

.message strong {
    font-weight: bold;
    color: #000;
}

.message em {
    font-style: italic;
    color: #666;
}

.input-container {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #fff;
    flex-shrink: 0;
}

input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>