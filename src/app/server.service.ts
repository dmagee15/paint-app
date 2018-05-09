import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {

    constructor(private http: Http) {}

    uploadImage(image: any){
        return this.http.get('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js');
    }

}