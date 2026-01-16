const quotes = [
    { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
    { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
    { text: "You are the sky. Everything else is just the weather.", author: "Pema Chödrön" },
    { text: "Mindfulness isn't difficult, we just need to remember to do it.", author: "Sharon Salzberg" },
    { text: "In today's rush, we all think too much, seek too much, want too much and forget about the joy of just being.", author: "Eckhart Tolle" },
    { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
    { text: "The little things? The little moments? They aren't little.", author: "Jon Kabat-Zinn" },
    { text: "Meditation is not evasion; it is a serene encounter with reality.", author: "Thich Nhat Hanh" },
    { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
    { text: "Be where you are, otherwise you will miss your life.", author: "Buddha" }
];

function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('motivational-quote').textContent = `"${randomQuote.text}"`;
    document.getElementById('quote-author').textContent = `— ${randomQuote.author}`;
}

displayRandomQuote();

const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

function addMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user' : 'bot'}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';

        setTimeout(() => {
            const responses = [
                "Thank you for reaching out. How can I support your wellness journey today?",
                "I'm here to help. Would you like to know more about our exercises or sessions?",
                "That's a great question. Let me help you find the right resources.",
                "Your wellbeing matters to us. How may I assist you?",
                "I'm listening. Please share what's on your mind."
            ];
            addMessage(responses[Math.floor(Math.random() * responses.length)]);
        }, 1000);
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});


const images = [
    "https://thumbs.dreamstime.com/b/group-multi-ethnic-people-activewear-seated-mats-cross-legged-raising-hands-up-perform-namaste-symbol-do-meditation-174218457.jpg",
    "https://onlinemeditation.yogananda.org/wp-content/uploads/2021/10/SRF-Online-Meditation-resize.jpg",
    "https://mindoasis.org/wp-content/uploads/2023/06/Medi-Immersion-2023-for-homepage-1200x600.png",
    "https://www.ed2go.com/common/images/2/24144.jpg",
    "https://harmonicsounds.com/wp-content/uploads/2023/05/diploma-online-eng.jpeg"

];

const slides = document.querySelectorAll('#changingImage');
let currentIndex = 0;
let nextIndex = 1;

setInterval(() => {
    // Set next image source before animation
    slides[nextIndex].src = images[nextIndex % images.length];

    // Slide out the current image
    slides[currentIndex].classList.remove('current');
    slides[currentIndex].style.transform = 'translateX(-100%)';
    slides[currentIndex].style.opacity = '0';

    // Slide in the next image
    slides[nextIndex].classList.add('current');
    slides[nextIndex].style.transform = 'translateX(0)';
    slides[nextIndex].style.opacity = '1';

    // Update indexes
    currentIndex = nextIndex;
    nextIndex = (nextIndex + 1) % images.length;
}, 3000);





