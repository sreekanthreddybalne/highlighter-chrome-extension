// import { ConnectListener } from './connect-listener';
import { RuntimeListener } from './runtime-listener';
console.log('content script!');
// const runtimeListener = new RuntimeListener();

console.log("sree is here")

var port = chrome.runtime.connect({name: "highlighted"});

function highlightHandler(e) {
    let text = document.getSelection().toString();
    if(text){
      let keywordsElm = document.querySelector("meta[name='keywords']");
      console.log(text)
      port.postMessage({
          title: document.title,
          link: window.location.toString(),
          tags: keywordsElm?keywordsElm.getAttribute('content'):"",
          highlight: text
      });
    }
}

document.onmouseup = highlightHandler;
// if (!document.all) document.captureEvents(Event.MO);
