// Custom Cursor Animation
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delay for follower cursor
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, input, .feature-card, .demo-screen');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.2)';
            cursorFollower.style.borderColor = 'rgba(0, 255, 255, 0.8)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'rgba(0, 255, 255, 0.3)';
        });
    });
});

// Auto-typing Chat Interface
class VirtoraChat {
    constructor() {
        this.messages = [
            "Hello! I'm Virtora, your AI assistant. Welcome to the future of intelligent assistance!",
            "I can help you with a wide range of tasks - from answering questions to providing creative solutions.",
            "My advanced neural networks allow me to understand context and learn from our interactions.",
            "Feel free to ask me anything! I'm here to assist you 24/7 with lightning-fast responses.",
            "Ready to experience the power of AI? Let's start our conversation!"
        ];
        this.currentMessageIndex = 0;
        this.isTyping = false;
        this.init();
    }
    
    init() {
        this.startTypingSequence();
        this.setupChatInput();
    }
    
    startTypingSequence() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingIndicator = document.getElementById('typingIndicator');
        const chatMessages = document.getElementById('chatMessages');
        
        // Clear typing indicator
        typingIndicator.style.display = 'none';
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-text"></span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        const messageText = messageDiv.querySelector('.message-text');
        const currentMessage = this.messages[this.currentMessageIndex];
        
        this.typeMessage(messageText, currentMessage, () => {
            this.isTyping = false;
            this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
            
            // Wait before next message
            setTimeout(() => {
                this.startTypingSequence();
            }, 3000);
        });
    }
    
    typeMessage(element, text, callback) {
        let index = 0;
        const typingSpeed = 50; // milliseconds per character
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                if (callback) callback();
            }
        }, typingSpeed);
    }
    
    setupChatInput() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.querySelector('.send-btn');
        
        // Send message on button click
        sendBtn.addEventListener('click', () => {
            this.sendUserMessage();
        });
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendUserMessage();
            }
        });
    }
    
    sendUserMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        const chatMessages = document.getElementById('chatMessages');
        
        // Add user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        userMessageDiv.innerHTML = `
            <div class="message-content" style="background: rgba(0, 128, 255, 0.1); border-left-color: #0080ff; margin-left: auto; max-width: 80%;">
                <span class="message-text">${message}</span>
            </div>
        `;
        
        chatMessages.appendChild(userMessageDiv);
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Generate AI response
        setTimeout(() => {
            this.generateAIResponse(message);
        }, 1000);
    }
    
    generateAIResponse(userMessage) {
        const responses = [
            "That's a great question! Let me help you with that.",
            "I understand what you're looking for. Here's what I can tell you...",
            "Interesting! Based on my analysis, I'd recommend...",
            "I'm processing your request. Here's my response...",
            "Thank you for asking! Here's what I think..."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const chatMessages = document.getElementById('chatMessages');
        
        // Add AI response
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'message ai-message';
        aiMessageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-text"></span>
            </div>
        `;
        
        chatMessages.appendChild(aiMessageDiv);
        
        const messageText = aiMessageDiv.querySelector('.message-text');
        
        this.typeMessage(messageText, randomResponse, () => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .about-text, .demo-container');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .send-btn, .demo-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .user-message {
        animation: slideInRight 0.5s ease;
    }
    
    .ai-message {
        animation: slideInLeft 0.5s ease;
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', function() {
    new VirtoraChat();
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add glow effect to interactive elements on hover
document.addEventListener('DOMContentLoaded', function() {
    const glowElements = document.querySelectorAll('.feature-card, .demo-screen, .chat-container');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});
