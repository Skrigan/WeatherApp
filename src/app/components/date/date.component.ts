import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent implements OnInit {
  date = new Date();

  ngOnInit() {
    setInterval(() => this.date = new Date(), 1000);
  }
}
