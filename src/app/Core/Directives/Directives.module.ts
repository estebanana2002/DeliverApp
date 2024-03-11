import { NgModule } from '@angular/core';
import { TooltipDirective } from './Tooltip/Tooltip.directive';
import { BackButtonDirective } from './BackButton/BackButton.directive';


@NgModule({
  imports: [
    TooltipDirective,
    BackButtonDirective
  ],
  declarations: [],
  exports: [
    TooltipDirective,
    BackButtonDirective
  ]
})
export class DirectiveModule {}
