import { NgModule } from '@angular/core';
import { ExcerptPipe } from './excerpt.pipe';
import { ImagePipe } from './image.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    ExcerptPipe,
    ImagePipe
  ],
  exports: [
    ExcerptPipe,
    ImagePipe
  ]
})
export class PipesModule { }
