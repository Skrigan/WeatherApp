import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleApiService } from '../../services/google-api.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  constructor(public googleApi: GoogleApiService) {
  }

  onSignIn() {
    this.googleApi.signIn();
  }

  onSignOut() {
    this.googleApi.signOut();
  }
}
