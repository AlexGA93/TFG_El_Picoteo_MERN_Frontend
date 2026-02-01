import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { LocginErrorResponseType } from "../../../../types/types";

@Component({
  selector: 'login-alert',
  imports: [],
  templateUrl: './login-alert.component.html',
  styleUrl: './login-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginAlert {
  loginerrorPayload = input<LocginErrorResponseType>({});
}
