
import { Chat } from "eterna-chat";

new Chat({
    container: document.getElementById('chat-container'),
    username: 'aminere-dev1',
    uid: '260587',
    onHidden: () => {
        console.log('Chat.onHidden()')
    }
});
