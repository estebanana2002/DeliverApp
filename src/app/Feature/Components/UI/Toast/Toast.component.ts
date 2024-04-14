import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastService } from '../../../../Controller/Services/Toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
  ],
  templateUrl: './Toast.component.html',
  styleUrls: ['./Toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  public allToasts: any;

  /**
   * * REF SANITIZER
   * * https://angular.io/guide/security#xss
   */
  constructor(
    private toastS: ToastService,
  ) {
    this.allToasts = this.toastS.toasts;
  }


  public dismissModal(index: number) {
    this.toastS.dismissToast(index);
  }
}
