import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface WeatherApiData {
  name: string;
  dt: number;
  main: {
    temp: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  weather: {
    description: string;
  }[];
  coord: {
    lat: number;
    lon: number;
  };
}

export interface WeatherData {
  name: string;
  timestamp: number;
  temp: number;
  windSpeed: number;
  cloud: number;
  description: string;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiKey = 'c383b921ac6a71595496efe8cc5866c4';

  constructor(private httpClient: HttpClient) {}

  getForLatLng(lat: any, lon: any): Observable<WeatherData> {
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);

    return this.httpClient
      .get<WeatherApiData>('https://api.openweathermap.org/data/2.5/weather', {
        params,
      })
      .pipe(
        map((weatherApiData) => ({
          name: weatherApiData.name,
          temp: weatherApiData.main.temp,
          timestamp: weatherApiData.dt * 1000,
          windSpeed: weatherApiData.wind.speed,
          cloud: weatherApiData.clouds.all,
          description: weatherApiData.weather[0]?.description,
          lat: weatherApiData.coord.lat,
          lng: weatherApiData.coord.lon,
        }))
      );
  }
}
