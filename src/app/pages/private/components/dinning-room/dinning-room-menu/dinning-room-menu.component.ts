import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dinning-room-menu',
  imports: [],
  templateUrl: './dinning-room-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinningRoomMenu {
  /**
   * Declaramos un formulario reactivo cuyo resultado envie al padre para modificar el grafo de cytoscape y que se guarde automaticamente.
   */

  // inyectamos servicios
  private formBuilder = inject(FormBuilder);

  // declaracion formulario reactivo
  public menuForm = this.formBuilder.group({
    // tipo de nodo 'mesa' o 'silla'
    nodeType: ['', Validators.required],
    // label del nodo
    nodeLabel: ['', Validators.required],
    // pertenece a una mesa (solo para sillas)
    parentTable: [''],
  });
}
