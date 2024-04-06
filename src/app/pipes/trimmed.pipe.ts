import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimmed'
})
export class TrimmedPipe implements PipeTransform {

  transform(value: string,): string {
    return value.includes("_") ? value.replace("_"," ") : value;
  }
}
