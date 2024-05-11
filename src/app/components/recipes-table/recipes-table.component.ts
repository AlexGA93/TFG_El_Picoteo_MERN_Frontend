import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../../../types/types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipes-table',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './recipes-table.component.html',
  styleUrl: './recipes-table.component.scss'
})
export class RecipesTableComponent implements OnInit{

@Input() recipes!: Store[];

constructor() {}

ngOnInit(): void {
  
}

}
