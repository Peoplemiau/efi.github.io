const loginArea = document.getElementById('login-area');
const chatArea = document.getElementById('chat-area');
const messagesContainer = document.getElementById('messages');
const usernameInput = document.getElementById('username-input');
const registerUsernameInput = document.getElementById('register-username');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const userList = document.getElementById('user-list');
const logoutButton = document.getElementById('logout-button');

let currentUser = null;
let users = [];

loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username && !users.includes(username)) {
        currentUser = username;
        users.push(currentUser);
        updateUserList();
        switchToChat();
    }
});

registerButton.addEventListener('click', () => {
    const username = registerUsernameInput.value.trim();
    if (username && !users.includes(username)) {
        currentUser = username;
        users.push(currentUser);
        updateUserList();
        switchToChat();
    }
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(currentUser, message);
        messageInput.value = '';
    }
});

function updateUserList() {
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.textContent = user;
        userItem.className = 'user-item';
        userList.appendChild(userItem);
    });
}

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender === currentUser ? 'self' : 'other'}`;
    messageElement.textContent = `${sender}: ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка вниз
}

function switchToChat() {
    loginArea.style.display = 'none';
    chatArea.style.display = 'block';
    logoutButton.style.display = 'inline-block';
}

logoutButton.addEventListener('click', () => {
    currentUser = null;
    users = [];
    messagesContainer.innerHTML = '';
    userList.innerHTML = '';
    loginArea.style.display = 'block';
    chatArea.style.display = 'none';
    logoutButton.style.display = 'none';
});
