/**
 * Sky Explorer - Simulated Travel Planner Chat Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatContainer = document.querySelector('.chat-widget-container');
    
    if (!chatContainer) return; // Exit if chat container doesn't exist on page
    
    // Inject chat HTML structure dynamically if it doesn't exist in markup
    chatContainer.innerHTML = `
        <button class="chat-toggle-btn" aria-label="Toggle live chat">
            <i class="fas fa-compass"></i>
            <span class="chat-notification"></span>
        </button>
        
        <div class="chat-window">
            <div class="chat-header">
                <div class="chat-clinic-info">
                    <div class="chat-avatar">
                        <i class="fas fa-map-marked-alt"></i>
                    </div>
                    <div class="chat-header-text">
                        <h4>Odyssey Planner</h4>
                        <p><i class="fas fa-circle" style="color: #10B981; font-size: 0.6rem; margin-right: 0.25rem;"></i> Online | Travel Planner</p>
                    </div>
                </div>
                <button class="chat-close-btn" aria-label="Close chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="chat-messages" id="chatMessages">
                <!-- Messages will be injected here -->
            </div>
            
            <div class="chat-quick-replies" id="chatQuickReplies">
                <button class="quick-reply-btn" data-reply="packages">Best Packages?</button>
                <button class="quick-reply-btn" data-reply="booking">How to Book?</button>
                <button class="quick-reply-btn" data-reply="cancellation">Cancellation Policy?</button>
                <button class="quick-reply-btn" data-reply="custom">Custom Trips?</button>
            </div>
            
            <div class="chat-input-area">
                <input type="text" class="chat-input" id="chatInput" placeholder="Ask about destinations..." autocomplete="off">
                <button class="chat-send-btn" id="chatSendBtn" aria-label="Send message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    const toggleBtn = chatContainer.querySelector('.chat-toggle-btn');
    const chatWindow = chatContainer.querySelector('.chat-window');
    const closeBtn = chatContainer.querySelector('.chat-close-btn');
    const messagesContainer = chatContainer.querySelector('#chatMessages');
    const inputField = chatContainer.querySelector('#chatInput');
    const sendBtn = chatContainer.querySelector('#chatSendBtn');
    const notificationBadge = chatContainer.querySelector('.chat-notification');
    const quickRepliesContainer = chatContainer.querySelector('#chatQuickReplies');

    let welcomeSent = false;

    // Open/Close toggle
    toggleBtn.addEventListener('click', () => {
        const isActive = chatWindow.classList.toggle('active');
        toggleBtn.classList.toggle('active', isActive);
        
        // Hide notification badge once opened
        if (isActive) {
            notificationBadge.style.display = 'none';
            inputField.focus();
            
            // Trigger welcome message
            if (!welcomeSent) {
                sendWelcomeMessage();
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        toggleBtn.classList.remove('active');
    });

    // Send on click
    sendBtn.addEventListener('click', handleUserSendMessage);

    // Send on Enter
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserSendMessage();
        }
    });

    // Handle Quick Replies
    quickRepliesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply-btn')) {
            const replyType = e.target.getAttribute('data-reply');
            const replyText = e.target.textContent;
            
            // Append User message
            appendMessage('user', replyText);
            
            // Show typing indicator and reply
            showBotResponse(replyType);
        }
    });

    // Initial notification trigger after 3 seconds
    setTimeout(() => {
        if (!chatWindow.classList.contains('active')) {
            notificationBadge.style.display = 'block';
        }
    }, 3000);

    function sendWelcomeMessage() {
        welcomeSent = true;
        appendMessage('bot', "Hi explorer! 🌍 Welcome to Odyssey Travel. I am your automated travel assistant. Ask me anything about our tours, booking processes, or customized plans!");
    }

    function appendMessage(sender, text) {
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender}`;
        bubble.innerHTML = `
            ${text}
            <span class="chat-time">${timeString}</span>
        `;
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleUserSendMessage() {
        const text = inputField.value.trim();
        if (text === '') return;

        appendMessage('user', text);
        inputField.value = '';

        const responseType = analyzeUserQuery(text);
        showBotResponse(responseType);
    }

    function analyzeUserQuery(text) {
        const query = text.toLowerCase();
        
        if (query.includes('pack') || query.includes('tour') || query.includes('offer') || query.includes('dest')) {
            return 'packages';
        } else if (query.includes('book') || query.includes('reserv') || query.includes('sched') || query.includes('register')) {
            return 'booking';
        } else if (query.includes('cancel') || query.includes('refund') || query.includes('change')) {
            return 'cancellation';
        } else if (query.includes('custom') || query.includes('own') || query.includes('tailor') || query.includes('group')) {
            return 'custom';
        } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
            return 'greet';
        } else {
            return 'default';
        }
    }

    function showBotResponse(type) {
        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-bubble bot typing-indicator';
        typingBubble.innerHTML = '<i class="fas fa-ellipsis-h fa-lg" style="animation: pulse 1s infinite"></i> Typing...';
        messagesContainer.appendChild(typingBubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const botAnswers = {
            greet: "Hello! Where are you planning to travel next? You can ask me about our packages, custom trip design, booking policies, or pricing details.",
            packages: "Our top trending packages for 2026 are: 1. Swiss Alps Alpine Hike, 2. Tropical Bali Getaway, and 3. Historic Kyoto Explorer. Details and prices are listed on our 'Packages' page!",
            booking: "To book a tour, visit our 'Book Tour' page, select your desired package, travel dates, group size, and fill in your details. We will email your confirmation and details instantly.",
            cancellation: "We offer full refunds for cancellations made up to 14 days before your departure. Cancellations made between 7-13 days are eligible for a 50% refund, while cancellations within 7 days are non-refundable.",
            custom: "Yes! We specialize in custom travel arrangements for individuals and corporate groups. Simply send us an inquiry through the 'Book Tour' page with your preferred locations, budget, and durations.",
            default: "That sounds like a wonderful adventure! I've logged your interest. You can check out our detailed packages on the 'Packages' page, or fill out the booking form to consult with a live agent."
        };

        setTimeout(() => {
            typingBubble.remove();
            appendMessage('bot', botAnswers[type] || botAnswers['default']);
        }, 1000 + Math.random() * 500);
    }
});
