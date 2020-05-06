
import { Chat } from "eterna-chat";

new Chat({
    container: document.getElementById('chat-container'),
    username: 'Anonymous',
    uid: '000000',
    onHidden: () => {
        console.log('Chat.onHidden()')
    }
});
