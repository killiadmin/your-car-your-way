import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSocketService, ChatBox } from '../../../../services/websocket.service';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-client-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css']
})
export class ClientChatComponent implements OnInit, OnDestroy, AfterViewInit {
  username: string = '';
  userId: string = '';
  roomId: string = '';
  messageContent: string = '';
  messages: ChatBox[] = [];
  isConnected: boolean = false;
  isChatStarted: boolean = false;
  isLoading: boolean = false;
  isChatClosed: boolean = false;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  private messageSubscription?: Subscription;
  private connectionSubscription?: Subscription;

  constructor(
    private readonly webSocketService: WebSocketService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.connectionSubscription = this.webSocketService.connected$.subscribe(connected => {
      this.isConnected = connected;
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  async startChat(): Promise<void> {
    if (!this.username.trim()) {
      alert('Please enter your name');
      return;
    }

    if (this.isLoading || this.isChatStarted) {
      return;
    }

    this.isLoading = true;

    try {
      this.userId = 'client_' + Date.now();
      this.roomId = 'support_' + Date.now();

      await this.webSocketService.connect();
      await this.webSocketService.connected$
        .pipe(
          filter(connected => connected === true),
          take(1)
        ).toPromise();

      this.messageSubscription = this.webSocketService.watchChatRoom(this.roomId)
        .subscribe({
          next: (message: ChatBox) => {
            this.messages.push(message);

            if (message.type === 'CLOSE') {
              this.isChatClosed = true;
            }

            this.cdr.detectChanges();
            this.scrollToBottom();
          },
          error: (error) => {
            console.error(error);
          }
        });

      this.webSocketService.joinChatRoom(this.roomId, this.username, this.userId);

      this.isLoading = false;
      this.isChatStarted = true;

      this.cdr.detectChanges();
    } catch (error) {
      console.error(error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        const container = this.messagesContainer?.nativeElement;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      } catch (err) {
        console.error('Scroll error:', err);
      }
    }, 0); // Le setTimeout 0 laisse le temps au DOM de se mettre à jour
  }

  sendMessage(): void {
    if (!this.messageContent.trim()) {
      return;
    }

    if (!this.isConnected) {
      alert('You are not connected to the server');
      return;
    }

    if (this.isChatClosed) {
      alert('The chat has been closed. You can no longer send messages.');
      return;
    }

    const message: ChatBox = {
      senderId: this.userId,
      senderName: this.username,
      content: this.messageContent,
      type: 'CHAT'
    };

    this.webSocketService.sendMessage(this.roomId, message);
    this.messageContent = '';
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }
}
