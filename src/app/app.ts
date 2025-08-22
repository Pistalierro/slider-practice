import {Component, signal} from '@angular/core';
import {Slider} from '../shared/slider/slider/slider';

@Component({
  selector: 'app-root',
  imports: [
    Slider
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('slider-practice');
}
