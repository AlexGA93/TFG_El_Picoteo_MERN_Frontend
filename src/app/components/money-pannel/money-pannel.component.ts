import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-money-pannel',
    imports: [UpperCasePipe, CurrencyPipe],
    templateUrl: './money-pannel.component.html',
    styleUrl: './money-pannel.component.scss'
})
export class MoneyPannelComponent {

  @Input() flag!: number;

  sectionNames: string[] = ["Ganancias", "Gastos"];

}
