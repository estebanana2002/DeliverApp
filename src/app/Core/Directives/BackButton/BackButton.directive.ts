import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '../../../Controller/Services/Navigation.service';

@Directive({
  selector: "[backButton]",
  standalone: true,
})
export class BackButtonDirective {
  constructor(
    private navigation: NavigationService
    ) {}

  @HostListener("click")
  onClick(): void {
    this.navigation.back();
  }
}
