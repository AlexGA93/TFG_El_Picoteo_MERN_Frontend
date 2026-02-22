import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { LocginErrorResponseType } from "../../../../types/general.types";

@Component({
  selector: 'login-alert',
  imports: [],
  templateUrl: './login-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAlert {
  loginerrorPayload = input<LocginErrorResponseType>({});
}
