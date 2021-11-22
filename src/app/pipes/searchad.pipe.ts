import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchad'
})
export class SearchadPipe implements PipeTransform {

  transform(malist: any, input: string): any {

    if (input) {
      input = input.toLowerCase();
      return malist.filter(function (product: any) {
        return product.nom.toLowerCase().indexOf(input) > -1;
      });
    }
    return malist;
  }

}
