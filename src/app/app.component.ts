import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from "./service/chart.service";
import { Subscription } from "rxjs";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{

  selectedDateRange: Date[] = [];
  chartsOptions: Highcharts.Options[] = [{}]
  chartOptionsSubscription: Subscription;



  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.chartOptionsSubscription = this.chartService.chartsOptions$.subscribe(
      (chartsOptions: Highcharts.Options[]) => {
        this.chartsOptions = chartsOptions;
        this.updateCharts();
      }
    );
  }


  onSelectDateRange(event: any) {
    const selectedDate = event.value;

    if (selectedDate) {
      selectedDate.setHours(0, 0, 0, 0);
      const endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999);

      this.selectedDateRange = [selectedDate, endDate];
      this.updateCharts();
    }
  }


  updateCharts() {
    if (this.selectedDateRange.length > 0 && this.chartsOptions.length > 0) {
      this.chartsOptions.forEach((chartOptions, index) => {
        chartOptions.xAxis[0].min = this.selectedDateRange[0].getTime();
        chartOptions.xAxis[0].max = this.selectedDateRange[1].getTime();
      });
      this.chartService.updateChartsOptions(this.chartsOptions);
    }
  }

  addChart(){
    let numbs: any[] = []
    for(let i = 0; i < 13; i++) {
      numbs.push((Math.random() * 10))
    }
    this.chartService.addedChart(numbs,'line', 'red')
  }

  ngOnDestroy(): void {
    if (this.chartOptionsSubscription) {
      this.chartOptionsSubscription.unsubscribe();
    }
  }
}
