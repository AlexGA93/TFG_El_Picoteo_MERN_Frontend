import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
// import cytoscape
import cytoscape, { Core, ElementDefinition } from "cytoscape";
import { DinningRoomMenu } from "../components/dinning-room/dinning-room-menu/dinning-room-menu.component";

@Component({
  selector: "app-dinning-room",
  imports: [DinningRoomMenu],
  templateUrl: "./dinning-room.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinningRoom implements AfterViewInit, OnDestroy {
  @ViewChild("cyContainer", { static: false })
  cyContainer!: ElementRef<HTMLDivElement>;

  private cy?: Core;

  ngAfterViewInit(): void {
    const elements: ElementDefinition[] = [
      //  MESA / SILLAS 1
      {
        data: { id: "mesa-1", label: "Mesa 1" },
        classes: "mesa",
      },
      { data: { id: 'silla-1', label: 'Silla 1', parent: 'mesa-1' }, classes: 'silla' },
      { data: { id: 'silla-2', label: 'Silla 2', parent: 'mesa-1' }, classes: 'silla' },
      { data: { id: 'silla-3', label: 'Silla 3', parent: 'mesa-1' }, classes: 'silla' },
      { data: { id: 'silla-4', label: 'Silla 4', parent: 'mesa-1' }, classes: 'silla' },
      // MESA / SILLAS 2
      {
        data: { id: "mesa-2", label: "Mesa 2" },
        classes: "mesa",
      },
      { data: { id: 'silla-5', label: 'Silla 1', parent: 'mesa-2' }, classes: 'silla' },
      { data: { id: 'silla-6', label: 'Silla 2', parent: 'mesa-2' }, classes: 'silla' },
      { data: { id: 'silla-7', label: 'Silla 3', parent: 'mesa-2' }, classes: 'silla' },
      { data: { id: 'silla-8', label: 'Silla 4', parent: 'mesa-2' }, classes: 'silla' },
    ];

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
    selector: 'node.silla',
    style: {
      width: 40,
      height: 40,
      shape: 'rectangle',
      'background-opacity': 0,
      'background-image': '/assets/imgs/chair.png',
      'background-fit': 'contain',
      'background-repeat': 'no-repeat',
      'border-width': 0
    }
  },
      ],
      layout: { name: "grid" },
    });

    this.cy.on("tap", "node", (evt) => {
      console.log("Nodo pulsado:", evt.target.id());
    });
    this.cy.fit(undefined, 20);
    this.cy.center();
  }

  ngOnDestroy(): void {
    this.cy?.destroy();
  }
}
