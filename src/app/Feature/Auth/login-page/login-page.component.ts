import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';
import { AuthService } from '../Services/auth.service';
import { ToastService } from '../../../Controller/Services/Toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule
  ],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPageComponent implements OnInit {

  ngOnInit(): void { }


  private fb = inject(FormBuilder);
  public registerForm!: FormGroup;
  public showPass: boolean = false;
  public validators = {
    minlength: (min: number) => `Los caracteres minimos son ${min}!`,
    pattern: () => `Rellene el campo correctamente!`,
    required: () => `Este campo es requerido!`,
    noEstebanana: () => `No ingrese Estebanana!`,
    different: () => `Las contraseñas no coinciden!`,
    repeated: () => `Esta matricula tiene reportes de robo!`,
  };

  constructor(
    private authS: AuthService,
    private toastS: ToastService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  public logIn() {
    if ( this.registerForm.valid ) {
      this.authS.logIn(this.registerForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.toastS.openToast(`Hola ${res.user.username}`, `Bienvenido al sistema!`, 'success', 'Cerrar');
          this.router.navigate(['/DeliverAppSystem/dashboard'])
        }, (error: any) => {
          this.toastS.openToast('Algo salio mal!', 'Credenciales incorrectas!', 'danger', 'Cerrar');
        }
      );
    } else {
      this.toastS.openToast('Error en el registro!', 'Rellene los campos correctamente!', 'danger', 'Cerrar');
    }
  }

  public validateController(inputField: string) {
    const input = this.registerForm.get(inputField);

    if (input?.touched) {
      if (input?.hasError('required')) {
        return this.validators.required();
      } else if (input?.hasError('minlength')) {
        return this.validators.minlength(5);
      } else if (input?.hasError('pattern')) {
        return this.validators.pattern();
      } else if (input?.hasError('noEstebanana')) {
        return this.validators.noEstebanana();
      } else if (input?.hasError('different')) {
        return this.validators.different();
      } else if (input?.hasError('repeated')) {
        return this.validators.repeated();
      }
    }
    return null;
  }
}
