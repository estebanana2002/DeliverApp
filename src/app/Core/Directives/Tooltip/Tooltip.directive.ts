import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
    ) {}

  private tooltipElement!: HTMLElement;



  @HostListener('mouseenter')
  onMouseEnter() {
    this.tooltipElement = this.renderer.createElement('div');
    this.tooltipElement.textContent = this.appTooltip;
    this.tooltipElement.classList.add('custom-tooltip');

    document.body.appendChild(this.tooltipElement);
    this.positionTooltip();
    this.scheduleTooltipRemoval();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
    }
  }

  private positionTooltip() {
    if (this.tooltipElement) {
      const buttonRect = this.el.nativeElement.getBoundingClientRect();
      const tooltipRect = this.tooltipElement.getBoundingClientRect();

      const top = Math.max(window.scrollY + buttonRect.top - tooltipRect.height - 10, 0);
      const left = Math.min(
        window.innerWidth - tooltipRect.width,
        Math.max(0, window.scrollX + buttonRect.left - (tooltipRect.width - buttonRect.width) / 2)
      );

      this.tooltipElement.style.top = top + 'px';
      this.tooltipElement.style.left = left + 'px';
    }
  }

  private scheduleTooltipRemoval() {
    setTimeout(() => {
      this.removeTooltip();
    }, 1500);
  }

  private removeTooltip() {
    if (this.tooltipElement && this.tooltipElement.parentNode === document.body) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = undefined!;
    }
  }


}
