import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from "rxjs";
import {
  Eraser,
  LucideAngularModule,
  PencilLine,
  Plus,
  ArrowBigLeftDash,
} from "lucide-angular";
import {
  InventoryData,
  InventoryViewState,
} from "../../../../types/inventario.types";
import { InventoryService } from "../../../services/inventario.service";
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { UnitFormatPipe } from "@pipes/unit-format.pipe";
import { DateFormatPipe } from "@pipes/date-format.pipe";
import { InventoryCreateModal } from "../components/inventory/inventory-create-modal/inventory-create-modal.component";
import { MessageService } from "primeng/api";
import { InventoryEditModal } from "../components/inventory/inventory-edit-modal/inventory-edit-modal.component";
import { ToastModule } from "primeng/toast";
import { TranslatePipe } from "@ngx-translate/core";

const INITIAL_INVENTORY_STATE: InventoryViewState = {
  loading: true,
  message: "",
  data: null,
  error: null,
};

@Component({
  selector: "app-inventory",
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterLink,
    LucideAngularModule,
    LoaderComponent,
    UnitFormatPipe,
    DateFormatPipe,
    InventoryCreateModal,
    InventoryEditModal,
    ToastModule,
    TranslatePipe
  ],
  providers: [MessageService],
  templateUrl: "./inventory.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  readonly PencilLine = PencilLine;
  readonly Eraser = Eraser;
  readonly Plus = Plus;
  readonly ArrowBigLeftDash = ArrowBigLeftDash;

  /**
   * * 1. Inyeccion de dependencias
   * @description Se inyectan los servicios necesarios para separar lógica de UI y backend:
   */
  private inventoryService = inject(InventoryService);
  private messageService = inject(MessageService);

  /**
   * * 2. Trigger de recarga manual
   * @description Este Subject actúa como un disparador manual de recarga de datos.Cada vez que ocurre un CRUD (crear, editar, borrar), se ejecuta:
   */
  private reload$ = new Subject<void>();

  /**
   * * 3.Creacion del estado reactivo con toSignal
   */
  inventoryState = toSignal(
    // * 3.1 llamamos al trigger para
    this.reload$.pipe(
      // * 3.2 carga inicial automática
      startWith(void 0),
      // * 3.3 ejecución del backend
      switchMap(() => this.inventoryService.getInventariokData()),
      // * 3.4 transformación del response
      map((response) => ({
        loading: false,
        message: response.message,
        data: response.data,
        error: response.success ? null : response.message,
      })),
      // * 3.5 manejo de errores
      catchError((error: HttpErrorResponse) =>
        of({
          loading: false,
          message: "",
          data: null,
          error: error.error?.message || "Error a cargar inventario",
        }),
      ),
    ),
    // * 3.6 conversión a estado reactivo Angular
    { initialValue: INITIAL_INVENTORY_STATE },
  );

  // * 4. signals derivadas de la formada ocn la respuesta
  inventoryData = computed(() => this.inventoryState().data);
  inventoryList = computed(() => this.inventoryData() ?? []);
  inventoryMessage = computed(() => this.inventoryState().message);
  inventoryError = computed(() => this.inventoryState().error);
  isLoading = computed(() => this.inventoryState().loading);

  // * 5. otros signal para gestion de modales
  isCreateInventoryDialogVisible = signal(false);
  isEditItemDialogVisible = signal(false);
  selectedInventoryItem = signal<InventoryData | null>(null);

  // * 6. Funciones
  /**
   * @description Función para abrir el modal de creación de inventario
   * @params none
   * @returns void
   */
  createRecipe() {
    this.isCreateInventoryDialogVisible.set(true);
  }

  /**
   * @description Función para cerrar el modal de creación de inventario
   * @params none
   * @returns void
   */
  closeCreateRecipeDialog(): void {
    this.isCreateInventoryDialogVisible.set(false);
    this.selectedInventoryItem.set(null);
  }

  /**
   * @description Callback cuando se crea un nuevo inventario correctamente
   * @params FormData formData
   * @returns void
   */
  onInventoryCreated(formData: FormData): void {
    console.log("datos del modal ", { formData });

    // * recargamso desde el servidor accionando el trigger y asiactualizar la signal
    this.reload$.next();
  }

  /**
   * @description Función para cerrar modal de edición
   * @params none
   * @returns void
   */
  closeEditItemDialog(): void {
    this.isEditItemDialogVisible.set(false);
    this.selectedInventoryItem.set(null);
  }

  /**
   * @description Callback cuando un item es actualizado correctamente
   * @params none
   * @returns void
   */
  onItemUpdated(): void {
    this.closeEditItemDialog();
    // * recargamso desde el servidor accionando el trigger y asiactualizar la signal
    this.reload$.next();
  }

  /**
   * @description Abre modal de edición con item seleccionado
   * @params InventoryData item
   * @returns void
   */
  editItem(item: InventoryData): void {
    this.selectedInventoryItem.set(item);
    this.isEditItemDialogVisible.set(true);
  }

  /**
   * @description Elimina un item del inventario y recarga la lista si es exitoso
   * @params number idItem
   * @returns void
   */
  deleteItem(idItem: number) {
    this.inventoryService.deleteInventoryItem(idItem).subscribe({
      next: (response) => {
        if (response.success) {
          console.log(response);
          // * recargamso desde el servidor accionando el trigger y asiactualizar la signal
          this.reload$.next();
          // mostramos modal de exito
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: response.message,
          });
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: response.message,
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        // mostramos error en el toast
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: error.error.message,
        });
      },
    });
  }

  /**
   * @description Recarga manual del estado del inventario (recrea el stream)
   * @params none
   * @returns void
   */
  reloadInventory() {
    this.inventoryState = toSignal(
      this.inventoryService.getInventariokData().pipe(
        map(
          (response): InventoryViewState => ({
            loading: false,
            message: response.message,
            data: response.data,
            error: response.success ? null : response.message,
          }),
        ),
        catchError((error: HttpErrorResponse) =>
          of({
            loading: false,
            message: "",
            data: null,
            error: error.error?.message,
          }),
        ),
        startWith(INITIAL_INVENTORY_STATE),
      ),
      { initialValue: INITIAL_INVENTORY_STATE },
    );
  }
}
