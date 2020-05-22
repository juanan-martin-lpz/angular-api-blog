import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs';
import { take, tap, mergeAll } from 'rxjs/operators';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(value: string, len: number = 15) {

    const words = value.split(' ');

    let excerptPhrase = '';

    const obs$ = from(words).pipe(
      take(len)
    )
    .subscribe(result => {

      excerptPhrase = excerptPhrase + result + ' ';
    });

    return excerptPhrase;
  }
}
