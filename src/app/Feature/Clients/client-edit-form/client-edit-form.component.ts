import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { RoleService } from '../../../Controller/Services/Role.service';
import { ToastService } from '../../../Controller/Services/Toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';

@Component({
  selector: 'app-client-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DirectiveModule
  ],
  templateUrl: './client-edit-form.component.html',
})
export default class ClientEditFormComponent {

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
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.aRouter.params.subscribe(
      (res: any) => {
        this.clientS.getUserById(res.id).subscribe(
          (res: any) => {
            this.registerForm.reset(res);
          }
        );
      }
    );

    this.roleS.getRoles().subscribe(res => {});
    this.roles = this.roleS.getRole();

    this.registerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['',
      [Validators.required, Validators.minLength(5)]
    ],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
    });
  }

  public saveUser() {
    if ( this.registerForm.valid ) {
      this.clientS.updateUser(this.registerForm.value).subscribe(res => {});
      this.router.navigateByUrl('DeliverAppSystem/clients/list');
      this.toastS.openToast('Usuario creado con exito!', 'Se edito al usuario con exito', 'success', 'Cerrar');
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
