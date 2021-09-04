import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WeatherState } from '../../services/weather.state';
import { WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'name',
    'description',
    'coords',
    'temp',
    'timestamp',
    'windSpeed',
    'cloud',
  ];
  public dataSource: MatTableDataSource<WeatherData>;
  public history: WeatherData[];
  public minTemp: number;
  public maxTemp: number;
  public averageTemp: number;
  public mostCommonCity: string;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  constructor(private weatherState: WeatherState) {
    this.history = weatherState.history;
    this.dataSource = new MatTableDataSource<WeatherData>(weatherState.history);
    this.initStatistics();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private initStatistics() {
    if (!this.history.length) {
      return;
    }

    this.minTemp = Math.min(
      ...this.history.map((weatherData) => weatherData.temp)
    );
    this.maxTemp = Math.max(
      ...this.history.map((weatherData) => weatherData.temp)
    );
    this.averageTemp = this.calculateAverage(
      ...this.history.map((weatherData) => weatherData.temp)
    );
    this.mostCommonCity = this.getMostFrequent(
      ...this.history.map((weatherData) => weatherData.name)
    );
  }

  private calculateAverage(...numbers: number[]): number {
    return (
      numbers.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) / numbers.length
    );
  }

  private getMostFrequent(...array: any[]) {
    const hashmap = array.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(hashmap).reduce((a, b) =>
      hashmap[a] > hashmap[b] ? a : b
    );
  }
}
