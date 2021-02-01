# [hackettyu'snippets] Javascirpt 语音合成

```javascript
const speechSynthesis = message => {
const msg = new SpeechSynthesisUtterance(message);
msg.voice = window.speechSynthesis.getVoices()[0];
window.speechSynthesis.speak(msg);
};
// speechSynthesis('Hello, World') -> plays the message
```