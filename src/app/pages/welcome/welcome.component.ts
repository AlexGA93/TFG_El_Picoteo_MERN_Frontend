import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {}
