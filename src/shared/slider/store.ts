import {computed, signal} from '@angular/core';
import {SLIDES} from './data';
import {SlideInterface} from './types/slide.interface';

export class SliderStore {

  readonly slides = signal<SlideInterface[]>(SLIDES);
  readonly currentSlide = signal<number>(0);
  readonly interval = signal<number>(3000);
  readonly slidesLength = computed(() => this.slides().length);
  readonly isPlaying = signal<boolean>(false);
  private timerId: number | null = null;

  next() {
    const length = this.slidesLength();
    this.currentSlide.update(i => (i + 1) % length);
  }

  prev() {
    const length = this.slidesLength();
    this.currentSlide.update(i => (i - 1 + length) % length);
  }

  goTo(n: number) {
    const length = this.slidesLength();
    this.currentSlide.set((n + length) % length);
  }

  play() {
    this.pause();
    this.isPlaying.set(true);
    this.timerId = setInterval(() => this.next(), this.interval());
  }

  pause() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying.set(false);
  }

  bump() {
    if (!this.isPlaying()) return;
    this.pause();
    this.play();
  }

  destroy() {
    this.pause();
  }

  init() {
    if (this.slidesLength() > 1) this.play();
  }
}
