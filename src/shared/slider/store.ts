import {computed, signal} from '@angular/core';
import {SLIDES} from './data/slides';
import {SlideInterface} from './types/slide.interface';
import {INDICATORS} from './data/indicators';
import {IndicatorInterface} from './types/indicator.interface';

export class SliderStore {

  readonly slides = signal<SlideInterface[]>(SLIDES);
  readonly indicators = signal<IndicatorInterface[]>(INDICATORS);
  readonly currentSlide = signal<number>(0);
  readonly interval = signal<number>(2000);
  readonly slidesLength = computed(() => this.slides().length);
  readonly isPlaying = signal<boolean>(false);

  readonly indexById = computed(() => {
    const map = new Map<number, number>();
    this.slides().forEach((s, i) => map.set(s.id, i));
    return map;
  });

  private timerId: number | null = null;

  goToNth(n: number) {
    const length = this.slidesLength();
    this.currentSlide.set((n + length) % length);
  }

  goTo(i: number) {
    this.pause();
    this.goToNth(i);
  }

  goToSlideId(id: number) {
    const idx = this.indexById().get(id);
    if (idx !== undefined) this.goTo(idx);
  }

  next() {
    this.pause();
    this.goToNth(this.currentSlide() + 1);
  }

  prev() {
    this.pause();
    this.goToNth(this.currentSlide() - 1);
  }


  play() {
    this.pause();
    this.isPlaying.set(true);
    this.timerId = setInterval(() => this.goToNth(this.currentSlide() + 1), this.interval());
  }

  pause() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying.set(false);
  }

  togglePlay(): void {
    this.isPlaying() ? this.pause() : this.play();
  }

  destroy() {
    this.pause();
  }

  init() {
    if (this.slidesLength() > 1) this.play();
  }
}
