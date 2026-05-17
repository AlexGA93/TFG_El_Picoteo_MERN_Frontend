import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DinningRoomSelectedNode } from '../../../../../../types/dinning-room.types';
import { DialogModule } from "primeng/dialog";
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
@Component({
  selector: 'dinner-room-modal',
  imports: [DialogModule, TranslatePipe, CurrencyPipe, DatePipe, JsonPipe],
  templateUrl: './dinner-room-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DinnerRoomModal { 
  visible = input<boolean>(false);
selectedNode = input<DinningRoomSelectedNode | null>(null);

close = output<void>();
delete = output<void>();
clearOrder = output<void>();

}
