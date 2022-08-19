import { Component, Input, OnInit } from '@angular/core';

type DataPoint = {
  value: number;
  rgb: string;
}
@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit {

  @Input()
  data: number[][] = [];
  scaledData: DataPoint[] = [];
  gridColumns = '';

  constructor() { }

  ngOnInit(): void {
    const flat = this.data.flat();
    const sort = [...flat].sort();
    const min = sort[0];
    const max = sort[sort.length-1];
    const diff = max - min;
    const maxScale = 255;
    const step = Math.floor(maxScale / diff);
    this.gridColumns = `repeat(${this.data[0].length}, minmax(0, 1fr))`;
    this.scaledData = flat.map(point => {
      let scaledValue = (max - point) * step;
      const rgb = `rgb(${scaledValue},${scaledValue},${maxScale})`
      return {
        value: point,
        rgb: rgb
      }
    });
    console.log(this.scaledData)
  }
}
