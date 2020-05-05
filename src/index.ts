
import "./chat.css";

export function createChat(container: HTMLElement, username: string, uid: string) {

    // TODO define channels
    const channels = [
        'basics',
        'ribosome'
    ];   

    const tabSelectors = document.createElement('div');
    const tabContents = document.createElement('div');

    const createFrame = (channel: string) => {
        const frame = document.createElement('iframe');
        frame.className = "chat-frame";
        frame.src = `https://irc.eternagame.org/chat.html?name=${encodeURIComponent(username)}&uid=${uid}&channel=${channel}`;
        return frame;
    };

    const createTabSelector = (name, index) => {
        const button = document.createElement('button');
        button.classList.add('chat-tab-selector');
        if (index === 0) {
            button.classList.add('chat-tab-active');
        }
        button.onclick = () => {
            for (let i = 0; i < tabContents.children.length; ++i) {
                if (i === index) {
                    tabContents.children[i].classList.remove('chat-hidden');
                    tabSelectors.children[i].classList.add('chat-tab-active');
                } else {
                    tabContents.children[i].classList.add('chat-hidden');
                    tabSelectors.children[index].classList.remove('chat-tab-active');
                }
            }
        };
        button.innerText = name;
        return button;
    };

    const createTab = index => {
        const tab = document.createElement('div');                            
        tab.classList.add('chat-tab-content');
        if (index === 0) {
            tab.classList.add('chat-hidden');
        }
        tab.appendChild(createFrame(channels[index]));
        return tab;
    };

    channels.forEach((channel, index) => {
        tabSelectors.appendChild(createTabSelector(channel, index));
        tabContents.appendChild(createTab(index));
    });
    container.appendChild(tabSelectors);
    container.appendChild(tabContents);
}

