import { Injectable } from '@angular/core';

@Injectable()
export class UploadFileService {

  constructor() { }


  uploadFile( archivo: File, id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'image', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      let url = 'http://localhost:3000/api/v1/posts/images/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }

}
