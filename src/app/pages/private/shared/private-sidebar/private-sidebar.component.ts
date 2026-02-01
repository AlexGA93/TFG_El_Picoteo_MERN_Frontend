import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { navbarStructures } from '@utils/object-structures';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'private-sidebar',
  imports: [TitleCasePipe, LucideAngularModule],
  templateUrl: './private-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateSidebar {
  // inputs
  section = input<string>('');
  // signals
  sectionObject = computed(() => navbarStructures[this.section()]);
}
