import { Pipe, PipeTransform } from '@angular/core';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string) {

    return `http://localhost:3000/api/v1/posts/images/${value}?nocache=${new Date().getMilliseconds()}`;
  }
}
