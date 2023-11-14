import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from "../service/chart.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() chartType: string = '';
  @Input() sensors: string[] = [];
  @Input() lineColors: string[] = [];
  @Input() dateRange: Date[] = [];
  @Input() chartOptions: Highcharts.Options = {}
  currentColor: string = '#ff0000'; // Начальный цвет
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false;
  @Input() indexChart: number = 0

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    // this.chartOptions = this.chartService.getChartOptions()
  }


  // chart: Highcharts.Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateRange'] || changes['sensors']) {
      // Fetch or generate data based on the changes
      this.updateChart();
    }
  }

  updateChart() {

  }

  switchColor(): void {
    this.chartService.switchColor(this.indexChart)
    // Логика изменения цвета
   /* this.currentColor = this.currentColor === '#ff0000' ? '#00ff00' : '#ff0000';
    let numbs: any[] = []
    for(let i = 0; i < 13; i++) {
      // console.log(Math.random() * 10)
      numbs.push((Math.random() * 10))
    }
    this.chartService.addedChart(numbs,'line',  this.currentColor)*/

    // Обновляем опции графика с новым цветом
    // this.chartOptions = this.chartService.addedChart(this.currentColor);
  }

}
