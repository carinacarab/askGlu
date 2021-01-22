import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchInput: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchInput) {
      return items;
    }
    searchInput = searchInput.toLocaleLowerCase();

    return items.filter(it => {
      return it.includes(searchInput);
    });
  }
}