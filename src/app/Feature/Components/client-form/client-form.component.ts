import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../Clients/service/client.service';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';
import { RoleService } from '../../../Controller/Services/Role.service';
import { ToastService } from '../../../Controller/Services/Toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule
  ],
  templateUrl: './client-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClientFormComponent {

  private fb = inject(FormBuilder);
  public registerForm!: FormGroup;
  public showPass: boolean = false;
  public roles: any[] = [];
  public validators = {
    minlength: (min: number) => `Los caracteres minimos son ${min}!`,
    pattern: () => `Rellene el campo correctamente!`,
    required: () => `Este campo es requerido!`,
    noEstebanana: () => `No ingrese Estebanana!`,
    different: () => `Las contraseñas no coinciden!`,
    repeated: () => `Esta matricula tiene reportes de robo!`,
  };

  constructor(
    private clientS: ClientService,
    private roleS: RoleService,
    private toastS: ToastService,
    private router: Router
  ) {
    this.roleS.getRoles().subscribe(
      (res: any) => {
        this.roles = res;
        console.log(res);
      }
    )

    this.registerForm = this.fb.group({
      name: ['',
      [Validators.required, Validators.minLength(5)]
    ],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPass: ['', [Validators.required]],
      role_id: [0, [Validators.required]],
    });
  }

  public saveUser() {
    console.log(this.registerForm.value);

    if ( this.registerForm.valid ) {
      this.clientS.registerUser(this.registerForm.value).subscribe(
        (response: any) => {
          this.toastS.openToast('Se agregó al usuario correctamente', 'success', 'Cerrar');
          this.router.navigate(['DeliverAppSystem/clients/list']);
        }
      );
    } else {
      this.toastS.openToast('Rellene los datos correctamente', 'error', 'Cerrar');
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
