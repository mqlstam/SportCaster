// frontend/src/app/shared/components/weather-animation/weather-animation.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="weatherClass" class="weather-animation">
      <div class="weather-elements">
        @for (element of elements; track $index) {
          <div class="element" [style.left.%]="element.left" [style.animation-delay.s]="element.delay"></div>
        }
      </div>
      @if (weatherType === 'sunny') {
        <div class="sun"></div>
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
export class WeatherAnimationComponent {
  @Input() weatherType: string = 'sunny';
  elements: { left: number; delay: number }[] = [];

  ngOnInit() {
    this.generateElements();
  }

  private generateElements() {
    this.elements = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5
    }));
  }

  get weatherClass(): string {
    return `weather-${this.weatherType}`;
  }
}