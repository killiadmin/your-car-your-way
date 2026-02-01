import { Injectable } from '@angular/core';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChatBox {
  id?: string;
  chatRoomId?: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'CHAT' | 'JOIN' | 'LEAVE' | 'CLOSE';
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly rxStomp: RxStomp;
  private readonly connectedSubject = new BehaviorSubject<boolean>(false);
  public connected$ = this.connectedSubject.asObservable();
  private isConnecting = false;

  constructor() {
    this.rxStomp = new RxStomp();
  }

  async connect(): Promise<void> {
    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      const SockJSModule = await import('sockjs-client');
      const SockJSClient = SockJSModule.default || SockJSModule;

      const rxStompConfig: RxStompConfig = {
        webSocketFactory: () => {
          return new SockJSClient('http://localhost:8080/ws');
        },

        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
      };

      this.rxStomp.configure(rxStompConfig);
      this.rxStomp.connected$.subscribe({
        next: () => {
          this.connectedSubject.next(true);
          this.isConnecting = false;
        },
        error: () => {
          this.connectedSubject.next(false);
          this.isConnecting = false;
        }
      });

      this.rxStomp.activate();

    } catch (error) {
      this.isConnecting = false;
      throw error;
    }
  }

  disconnect(): void {
    if (this.rxStomp) {
      this.rxStomp.deactivate();
      this.connectedSubject.next(false);
      this.isConnecting = false;
    }
  }

  joinChatRoom(roomId: string, username: string, userId: string): void {
    const joinMessage: ChatBox = {
      senderId: userId,
      senderName: username,
      content: '',
      type: 'JOIN'
    };

    this.rxStomp.publish({
      destination: '/app/chat/' + roomId + '/addUser',
      body: JSON.stringify(joinMessage)
    });
  }

  sendMessage(roomId: string, message: ChatBox): void {
    this.rxStomp.publish({
      destination: '/app/chat/' + roomId + '/sendMessage',
      body: JSON.stringify(message)
    });
  }

  closeChat(roomId: string, senderName: string, senderId: string): void {
    const closeMessage: ChatBox = {
      senderId: senderId,
      senderName: senderName,
      content: '',
      type: 'CLOSE'
    };

    this.rxStomp.publish({
      destination: '/app/chat/' + roomId + '/closeChat',
      body: JSON.stringify(closeMessage)
    });
  }

  watchChatRoom(roomId: string): Observable<ChatBox> {
    return this.rxStomp.watch(`/topic/chat/${roomId}`).pipe(
      map(message => {
        console.log('Message reçu:', message.body);
        return JSON.parse(message.body);
      })
    );
  }

  isConnected(): boolean {
    return this.connectedSubject.value;
  }
}
