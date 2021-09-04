import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../../services/weather.service';
import { WeatherState } from '../../services/weather.state';
import { MatDialog } from '@angular/material/dialog';
import { WeatherDataDialogComponent } from '../../components/weather-data-dialog/weather-data-dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public isLoading: boolean;
  public options: google.maps.MapOptions = {
    center: new google.maps.LatLng(49.617392505157305, 20.71864678036467),
    zoom: 8,
  };

  constructor(private weatherState: WeatherState, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onMapClick(latLng: google.maps.LatLng): void {
    this.isLoading = true;
    this.weatherState
      .getForLatLng(latLng.lat(), latLng.lng())
      .subscribe((weatherData) => {
        this.showModal(weatherData);
        this.isLoading = false;
      });
  }

  private showModal(weatherData: WeatherData): void {
    this.dialog.open(WeatherDataDialogComponent, {
      width: '350px',
      data: weatherData,
    });
  }
}
