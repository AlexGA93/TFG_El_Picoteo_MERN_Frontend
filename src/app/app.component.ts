import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TFG_El_Picoteo_MERN_Frontend';
  events: string[] = [];
  opened: boolean = true;

  toggleNav() {
    console.log("BURGUIR");
    // this.opened = false;
  }
}
