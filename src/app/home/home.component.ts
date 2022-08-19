import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rows = 3;
  columns = 3;
  start = 0;
  end = 1000;

  heatmapData: number[][] = [];
    /*= [ [7,4,8],
    [6,1,9],
    [5,2,3]]; */
  

  constructor() { }

  ngOnInit(): void {
  }

  //update heat map with new data
  generate() {
    const matrix: number[][] = [];
    const data = this.generateData(this.rows * this.columns, this.start, this.end);
    //transform 1d to 2d array
    data.forEach((value: number, index: number) => {
      //insert new row or append to the current one
      if(index % this.columns === 0) {
        matrix.push([value])
      } else {
        matrix[Math.floor(index / this.columns)].push(value)
      }
    });
    console.log(matrix)
    this.heatmapData = matrix;
  }

  //generates a list of random values from the given range
  generateData(size: number, start: number, end: number ): number[] {
    const data: number[] = [];
    const valueRange = end - start;
    let value: number;
    for(let i = 0; i < size; i++) {
      value = Math.floor(Math.random() * valueRange);
      data.push(start + value)
    }
    return data;
  }
}
