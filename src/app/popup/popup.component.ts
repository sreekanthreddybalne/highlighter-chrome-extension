import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    private authService: AuthService
  ){

  }


  logout(){
    this.authService.logout()
  }

  ngOnInit() {
      this.connectWithContentScript();
      this.sendContentScriptCommand();
  }
  connectWithContentScript = () => {
      const tabQueryData = { active: true, currentWindow: true };
      chrome.tabs.query(tabQueryData, (tabs) => {
          const port = chrome.tabs.connect(tabs[0].id);
          port.postMessage('Hello!');
          port.onMessage.addListener((response) => {
              alert('Content script responded: ' + response);
          });
      });
  }
  sendContentScriptCommand() {
      const tabQueryData = { active: true, currentWindow: true };
      chrome.tabs.query(tabQueryData, (tabs) => {
          const commandMessage = { command: 'salute' };
          chrome.tabs.sendMessage(tabs[0].id, commandMessage, (response) => {
              const responseMessage = response['message'];
              alert('Content script responded: ' + responseMessage);
          });
      });
  }
}
