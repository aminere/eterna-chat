
interface IChatProps {
    container: HTMLElement;
    username: string;
    uid: string;
    backgroundColor?: string;
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
            'general',
            'help',
            'labs'
        ];

        const selectors = document.createElement('div');
        selectors.className = "chat-selectors";
        const contents = document.createElement('div');
        contents.className = "chat-contents";

        const createFrame = (channel: string) => {
            const url = 'https://irc.eternagame.org/multi-chat/chat.html';
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
                    this._iframes[this._currentTab].contentWindow.postMessage({type: 'chat-scroll'}, '*');
                };
                button.innerText = channel;
                return button;
            })());
            selector.appendChild((() => {
                const arrow = document.createElement('img');
                arrow.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11.621' height='6.222' viewBox='0 0 11.621 6.222'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%23404040;%7D%3C/style%3E%3C/defs%3E%3Cg transform='translate(11.621 6.222) rotate(180)'%3E%3Cpath class='a' d='M11.6.154A.252.252,0,0,0,11.368,0H.253A.253.253,0,0,0,.072.429L5.629,6.145a.253.253,0,0,0,.362,0L11.549.429A.253.253,0,0,0,11.6.154Z'/%3E%3C/g%3E%3C/svg%3E";
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
        props.container.classList.add('chat-container');
        if (props.backgroundColor) {
            props.container.style.backgroundColor = props.backgroundColor;
        }
        props.container.classList.remove('hidden');
        props.container.appendChild(selectors);
        props.container.appendChild(contents);

        // close button
        selectors.appendChild((() => {
            const close = document.createElement('img');
            close.className = "chat-close";
            close.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13.121' height='13.121' viewBox='0 0 13.121 13.121'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%234a90e2;stroke:%234a90e2;stroke-width:1.5px;%7D%3C/style%3E%3C/defs%3E%3Cpath class='a' d='M0,10.045.955,11,5.5,6.455,10.045,11,11,10.045,6.455,5.5,11,.955,10.045,0,5.5,4.545.955,0,0,.955,4.545,5.5Z' transform='translate(1.061 1.061)'/%3E%3C/svg%3E";
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
