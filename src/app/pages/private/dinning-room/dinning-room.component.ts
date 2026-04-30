import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  signal,
  inject,
  OnDestroy,
  ViewChild,
} from "@angular/core";
// import cytoscape
import cytoscape, { Core, ElementDefinition } from "cytoscape";

import {
  DinningRoomMenu,
  DinningRoomMenuFormValue,
  DinningRoomTableOption,
} from "../components/dinning-room/dinning-room-menu/dinning-room-menu.component";
import { DinningRoomStateService } from "../../../services/dinning-room-state.service";
import { DinningRoomSelectedNode } from "../../../../types/dinning-room.types";
import { DinnerRoomModal } from "../components/dinning-room/dinner-room-modal/dinner-room-modal.component";
import { MenuService } from "../../../services/menu.service";
import { TranslatePipe } from "@ngx-translate/core";


@Component({
  selector: "app-dinning-room",
  imports: [DinningRoomMenu, DinnerRoomModal, TranslatePipe],
  templateUrl: "./dinning-room.component.html",
  styleUrl: "./dinning-room.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinningRoom implements AfterViewInit, OnDestroy {
  @ViewChild("cyContainer", { static: false })
  cyContainer!: ElementRef<HTMLDivElement>;

  // inyectamos el servicio de estado de cart para actualizar el grafo con los cambios de comanda asociados a la mesa y silla pertinente
  private menuService = inject(MenuService);

  private dinningRoomStateService = inject(DinningRoomStateService);
  private cy?: Core;
  public tableOptions: DinningRoomTableOption[] = [];
  public selectedNode = signal<DinningRoomSelectedNode | null>(null);
  public isNodeDialogVisible = signal(false);

  
  ngAfterViewInit(): void {
    const elements = this.dinningRoomStateService.getGraphElements();
    const hasStoredPositions =
      this.dinningRoomStateService.hasStoredPositions();

    this.cy = cytoscape({
      container: this.cyContainer.nativeElement,
      elements,
      wheelSensitivity: 0,
      zoomingEnabled: false,
      userZoomingEnabled: false,
      panningEnabled: true,
      userPanningEnabled: true,
      minZoom: 1,
      maxZoom: 1,
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            color: "#222",
          },
        },
        {
          selector: "node.silla",
          style: {
            label: "",
            "text-valign": "top",
            "text-halign": "center",
            shape: "round-rectangle",
          },
        },
        {
          selector: "node.mesa",
          style: {
            "background-color": "#F7F1D5",
            "text-valign": "center",
            "text-halign": "center",
            shape: "round-rectangle",
            width: 80,
            height: 50,
          },
        },
        {
          selector: "node.silla",
          style: {
            width: 40,
            height: 40,
            shape: "rectangle",
            "background-opacity": 0,
            "background-image": "/assets/imgs/chair.png",
            "background-fit": "contain",
            "background-repeat": "no-repeat",
            "border-width": 0,
          },
        },
      ],
      layout: { name: hasStoredPositions ? "preset" : "circle" },
    });

    this.cy.on("tap", "node", (evt) => {
      const target = evt.target;
      const selectedNode: DinningRoomSelectedNode = {
        id: target.id(),
        label: String(target.data("label") ?? target.id()),
        type: target.hasClass("mesa") ? "mesa" : "silla",
        parentTable: target.data("tableId") || undefined,
      };

      this.selectedNode.set(selectedNode);
      this.isNodeDialogVisible.set(true);
    });

   this.cy.on("free", "node", () => {
  this.persistGraphState();
});

    this.refreshTableOptions();

    if (!hasStoredPositions) {
      this.persistGraphState();
    }

    this.cy.fit(undefined, 20);
    this.cy.center();
  }

  // funcion de manejo del evento de agregacion de nodo desde componente hijo menu
  public onAddNode(payload: DinningRoomMenuFormValue): void {
    const nodesStack: ElementDefinition[] = [];

    // comprobamos que el objeto cytoscape exista
    if (!this.cy) {
      return;
    }

    // si numberOfChairsByTable es 0, tratamos con una mesa sin sillas, pero si es mayor que 0, tratamos con un numero de sillas desde 1 a 10, generando un nodo por cada silla y anadiendola al stack de nodos a agregar, con un id unico generado a partir del label de la mesa y un indice, y con la propiedad parent apuntando a la mesa a la que pertenecen

    if (payload.nodeType === "mesa") {
      // normalizamos el label del nodo eliminando los posibles espacios al inicio y al final
    const normalizedLabel = payload.nodeLabel.trim();

    // si no existe un label valido, salimos
    if (!normalizedLabel) {
      return;
    }
     // generamos un id base a partir del label normalizado
    const baseId = this.slugify(normalizedLabel);
    const nodeId = this.buildUniqueId(baseId);
      this.cy.add({
        data: { id: nodeId, label: normalizedLabel },
        classes: "mesa",
      });
    } else {
      const parentNode = this.cy.getElementById(payload.parentTable!);
      if (!payload.parentTable || parentNode.length === 0) {
        return;
      }
      const parentPosition = parentNode.position();

      for (let i = 1; i <= payload.numberOfChairsByTable; i++) {
        const chairId = this.buildUniqueId(`silla-${i}`);

        const angle = (2 * Math.PI * (i - 1)) / payload.numberOfChairsByTable;
        const radius = 80;

        const chairPosition = {
          x: parentPosition.x + radius * Math.cos(angle),
          y: parentPosition.y + radius * Math.sin(angle),
        };

        const result = {
          data: {
            id: chairId,
            label: `Silla ${i}`,
            tableId: payload.parentTable,
          },
          position: chairPosition,
          classes: "silla",
        };

        console.log(result);

        nodesStack.push(result);
      }
      this.cy.add(nodesStack);
    }

    this.refreshTableOptions();
    this.persistGraphState();
    this.cy.fit(undefined, 20);
  }

  // al destruir el componente, guardamos el estado del grafo para conservar posiciones y elementos en futuras visitas y destruimos la instancia de cytoscape para liberar recursos
  ngOnDestroy(): void {
    this.persistGraphState();
    this.cy?.destroy();
  }

  private refreshTableOptions(): void {
    this.tableOptions =
      this.cy?.nodes(".mesa").map((node) => ({
        id: node.id(),
        label: String(node.data("label") ?? node.id()),
      })) ?? [];
  }

  // funcion de utilidad para generar un id a partir del label del nodo, eliminando espacios y caracteres especiales
  private slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  // funcion para generar un id unico para un nodo, añadiendo un sufijo numerico si ya existe un nodo con el mismo id
  private buildUniqueId(baseId: string): string {
    if (!this.cy) {
      return baseId;
    }

    const safeBaseId = baseId || "node";
    let candidateId = safeBaseId;
    let suffix = 1;

    while (this.cy.getElementById(candidateId).length > 0) {
      suffix += 1;
      candidateId = `${safeBaseId}-${suffix}`;
    }

    return candidateId;
  }

  private persistGraphState(): void {
    if (!this.cy) {
      return;
    }

    this.dinningRoomStateService.saveFromCy(this.cy);
  }

  public closeNodeDialog(): void {
    this.isNodeDialogVisible.set(false);
  }

  public deleteSelectedNode(): void {
    if (!this.cy || !this.selectedNode()) {
      return;
    }

    const nodeId = this.selectedNode()!.id;
    const node = this.cy.getElementById(nodeId);

    if (node.length === 0) {
      this.closeNodeDialog();
      return;
    }

    node.remove();
    this.refreshTableOptions();
    this.persistGraphState();
    this.selectedNode.set(null);
    this.closeNodeDialog();
  }
}
