
interface IChatProps {
    container: HTMLElement;
    username: string;
    uid: string;
    onHidden?: () => void;
}

export class Chat {

    private _props: IChatProps;
    private _currentTab: number;
    private _iframes: HTMLIFrameElement[];

    constructor(props: IChatProps) {
        this._props = props;

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
            const url = 'https://irc.eternagame.org/chat.html';
            // const url = 'chat.html';
            const params = `?name=${encodeURIComponent(props.username)}&uid=${props.uid}&channel=${channel}`;
            const frame = document.createElement('iframe');
            frame.className = "chat-frame";
            frame.src = `${url}${params}`;
            return frame;
        };

        this._currentTab = 0;
        this._iframes = channels.map(createFrame);

        const createTab = (channel: string, index: number) => {
            const tab = document.createElement('div');
            tab.classList.add('chat-content');
            if (index > 0) {
                tab.classList.add('hidden');
            }
            tab.appendChild(this._iframes[index]);
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
                    this._currentTab = index;
                    for (let i = 0; i < contents.children.length; ++i) {
                        const [button, arrow] = selectors.children[i].children;
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
        props.container.innerHTML = "";
        props.container.appendChild(selectors);
        props.container.appendChild(contents);

        // close button
        selectors.appendChild((() => {
            const close = document.createElement('img');
            close.className = "chat-close";
            close.src = "assets/close-button.svg";
            close.onclick = () => {
                props.container.classList.add('hidden');
                if (props.onHidden) {
                    props.onHidden();
                }
            };
            return close;
        })());
    }

    public show() {
        this._props.container.classList.remove('hidden');
    }

    public hide() {
        this._props.container.classList.add('hidden');
    }

    public postMessage(message: any, targetOrigin: string) {
        this._iframes[this._currentTab].contentWindow.postMessage(message, targetOrigin);
    }
}
