import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  redirect(flag: string) {
    // console.log(`public/${flag}`);
    this.router.navigateByUrl(`public/${flag}`)
  }

}
