import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'short'): string {
    if (!value) return '';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    
    if (isNaN(date.getTime())) {
      return value as string;
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    switch (format) {
      case 'short':
        return `${day}/${month}/${year}`;
      case 'long':
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      case 'full':
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      default:
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
  }
}
