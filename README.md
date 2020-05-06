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

![image](https://user-images.githubusercontent.com/11358110/81236451-4101ee00-8fcb-11ea-873d-7369932a9d4a.png)
