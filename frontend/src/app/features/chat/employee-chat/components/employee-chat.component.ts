import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebSocketService, ChatBox } from '../../../../services/websocket.service';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-employee-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-chat.component.html',
  styleUrls: ['./employee-chat.component.css']
})
export class EmployeeChatComponent implements OnInit, OnDestroy, AfterViewInit {
  username: string = '';
  userId: string = '';
  roomId: string = '';
  messageContent: string = '';
  messages: ChatBox[] = [];
  isConnected: boolean = false;
  isChatJoined: boolean = false;
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
    }, 0);
  }

  async joinChat(): Promise<void> {
    if (!this.username.trim() || !this.roomId.trim()) {
      alert('Please enter your name and Room ID');
      return;
    }

    if (this.isLoading || this.isChatJoined) {
      return;
    }

    this.isLoading = true;

    try {
      this.userId = 'employee_' + Date.now();

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
          }
        });

      this.webSocketService.joinChatRoom(this.roomId, this.username, this.userId);

      this.isLoading = false;
      this.isChatJoined = true;

      this.cdr.detectChanges();
      this.scrollToBottom();
    } catch (error) {
      console.error(error);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  sendMessage(): void {
    if (!this.messageContent.trim()) {
      return;
    }

    if (!this.isConnected) {
      return;
    }

    if (this.isChatClosed) {
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

  closeChat(): void {
    if (!this.isConnected) {
      return;
    }

    if (this.isChatClosed) {
      return;
    }

    const confirmClose = confirm(
      'Are you sure you want to close this chat? The customer will be notified that the issue is resolved.'
    );

    if (confirmClose) {
      this.webSocketService.closeChat(this.roomId, this.username, this.userId);
    }
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
