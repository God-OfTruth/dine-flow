import { inject, Injectable, OnDestroy } from '@angular/core';
import { IMessage, RxStompState } from '@stomp/rx-stomp';
import { WebSocketTopic } from 'app/models/websocket.model';
import { API_BASE_HREF } from 'app/utils/base-url.service';
import { RxStompService } from 'app/utils/rx-stomp.service';
import { getStompConfig } from 'app/utils/stomp.config';

/**
 * @author Ritesh Kumar
 * @description Will bew Used to Define all the Web Socket Functionalities naming (Connecting with Server, Subscribe Events)
 *
 */
@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private _rxStompService = inject(RxStompService);
  private API_BASE = inject(API_BASE_HREF);
  /**
   * @description Contains the Reference of Interval used to check if Websocket is Alive or not
   */
  interval: any;

  /**
   * @description Will be Used to Configure {@link RxStompService} and initialize the interval to check Status of WebSocket.
   */
  constructor() {
    const config = getStompConfig(this.API_BASE);
    this._rxStompService.configure(config);
    this.interval = setInterval(() => {
      console.log(
        'Is Socket ACTIVE',
        this._rxStompService.connectionState$.value
      );
    }, 60 * 1000);
    // this.activateSocket();
  }

  /**
   * @description Used to Initiate the Connection to Server and listen for {@link RxStompService} events for any default events.
   */
  activateSocket() {
    this._rxStompService.activate();
    // Used to Listen Connected Event.
    this._rxStompService.connected$.subscribe((state: RxStompState) => {
      console.log(
        '(:= SOCKET CONNECTION ACTIVATED Subscribing Events =:) ',
        state
      );
      this.subscribeEvents();
    });
    // Used to Listen WebSocket Error Event.
    this._rxStompService.webSocketErrors$.subscribe((res: any) => {
      console.log('(:= SOCKET Faced Error =:) ', res);
    });
  }

  /**
   * @description Using to Subscribe Events.
   */
  subscribeEvents() {
    this.subscribeTopicMessage();
  }
  subscribeTopicMessage() {
    this.listenTo(WebSocketTopic.MessageTopic.subscribe).subscribe({
      // SUBSCRIBE
      next: (message: IMessage) => {
        if (message.command !== 'MESSAGE') {
          return;
        }
        const body = JSON.parse(message.body);
        console.log('Rule Notification Received', body);
      },
    });
  }

  sendMessage(message: object) {
    this._rxStompService.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message),
    });
  }

  addUser(message: object) {
    this._rxStompService.publish({
      destination: '/app/chat.addUser',
      body: JSON.stringify(message),
    });
  }

  /**
   *
   * @param topic topic which will receive the {@link IMessage}
   * @returns
   */
  private listenTo(topic: string) {
    console.log('WS: Listening to ' + topic);
    return this._rxStompService.watch(topic);
  }

  /**
   *
   * @param dest Destination Needed to be Subscribed.
   * @param payload Criteria needed to be Sent to Subscribe Event.
   * @description Will Be Used to Send Subscription Message to the Server.
   */
  private subscribe(dest: string, payload: any) {
    this._rxStompService.publish({
      destination: dest,
      body: JSON.stringify(payload),
    });
  }

  /**
   *
   * @param dest Destination Needed to be Unsubscribed.
   * @description Will be Used to Send Unsubscribe Event to the Server.
   */
  private unsubscribe(dest: string) {
    console.log('WS: Unsubscribing from ' + dest);
    this._rxStompService.publish({
      destination: dest,
      body: 'unsubscribe',
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
