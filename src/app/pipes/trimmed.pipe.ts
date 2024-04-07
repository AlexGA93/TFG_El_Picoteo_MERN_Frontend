import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimmed',
  standalone: true
})
export class TrimmedPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.includes("_") ? value.replace("_"," ") : value;
  }
}
