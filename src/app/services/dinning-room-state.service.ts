import { Injectable } from "@angular/core";
import { Core, ElementDefinition } from "cytoscape";

const STORAGE_KEY = "dinning-room-graph";
const INITIAL_DINNING_ROOM_ELEMENTS: ElementDefinition[] = [
  // {
  //   data: { id: "mesa-1", label: "Mesa 1" },
  //   classes: "mesa",
  // },
  // { data: { id: "silla-1", label: "Silla 1", parent: "mesa-1" }, classes: "silla" },
  // { data: { id: "silla-2", label: "Silla 2", parent: "mesa-1" }, classes: "silla" },
  // { data: { id: "silla-3", label: "Silla 3", parent: "mesa-1" }, classes: "silla" },
  // { data: { id: "silla-4", label: "Silla 4", parent: "mesa-1" }, classes: "silla" },
  // {
  //   data: { id: "mesa-2", label: "Mesa 2" },
  //   classes: "mesa",
  // },
  // { data: { id: "silla-5", label: "Silla 1", parent: "mesa-2" }, classes: "silla" },
  // { data: { id: "silla-6", label: "Silla 2", parent: "mesa-2" }, classes: "silla" },
  // { data: { id: "silla-7", label: "Silla 3", parent: "mesa-2" }, classes: "silla" },
  // { data: { id: "silla-8", label: "Silla 4", parent: "mesa-2" }, classes: "silla" },
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
