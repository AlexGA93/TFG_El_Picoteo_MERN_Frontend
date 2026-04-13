import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DinningRoomSelectedNode } from '../../../../../../types/dinning-room.types';
import { DialogModule } from "primeng/dialog";
@Component({
  selector: 'dinner-room-modal',
  imports: [DialogModule],
  templateUrl: './dinner-room-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinnerRoomModal { 
  visible = input<boolean>(false);
selectedNode = input<DinningRoomSelectedNode | null>(null);

close = output<void>();
delete = output<void>();

}
