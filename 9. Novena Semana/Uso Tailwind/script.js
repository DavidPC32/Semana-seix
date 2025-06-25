document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Respuestas del bot
    const botResponses = {
        "hola": "¡Hola! ¿En qué puedo ayudarte hoy? 😊",
        "productos": "Tenemos laptops, smartphones y auriculares. ¿Te interesa alguno en particular?",
        "precio": "Los precios varían desde $199 hasta $899. ¿Qué producto te interesa?",
        "envío": "📦 Ofrecemos envío gratis para compras mayores a $50",
        "pago": "💳 Aceptamos tarjetas y PayPal",
        "default": "¿Puedes ser más específico? Puedo ayudarte con: productos, precios o envíos"
    };
    
    // Cargar mensajes guardados
    function loadMessages() {
        chatMessages.innerHTML = ''; // Limpiar mensajes al cargar
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            chatMessages.innerHTML = savedMessages;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            addMessage("¡Hola! Soy el asistente de MiTienda. ¿En qué puedo ayudarte?", 'bot');
        }
    }
    
    // Guardar mensajes
    function saveMessages() {
        localStorage.setItem('chatMessages', chatMessages.innerHTML);
    }
    
    // Añadir mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        saveMessages();
    }
    
    // Obtener respuesta del bot
    function getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        for (const [keyword, response] of Object.entries(botResponses)) {
            if (lowerMsg.includes(keyword)) {
                return response;
            }
        }
        return botResponses.default;
    }
    
    // Enviar mensaje
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 800);
    }
    
    // Alternar visibilidad del chat
    function toggleChat() {
        console.log("Toggle chat called"); // Agregada para depuración
        chatContainer.classList.toggle('active');
        chatToggle.classList.toggle('active');
        
        if (chatContainer.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 100);
        }
    }
    
    // Cerrar chat
    function closeChat() {
        chatContainer.classList.remove('active');
        chatToggle.classList.remove('active');
        localStorage.removeItem('chatMessages'); //Elimina los datos guardados
        chatMessages.innerHTML = ''; //Limpiar el contenedor de mensajes

    }
    
    // Event Listeners
    chatToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat();
    });
    
    chatClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeChat();
    });
    
    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#chat-container') && 
            e.target !== chatToggle && 
            chatContainer.classList.contains('active')) {
            closeChat();
        }
    });
    
    // Inicialización
    loadMessages();
});