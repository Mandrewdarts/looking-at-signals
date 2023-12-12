import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appIncludes',
  standalone: true,
})
export class IncludesPipe implements PipeTransform {
  transform(value: Array<any>, item: unknown): boolean {
    return value.includes(item);
  }
}
