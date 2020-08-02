import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HighlightCard } from 'functions/src/highlight-card';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log("pppppppppppppppppp");
    const self = this;

    chrome.runtime.onConnect.addListener(function(port) {
      console.log("cnnectedddddd")
      port.onMessage.addListener(function(msg) {
        console.log("message received", msg);
        self.createHighlightCard(msg)
      });
    });
  }

  createHighlightCard(highlightCard: HighlightCard){
    this.http.post<any>(
      `${environment.functionsEndpoint}/createHighlightCard`,
      {data: highlightCard}).subscribe(_=>console.log(_));
  }

}
