
import "./chat.css";

export function createChat(container: HTMLElement, username: string, uid: string) {

    // TODO define channels
    const channels = [
        'basics',
        'ribosome',
        'lab'
    ];

    const selectors = document.createElement('div');
    selectors.className = "chat-selectors";
    const contents = document.createElement('div');
    contents.className = "chat-contents";

    const createFrame = (channel: string) => {
        const frame = document.createElement('iframe');
        frame.className = "chat-frame";        
        frame.src = `https://irc.eternagame.org/chat.html?name=${encodeURIComponent(username)}&uid=${uid}&channel=${channel}`;
        // frame.src = `chat.html?name=${encodeURIComponent(username)}&uid=${uid}&channel=${channel}`;
        return frame;
    };

    const createTab = (channel: string, index: number) => {
        const tab = document.createElement('div');
        tab.classList.add('chat-content');
        if (index > 0) {
            tab.classList.add('hidden');
        }
        tab.appendChild(createFrame(channel));
        return tab;
    };

    const createSelector = (channel: string, index: number) => {
        const selector = document.createElement('div');
        selector.className = 'chat-selector';
        if (index === 0) {
            selector.style.marginLeft = "0px";
        }
        selector.appendChild((() => {
            const button = document.createElement('button');
            button.classList.add('chat-selector-button');
            if (index === 0) {
                button.classList.add('active');
            }
            button.onclick = () => {
                for (let i = 0; i < contents.children.length; ++i) {
                    const [ button, arrow ] = selectors.children[i].children;
                    if (i === index) {
                        contents.children[i].classList.remove('hidden');                        
                        button.classList.add('active');
                        arrow.classList.remove('hidden');
                    } else {
                        contents.children[i].classList.add('hidden');
                        button.classList.remove('active');
                        arrow.classList.add('hidden');
                    }
                }
            };
            button.innerText = channel;
            return button;
        })());
        selector.appendChild((() => {
            const arrow = document.createElement('img');
            arrow.src = 'assets/tab-arrow.svg';
            if (index > 0) {
                arrow.classList.add('hidden');
            }
            return arrow;
        })());
        return selector;     
    };

    channels.forEach((channel, index) => {
        selectors.appendChild(createSelector(channel, index));
        contents.appendChild(createTab(channel, index));
    });
    container.appendChild(selectors);
    container.appendChild(contents);
}
