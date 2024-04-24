import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  imports: [
    DatePipe,
  ],
})
export class DateComponent implements OnInit {
  date = new Date();

  ngOnInit() {
    setInterval(() => this.date = new Date(), 1000);
  }
}
