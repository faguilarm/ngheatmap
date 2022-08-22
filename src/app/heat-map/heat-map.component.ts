import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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

  @Input() data: number[][] = [];

  scaledData: DataPoint[] = [];
  gridColumns = '';
  minValue = 0;
  maxValue = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'].currentValue?.length > 0) {
      console.warn("Input data", this.data)
      this.setupData();
    }    
  }

  setupData() {
    //convert to 1 dimension array for easier processing
    const flat = this.data.flat();
    const { min, max, diff } = this.getRangeValues(flat);
    const step = MAX_SCALE / diff;
    console.warn("Min %s, Max %s, Diff %s, Step %s", min, max, diff,step)
    this.minValue = min;
    this.maxValue = max;

    //set the column number for the CSS Grid
    this.gridColumns = `repeat(${this.data[0].length}, minmax(0, 1fr))`;

    //calculate the values inside the scale of 0-255 to use as RGB (Red and Green only)
    this.scaledData = flat.map(point => {
      let scaledValue = Math.floor((max - point) * step);
      //console.debug("Value %s, Scaled and inverted value for RGB (Red and Green) %s", point, scaledValue);
      const rgb = `rgb(${scaledValue},${scaledValue},${MAX_SCALE})`
      return {
        value: point,
        rgb: rgb
      }
    });
    console.warn("Processed data for the heat map", this.scaledData);
  }

  getRangeValues(data: number[]) {
    const sortedData = [...data].sort((a, b) => a - b);
    console.warn("Sorted data", sortedData)
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
