import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DinningRoomSelectedNode } from '../../../../../../types/dinning-room.types';
import { DialogModule } from "primeng/dialog";
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'dinner-room-modal',
  imports: [DialogModule, TranslatePipe],
  templateUrl: './dinner-room-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinnerRoomModal { 
  visible = input<boolean>(false);
selectedNode = input<DinningRoomSelectedNode | null>(null);

close = output<void>();
delete = output<void>();

}
