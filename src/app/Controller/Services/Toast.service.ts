import { Injectable, signal } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

interface Toast {
  message: string;
  type: string;
  buttonMsg: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts = signal<Toast[]>([]);


  public openToast(title: string, msg: string, type: string, buttonMsg: string, icon?: string) {
    const message = msg.length > 45 ? msg.slice(0, 45) + '...' : msg;
    const newToast = {
      title,
      message,
      type,
      buttonMsg,
      icon
    };
    this.toasts.set([...this.toasts(), newToast]);

    timer(5000).pipe(take(1)).subscribe(() => {
      this.toasts.set(this.toasts().slice(1));
    });

    // Me los borra al reves, pero se ve mas bonito :(
    // timer(3000).pipe(take(1)).subscribe(() => {
    //   this.toasts.set(this.toasts().slice(0, -1));
    // });
  }

  public dismissToast(index: number) {
    this.toasts().splice(index, 1);
  }

}
