import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Controls Container -->
    <div class="test-controls">
      <div class="menu-group">
        <!-- Night Mode Toggle -->
        <button 
          (click)="toggleNightMode()" 
          class="mode-toggle"
          [class.night-mode]="isNight">
          <span class="material-symbols-rounded">
            {{ isNight ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>

        <!-- Weather Type Buttons -->
        <div class="weather-select">
          <button 
            *ngFor="let type of weatherTypes" 
            (click)="setWeatherType(type)"
            class="weather-button"
            [class.active]="weatherType === type"
            [class.night-mode]="isNight">
            <span class="material-symbols-rounded">
              {{ getWeatherIcon(type) }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Weather Animation Container -->
    <div [ngClass]="[weatherClass, isNight ? 'night' : '']" class="weather-animation">
      <div class="weather-elements">
        @for (element of elements; track $index) {
          <div class="element" [style.left.%]="element.left" [style.animation-delay.s]="element.delay"></div>
        }
      </div>
      @if (weatherType === 'sunny' && !isNight) {
        <div class="sun"></div>
      }
      @if (isNight) {
        <div class="moon"></div>
        <div class="stars">
          @for (star of stars; track $index) {
            <div class="star" 
              [style.left.%]="star.left" 
              [style.top.%]="star.top"
              [style.width.px]="star.size"
              [style.height.px]="star.size"
              [style.animation-delay.s]="star.delay">
            </div>
          }
        </div>
      }
      @if (weatherType === 'cloudy' || weatherType === 'rainy' || weatherType === 'stormy') {
        <div class="clouds">
          <div class="cloud cloud1"></div>
          <div class="cloud cloud2"></div>
          <div class="cloud cloud3"></div>
        </div>
      }
      @if (weatherType === 'stormy') {
        <div class="lightning"></div>
      }
    </div>
  `,
  styleUrls: ['./weather-animation.component.css']
})
export class WeatherAnimationComponent implements OnInit {
  @Input() set weatherType(value: string) {
    this._weatherType = value;
  }
  get weatherType(): string {
    return this._weatherType;
  }

  private _weatherType: string = 'sunny';
  weatherTypes = ['sunny', 'rainy', 'snowy', 'cloudy', 'stormy'];
  elements: { left: number; delay: number }[] = [];
  stars: { left: number; top: number; size: number; delay: number }[] = [];
  isNight: boolean = false;

  ngOnInit() {
    this.generateElements();
    this.generateStars();
    this.checkTimeOfDay();
  }

  getWeatherIcon(type: string): string {
    const icons: { [key: string]: string } = {
      sunny: 'sunny',
      rainy: 'rainy',
      snowy: 'weather_snowy',
      cloudy: 'cloud',
      stormy: 'thunderstorm'
    };
    return icons[type] || 'question_mark';
  }

  setWeatherType(type: string) {
    this._weatherType = type;
    console.log('Weather type set to:', type);
  }

  private generateElements() {
    this.elements = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5
    }));
  }

  private generateStars() {
    this.stars = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 60,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2
    }));
  }

  toggleNightMode() {
    this.isNight = !this.isNight;
    // Toggle the night-mode class on the body element
    document.body.classList.toggle('night-mode', this.isNight);
    console.log('Night mode toggled:', this.isNight);
  }

  private checkTimeOfDay() {
    const hour = new Date().getHours();
    this.isNight = hour < 6 || hour >= 18;
    // Set initial night mode class on body
    document.body.classList.toggle('night-mode', this.isNight);
  }

  get weatherClass(): string {
    return `weather-${this.weatherType}`;
  }
}
