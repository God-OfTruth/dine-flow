import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from 'app/services/chat.service';
import { SocketService } from 'app/services/socket.service';
import { UserProfileService } from 'app/services/user-profile.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _userProfileService = inject(UserProfileService);
  private _userService = inject(UserService);
  showAvatar = false;
  /**
   * Constructor
   */

  contacts?: Array<{
    id: string;
    username: string;
    email: string;
    status: string;
    avatarId: string;
  }>;

  user?: User;
  selectedChat?: User;

  constructor() {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
        console.log('showAvatar', user);

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
    this.getUserProfile();
    this.contacts = [];
    this._changeDetectorRef.markForCheck();
  }
  getUserProfile() {
    if (this.user?.profileId) {
      this._userProfileService
        .getProfileById(this.user?.profileId)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next: (res) => {
            console.log('User Profile', res);
          },
        });
    }
  }
}
