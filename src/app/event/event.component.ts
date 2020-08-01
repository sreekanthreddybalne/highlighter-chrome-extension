import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("pppppppppppppppppp");

    chrome.runtime.onConnect.addListener(function(port) {
      console.log("cnnectedddddd")
      port.onMessage.addListener(function(msg) {
        // const http = AppInjector.get(HttpClient);
        console.log("message received", msg)
      });
    });
  }

}
