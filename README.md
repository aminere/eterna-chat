*Install the chat library*

`npm install --save aminere/eterna-chat`

*Example usage*

```
import { Chat } from "eterna-chat";

const chat = new Chat({
    container: document.getElementById('chat-container'),
    username: 'Anonymous',
    uid: '000000',
    onHidden: () => {
        console.log('Chat.onHidden()')
    }
});
```

See the `example` folder.
