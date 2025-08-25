import {AfterViewInit, Component, effect, ElementRef, EnvironmentInjector, HostListener, inject, OnDestroy, ViewChild} from '@angular/core';
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
  @ViewChild('indicatorsContainer', {static: true}) indicatorsContainer!: ElementRef<HTMLDivElement>;
  private readonly envInjector = inject(EnvironmentInjector);

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {


    const t = e.target as HTMLElement | null;
    if (t && t.closest('input, textarea, [contenteditable="true"]')) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    const key = e.key;
    const block = ['ArrowLeft', 'ArrowRight', 'Home', 'End', ' '];
    if (block.includes(key)) e.preventDefault();

    switch (key) {
      case 'ArrowLeft':
        this.store.prev();
        break;
      case 'ArrowRight':
        this.store.next();
        break;
      case ' ':        // Space
      case 'Spacebar':
        this.store.togglePlay();
        break;
      case 'Home':
        this.store.goTo(0);
        break;
      case 'End':
        this.store.goTo(this.store.slidesLength() - 1);
        break; // фикс
    }
  }

  ngAfterViewInit() {
    this.store.init();

    effect(() => {
      const activeId = this.store.slides()[this.store.currentSlide()].id;
      const track = this.indicatorsContainer.nativeElement;
      const el = track.querySelector<HTMLImageElement>(`img[data-slide-id="${activeId}"]`);
      if (!el) return;

      requestAnimationFrame(() => {
        el.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'});
      });
    }, {injector: this.envInjector});
  }

  ngOnDestroy() {
    this.store.destroy();
  }

}
