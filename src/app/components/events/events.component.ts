import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleApiService} from "../../services/google-api.service";
import {LoaderComponent} from "../loader/loader.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {
  constructor(public googleApi: GoogleApiService) {
  }


}
