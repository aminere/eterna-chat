
import "./chat.css";

export function createChat(container: HTMLElement, username: string, uid: string) {

    // TODO define channels
    const channels = [
        'basics',
        'ribosome',
        'lab'
    ];

    const selectors = document.createElement('div');
    const contents = document.createElement('div');
    contents.className = "chat-tabs-container";

    const createFrame = (channel: string) => {
        const frame = document.createElement('iframe');
        frame.className = "chat-frame";        
        frame.src = `https://irc.eternagame.org/chat.html?name=${encodeURIComponent(username)}&uid=${uid}&channel=${channel}`;
        return frame;
    };

    const createTab = (channel: string, index: number) => {
        const tab = document.createElement('div');
        tab.classList.add('chat-tab-content');
        if (index === 0) {
            tab.classList.add('chat-hidden');
        }
        tab.appendChild(createFrame(channel));
        return tab;
    };

    const createSelector = (channel: string, index: number) => {
        const button = document.createElement('button');
        button.classList.add('chat-tab-selector');
        if (index === 0) {
            button.classList.add('chat-tab-active');
        }
        button.onclick = () => {
            for (let i = 0; i < contents.children.length; ++i) {
                if (i === index) {
                    contents.children[i].classList.remove('chat-hidden');
                    selectors.children[i].classList.add('chat-tab-active');
                } else {
                    contents.children[i].classList.add('chat-hidden');
                    selectors.children[i].classList.remove('chat-tab-active');
                }
            }
        };
        button.innerText = channel;
        return button
    };

    channels.forEach((channel, index) => {
        selectors.appendChild(createSelector(channel, index));
        contents.appendChild(createTab(channel, index));
    });
    container.appendChild(selectors);
    container.appendChild(contents);
}
