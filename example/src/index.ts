
import { Chat } from "eterna-chat-wrapper";

new Chat({
    container: document.getElementById('chat-container'),
    username: 'aminere-dev1',
    uid: '260587',   
    collapsible: true, 
    onHidden: () => {
        console.log('Chat.onHidden()')
    },
    onCollapsed: () => {
        console.log('Chat.onCollapsed()');
    },
    onExpanded: () => {
        console.log('Chat.onExpanded()');
    }
});
