import {Component} from '@angular/core';
import {SlideInterface} from '../types/slide.interface';
import {SLIDES} from '../data';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-slider',
  imports: [
    NgForOf
  ],
  templateUrl: './slider.html',
  styleUrl: './slider.scss'
})
export class Slider {
  slides: SlideInterface[] = SLIDES;
}
