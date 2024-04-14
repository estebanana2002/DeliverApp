import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../Clients/service/client.service';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';
import { RoleService } from '../../../Controller/Services/Role.service';
import { ToastService } from '../../../Controller/Services/Toast.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

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
  public roles: any;
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
    this.roleS.getRoles().subscribe(res => {});
    this.roles = this.roleS.getRole();

    this.registerForm = this.fb.group({
      name: ['',
      [Validators.required, Validators.minLength(5)]
    ],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role_id: ['', [Validators.required]],
    });
  }

  public saveUser() {

    if ( this.registerForm.valid ) {
      this.clientS.registerUser(this.registerForm.value).subscribe(
        (response: any) => {
          this.toastS.openToast('Nuevo usuario agregado', 'Se agregó al usuario correctamente', 'success', 'Cerrar');
          this.router.navigate(['DeliverAppSystem/clients/list']);
        },
        (error: any) => {
          console.log(error, 'response');
          const {name, username, email, role_id, matricula, password} = error.error.errors;
          const errors = [name, username, email, role_id, matricula, password];
          console.log(errors);

          errors.map(
            (err: any) => {
              if ( err ) {
                this.toastS.openToast(error.error.message, err, 'danger', 'Cerrar');
              }
            }
          );
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
      this.toastS.openToast('Error en el registro!', 'Rellene los datos correctamente', 'danger', 'Cerrar');
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
      }
    }
    return null;
  }
}
