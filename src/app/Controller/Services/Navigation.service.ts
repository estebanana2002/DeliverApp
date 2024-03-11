import { Injectable, signal } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";

/**
 * * / * * * * * * * * * * * * * * * * * /
 * ? Reference
 * * https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page/
 */

@Injectable({ providedIn: "root" })
export class NavigationService {
  private history: string[] = [];


  public signalMenu = signal(false);
  public showBackButton = signal(true);

  constructor(
    private router: Router,
    private location: Location
    ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if ( event.urlAfterRedirects !== '/DeliverAppSystem/dashboard') {
          this.history.push(event.urlAfterRedirects);
          console.log(this.history);
        }

        this.setBackButton()
      }
    });
  }

  public back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  public setBackButton() {
    this.router.url === '/DeliverAppSystem/dashboard' ? this.showBackButton.set(false) : this.showBackButton.set(true);
  }
}
