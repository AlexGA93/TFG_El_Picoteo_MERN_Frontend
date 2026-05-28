import { Injectable } from "@angular/core";
import { Core, ElementDefinition } from "cytoscape";
import { DinningRoomOrderSnapshot } from "../../types/dinning-room.types";

const STORAGE_KEY = "dinning-room-graph";
const INITIAL_DINNING_ROOM_ELEMENTS: ElementDefinition[] = [
  // Mesa 1
  {
    data: { id: "mesa-1", label: "Mesa 1" },
    position: { x: 120, y: 120 },
    classes: "mesa",
  },
  {
    data: { id: "silla-1-1", label: "Silla 1", tableId: "mesa-1", parent: "mesa-1" },
    position: { x: 120, y: 60 },
    classes: "silla",
  },
  {
    data: { id: "silla-1-2", label: "Silla 2", tableId: "mesa-1", parent: "mesa-1" },
    position: { x: 170, y: 120 },
    classes: "silla",
  },
  {
    data: { id: "silla-1-3", label: "Silla 3", tableId: "mesa-1", parent: "mesa-1" },
    position: { x: 120, y: 180 },
    classes: "silla",
  },
  {
    data: { id: "silla-1-4", label: "Silla 4", tableId: "mesa-1", parent: "mesa-1" },
    position: { x: 70, y: 120 },
    classes: "silla",
  },

  // Mesa 2
  {
    data: { id: "mesa-2", label: "Mesa 2" },
    position: { x: 320, y: 120 },
    classes: "mesa",
  },
  {
    data: { id: "silla-2-1", label: "Silla 1", tableId: "mesa-2", parent: "mesa-2" },
    position: { x: 320, y: 60 },
    classes: "silla",
  },
  {
    data: { id: "silla-2-2", label: "Silla 2", tableId: "mesa-2", parent: "mesa-2" },
    position: { x: 370, y: 120 },
    classes: "silla",
  },
  {
    data: { id: "silla-2-3", label: "Silla 3", tableId: "mesa-2", parent: "mesa-2" },
    position: { x: 320, y: 180 },
    classes: "silla",
  },
  {
    data: { id: "silla-2-4", label: "Silla 4", tableId: "mesa-2", parent: "mesa-2" },
    position: { x: 270, y: 120 },
    classes: "silla",
  },

  // Mesa 3
  {
    data: { id: "mesa-3", label: "Mesa 3" },
    position: { x: 520, y: 120 },
    classes: "mesa",
  },
  {
    data: { id: "silla-3-1", label: "Silla 1", tableId: "mesa-3", parent: "mesa-3" },
    position: { x: 520, y: 60 },
    classes: "silla",
  },
  {
    data: { id: "silla-3-2", label: "Silla 2", tableId: "mesa-3", parent: "mesa-3" },
    position: { x: 570, y: 120 },
    classes: "silla",
  },
  {
    data: { id: "silla-3-3", label: "Silla 3", tableId: "mesa-3", parent: "mesa-3" },
    position: { x: 520, y: 180 },
    classes: "silla",
  },
  {
    data: { id: "silla-3-4", label: "Silla 4", tableId: "mesa-3", parent: "mesa-3" },
    position: { x: 470, y: 120 },
    classes: "silla",
  },

  // Mesa 4
  {
    data: { id: "mesa-4", label: "Mesa 4" },
    position: { x: 120, y: 280 },
    classes: "mesa",
  },
  {
    data: { id: "silla-4-1", label: "Silla 1", tableId: "mesa-4", parent: "mesa-4" },
    position: { x: 120, y: 220 },
    classes: "silla",
  },
  {
    data: { id: "silla-4-2", label: "Silla 2", tableId: "mesa-4", parent: "mesa-4" },
    position: { x: 170, y: 280 },
    classes: "silla",
  },
  {
    data: { id: "silla-4-3", label: "Silla 3", tableId: "mesa-4", parent: "mesa-4" },
    position: { x: 120, y: 340 },
    classes: "silla",
  },
  {
    data: { id: "silla-4-4", label: "Silla 4", tableId: "mesa-4", parent: "mesa-4" },
    position: { x: 70, y: 280 },
    classes: "silla",
  },

  // Mesa 5
  {
    data: { id: "mesa-5", label: "Mesa 5" },
    position: { x: 320, y: 280 },
    classes: "mesa",
  },
  {
    data: { id: "silla-5-1", label: "Silla 1", tableId: "mesa-5", parent: "mesa-5" },
    position: { x: 320, y: 220 },
    classes: "silla",
  },
  {
    data: { id: "silla-5-2", label: "Silla 2", tableId: "mesa-5", parent: "mesa-5" },
    position: { x: 370, y: 280 },
    classes: "silla",
  },
  {
    data: { id: "silla-5-3", label: "Silla 3", tableId: "mesa-5", parent: "mesa-5" },
    position: { x: 320, y: 340 },
    classes: "silla",
  },
  {
    data: { id: "silla-5-4", label: "Silla 4", tableId: "mesa-5", parent: "mesa-5" },
    position: { x: 270, y: 280 },
    classes: "silla",
  },

  // Mesa 6
  {
    data: { id: "mesa-6", label: "Mesa 6" },
    position: { x: 520, y: 280 },
    classes: "mesa",
  },
  {
    data: { id: "silla-6-1", label: "Silla 1", tableId: "mesa-6", parent: "mesa-6" },
    position: { x: 520, y: 220 },
    classes: "silla",
  },
  {
    data: { id: "silla-6-2", label: "Silla 2", tableId: "mesa-6", parent: "mesa-6" },
    position: { x: 570, y: 280 },
    classes: "silla",
  },
  {
    data: { id: "silla-6-3", label: "Silla 3", tableId: "mesa-6", parent: "mesa-6" },
    position: { x: 520, y: 340 },
    classes: "silla",
  },
  {
    data: { id: "silla-6-4", label: "Silla 4", tableId: "mesa-6", parent: "mesa-6" },
    position: { x: 470, y: 280 },
    classes: "silla",
  },
];

