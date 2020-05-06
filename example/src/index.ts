
import { createChat } from "eterna-chat";

createChat(document.getElementById('chat-container'), "Anonymous", "000", () => {
    console.log("close clicked");
});
