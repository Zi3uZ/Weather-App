import { Injectable } from '@angular/core';
import { WeatherData, WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherState {
  public history: WeatherData[] = [];
  private readonly localStorageName: string = 'weather_data_history';

  constructor(private weatherService: WeatherService) {
    this.loadHistoryFormLocalStorage();
  }

  public getForLatLng(lat: number, lng: number): Observable<WeatherData> {
    return this.weatherService
      .getForLatLng(lat, lng)
      .pipe(tap((weatherData) => this.saveWeatherData(weatherData)));
  }

  private saveWeatherData(weatherData: WeatherData): void {
    this.history.push(weatherData);
    localStorage.setItem(this.localStorageName, JSON.stringify(this.history));
  }

  private loadHistoryFormLocalStorage(): void {
    this.history =
      JSON.parse(localStorage.getItem(this.localStorageName)) || [];
  }
}
