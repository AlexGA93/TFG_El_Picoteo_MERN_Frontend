import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UtilService } from '../../../services/util.service';
import { AddNewInventoryType } from '../../../../types/types';

@Component({
  selector: 'app-new-inventory-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './new-inventory-form.component.html',
  styleUrl: './new-inventory-form.component.scss',
})
export class NewInventoryFormComponent implements OnInit {
  // Output EventEmitter para enviar datos al componente padre
  @Output() formData = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe((formData) => {
      this.utilService.setFormData(formData);
    });
  }

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required]],
    quantity: [0, [Validators.required]],
  });

  // Método para obtener los datos del formulario
  getFormData(): AddNewInventoryType {
    return this.myForm.value;
  }
}
