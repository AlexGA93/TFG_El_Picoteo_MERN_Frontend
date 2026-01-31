import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { navbarStructures } from '@utils/object-structures';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'private-navbar',
  imports: [JsonPipe, LucideAngularModule],
  templateUrl: './private-navbar.component.html',
  styleUrl: './private-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateNavbar {
  // inputs
  section = input<string>('');
  // signals
  sectionObject = computed(() => navbarStructures[this.section()]);
}
