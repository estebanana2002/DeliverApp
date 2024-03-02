import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';

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

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
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
