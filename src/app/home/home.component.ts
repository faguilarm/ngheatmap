import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  heatmapData = [
    [7,4,8],
    [6,1,9],
    [5,2,3]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
