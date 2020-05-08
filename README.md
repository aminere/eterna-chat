Temporary wrapper for Eterna's legacy IRC chat client to support easy installation and multiple channels

## Install the chat library

`npm install --save eternagame/eterna-chat-wrapper`

## Example usage

```
import { Chat } from "eterna-chat-wrapper";

const chat = new Chat({
    container: document.getElementById('chat-container'),
    username: 'Anonymous',
    uid: '000000',
    onHidden: () => {
        console.log('Chat.onHidden()')
    }
});

// Hide the chat without destroying it
chat.hide();

// Show an existing chat again
chat.show();
```

See the `example` folder.

![image](https://user-images.githubusercontent.com/11358110/81236451-4101ee00-8fcb-11ea-873d-7369932a9d4a.png)
