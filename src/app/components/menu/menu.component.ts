import { Component, OnInit } from '@angular/core';
import { WeatherState } from '../../services/weather.state';
import { WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public history: WeatherData[];

  constructor(private weatherState: WeatherState) {}

  ngOnInit(): void {
    this.history = this.weatherState.history;
  }
}
