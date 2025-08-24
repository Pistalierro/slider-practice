import {AfterViewInit, Component, inject, OnDestroy} from '@angular/core';
import {SliderStore} from '../store';


@Component({
  selector: 'app-slider',
  imports: [],
  standalone: true,
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  providers: [SliderStore]
})
export class Slider implements AfterViewInit, OnDestroy {
  store = inject(SliderStore);

  ngAfterViewInit() {
    this.store.init();
  }

  ngOnDestroy() {
    this.store.destroy();
  }
}