@Injectable({
  providedIn: "root",
})
export class DinningRoomStateService {
  // al cargar el componente, si tenemos un estado guardado, lo devolvemos para inicializar el grafo, si no, devolvemos el estado inicial
  private cloneElements(elements: ElementDefinition[]): ElementDefinition[] {
    // usamos structuredClone para clonar profundamente el estado del grafo, incluyendo posiciones y datos, evitando mutaciones no deseadas al modificar el grafo en el componente
    return structuredClone(elements);
  }

  private graphElements: ElementDefinition[] = this.loadInitialState();

  public getGraphElements(): ElementDefinition[] {
    return this.cloneElements(this.graphElements);
  }

  public hasStoredPositions(): boolean {
    return this.graphElements.some((element) => !!element.position);
  }

  public saveGraphElements(elements: ElementDefinition[]): void {
    this.graphElements = structuredClone(elements);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.graphElements));
  }

  public saveFromCy(cy: Core): void {
    const currentElements = cy
      .elements()
      .map((element) => element.json() as ElementDefinition);
    this.saveGraphElements(currentElements);
  }

  public assignOrderToTable(
    tableId: string,
    order: DinningRoomOrderSnapshot,
  ): void {
    const updatedElements = this.graphElements.map((element) => {
      if (element.data?.["id"] !== tableId || element.classes !== "mesa") {
        return element;
      }

      return {
        ...element,
        data: {
          ...element.data,
          currentOrder: order,
        },
      };
    });

    this.saveGraphElements(updatedElements);
  }

  public clearOrderFromTable(tableId: string): void {
    const updatedElements = this.graphElements.map((element) => {
      if (element.data?.["id"] !== tableId || element.classes !== "mesa") {
        return element;
      }

      const currentData = { ...(element.data ?? {}) };
      delete currentData["currentOrder"];

      return {
        ...element,
        data: currentData,
      };
    });

    this.saveGraphElements(updatedElements);
  }

  private loadInitialState(): ElementDefinition[] {
    const storedGraph = localStorage.getItem(STORAGE_KEY);

    if (!storedGraph) {
      return structuredClone(INITIAL_DINNING_ROOM_ELEMENTS);
    }

    try {
      return JSON.parse(storedGraph) as ElementDefinition[];
    } catch {
      return structuredClone(INITIAL_DINNING_ROOM_ELEMENTS);
    }
  }

  public clearStorage(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.graphElements = structuredClone(INITIAL_DINNING_ROOM_ELEMENTS);
  }
}
