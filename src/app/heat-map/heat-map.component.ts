import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

const MAX_SCALE = 255;

type DataPoint = {
  value: number;
  rgb: string;
}
@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatMapComponent implements OnChanges {

  @Input()
  data: number[][] = [];
  scaledData: DataPoint[] = [];
  gridColumns = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'].currentValue?.length > 0) {
      this.setupData();
    }    
  }

  setupData() {
    //convert to 1 dimension array for easier processing
    const flat = this.data.flat();
    const { min, max, diff } = this.getRangeValues(flat);
    const step = Math.floor(MAX_SCALE / diff);
    this.gridColumns = `repeat(${this.data[0].length}, minmax(0, 1fr))`;
    this.scaledData = flat.map(point => {
      let scaledValue = (max - point) * step;
      const rgb = `rgb(${scaledValue},${scaledValue},${MAX_SCALE})`
      return {
        value: point,
        rgb: rgb
      }
    });
    console.log(this.scaledData)
  }

  getRangeValues(data: number[]) {
    const sortedData = [...data].sort();
    const min = sortedData[0];
    const max = sortedData[sortedData.length-1];
    const diff = max - min;
    return {
      min,
      max,
      diff
    };
  }
}
