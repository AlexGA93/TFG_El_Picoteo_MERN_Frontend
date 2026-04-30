import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';

export type DinningRoomNodeType = 'mesa' | 'silla';

export interface DinningRoomTableOption {
  id: string;
  label: string;
}

export interface DinningRoomMenuFormValue {
  nodeType: DinningRoomNodeType;
  nodeLabel: string;
  numberOfChairsByTable: number;
  parentTable?: string;
}

@Component({
  selector: 'dinning-room-menu',
  imports: [ReactiveFormsModule, ToastModule, TranslatePipe],
  providers: [MessageService],
  templateUrl: './dinning-room-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinningRoomMenu {
  tables = input<DinningRoomTableOption[]>([]);
  addNode = output<DinningRoomMenuFormValue>();

  /**
   * Declaramos un formulario reactivo cuyo resultado envie al padre para modificar el grafo de cytoscape y que se guarde automaticamente.
   */

  // inyectamos servicios
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);

  // declaracion formulario reactivo
  public menuForm = this.formBuilder.group({
    // tipo de nodo 'mesa' o 'silla'
    nodeType: this.formBuilder.control<DinningRoomNodeType | ''>('', Validators.required),
    // label del nodo
    nodeLabel: [''],
    // numero de sillas para la mesa (solo para mesas)
    numberOfChairsByTable: [0, [Validators.min(0), Validators.max(10)]],
    // pertenece a una mesa (solo para sillas)
    parentTable: [''],
  });

  constructor() {
  effect(() => {
    const nodeType = this.menuForm.controls.nodeType.value;

    const nodeLabelControl = this.menuForm.controls.nodeLabel;
    const parentTableControl = this.menuForm.controls.parentTable;
    const numberOfChairsControl = this.menuForm.controls.numberOfChairsByTable;

    if (nodeType === 'mesa') {
      nodeLabelControl.setValidators([Validators.required]);
      parentTableControl.clearValidators();
      numberOfChairsControl.clearValidators();

      parentTableControl.setValue('');
      numberOfChairsControl.setValue(null, { emitEvent: false });
    }

    if (nodeType === 'silla') {
      nodeLabelControl.clearValidators();
      parentTableControl.setValidators([Validators.required]);
      numberOfChairsControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]);

      nodeLabelControl.setValue('', { emitEvent: false });
    }

    if (!nodeType) {
      nodeLabelControl.clearValidators();
      parentTableControl.clearValidators();
      numberOfChairsControl.clearValidators();

      nodeLabelControl.setValue('', { emitEvent: false });
      parentTableControl.setValue('', { emitEvent: false });
      numberOfChairsControl.setValue(null, { emitEvent: false });
    }

    nodeLabelControl.updateValueAndValidity({ emitEvent: false });
    parentTableControl.updateValueAndValidity({ emitEvent: false });
    numberOfChairsControl.updateValueAndValidity({ emitEvent: false });
  });
}


 public onSubmit(): void {
  if (this.menuForm.invalid) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hay conflictos en el formulario. Por favor revise las opciones.',
    });
    this.menuForm.markAllAsTouched();
    return;
  }

  const { nodeType, nodeLabel, numberOfChairsByTable, parentTable } =
    this.menuForm.getRawValue();

  if (!nodeType) return;

  this.addNode.emit({
    nodeType,
    nodeLabel: nodeType === 'mesa' ? nodeLabel?.trim() ?? '' : 'silla',
    numberOfChairsByTable: nodeType === 'silla' ? numberOfChairsByTable ?? 0 : 0,
    parentTable: nodeType === 'silla' ? parentTable || undefined : undefined,
  });

  this.menuForm.reset({
    nodeType: '',
    nodeLabel: '',
    numberOfChairsByTable: null,
    parentTable: '',
  });
}

}
