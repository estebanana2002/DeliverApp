import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateSoldPrice } from '../../../Core/Validators/soldPrice.validators';
import { DirectiveModule } from '../../../Core/Directives/Directives.module';

@Component({
  selector: 'app-form-bazar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule,
  ],
  templateUrl: './form-bazar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBazarComponent {
  private fb = inject(FormBuilder);
  public registerForm!: FormGroup;
  public showPass: boolean = false;
  public validators = {
    required: () => `Este campo es requerido!`,
    min: (min: number) => `El valor debe ser mayor a ${min - 1}!`,
    minLength: (min: number) => `El valor debe ser mayor a ${min}!`,
    pattern: () => `Rellene el campo correctamente!`,
    isMinor: () => `Este precio debe ser mayor al precio general`
  };


  @Input({required: true}) prodSignal!: any;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]
    ],
      urlImage: ['', [Validators.required]],
      generalPrice: ['', [Validators.required, Validators.min(1)]],
      soldPrice: ['', [Validators.required]],
    }, { validators: [validateSoldPrice] });
  }

  public saveProd() {
    if ( this.registerForm.valid ) {

      const prods = this.prodSignal();
      console.log(this.prodSignal, 'asdasd');
      const newProd = [... prods, this.registerForm.value];
      console.log(newProd);

      this.prodSignal.set(newProd);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }


  public validateController(inputField: string) {
    const input = this.registerForm.get(inputField);

    if (input?.touched) {
      if (input?.hasError('required')) {
        return this.validators.required();
      } else if (input?.hasError('min')) {
        if ( inputField === 'generalPrice') {
          return this.validators.min(1);
        }
      } else if (input?.hasError('minlength')) {
        return this.validators.minLength(5);
      } else if (input?.hasError('pattern')) {
        return this.validators.pattern();
      } else if (input?.hasError('isMinor')) {
        return this.validators.isMinor();
      }
    }
    return null;
  }

}
