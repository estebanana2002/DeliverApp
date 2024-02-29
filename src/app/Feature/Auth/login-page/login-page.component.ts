import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent implements OnInit {

  ngOnInit(): void { }

}
