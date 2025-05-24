import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-simple-modal',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './simple-modal.component.html',
    styleUrl: './simple-modal.component.scss'
})
export class SimpleModalComponent {

}
