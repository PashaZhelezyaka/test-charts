import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private chartsOptions: BehaviorSubject<Highcharts.Options[]>  = new BehaviorSubject<Highcharts.Options[]>([]);
  chartsOptions$ = this.chartsOptions.asObservable();
  currentColor: string = '#ff0000';

  constructor() { }


  addedChart(data: any, type: any, lineColor: any) {
    const newChart: Highcharts.Options = {
      chart: {
        renderTo: 'container',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%Y-%m-%d}',
        },
      } as Highcharts.XAxisOptions,
      series: [{
        data,
        type,
        pointStart: Date.UTC(2023, 0, 1),
        pointInterval: 30 * 24 * 60 * 60 * 1000,
        name: "One",
        color: lineColor
      }],
    };

    const updatedChartsOptions = [...this.chartsOptions.value, newChart];
    this.chartsOptions.next(updatedChartsOptions);
  }

  updateChartsOptions(chartsOptions: Highcharts.Options[]) {
    this.chartsOptions.next(chartsOptions);
  }

  switchColor(index: number): void {
    this.currentColor = this.currentColor === '#ff0000' ? '#00ff00' : '#ff0000';
    const updatedChartsOptions = [...this.chartsOptions.value];
    // @ts-ignore
    updatedChartsOptions[index].series[0].color = 'green'
    this.chartsOptions.next(updatedChartsOptions);

  }
}
