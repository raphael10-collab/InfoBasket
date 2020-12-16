import './app';

console.log('renderer.js is so happy to say you 👋 hello....');

//window.electron.doThing();


// https://github.com/electron/electron/issues/21437#issuecomment-573522360

class LibraryClass {
  classValue: number;
  constructor(myValue = 1) {
    this.classValue = myValue;
    window.myapi.onResponse((args) => {
      if (args.success) {
        this.classValue++;
        // https://github.com/kahlil/electron-communication-example/blob/master/renderer.js
        console.log(`This is the message from the second window sent via main: ${args}`);
      }
    });
  }
  send() {
    window.myapi.request(this.classValue);
  }
}

//const openSecondWindowButton = document.getElementById('open-second-window');

declare global{
  interface Window {
    electron: {
      openNewWindow(): void;
    }
  }
}

//openSecondWindowButton.addEventListener('click', (event) => {
//});
