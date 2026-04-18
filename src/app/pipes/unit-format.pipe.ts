import { Pipe, PipeTransform } from '@angular/core';
import { formatUnit } from '../utils/unit-formatter';

@Pipe({
  name: 'unitFormat',
  standalone: true
})
export class UnitFormatPipe implements PipeTransform {
  transform(unit: string): string {
    return formatUnit(unit);
  }
}
