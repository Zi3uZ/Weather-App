import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-weather-data-dialog',
  templateUrl: './weather-data-dialog.component.html',
  styleUrls: ['./weather-data-dialog.component.scss'],
})
export class WeatherDataDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public weatherData: WeatherData) {}

  ngOnInit(): void {}
}
