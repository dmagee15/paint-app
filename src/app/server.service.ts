import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {

    constructor(private http: Http) {}

    uploadImage(image: {content: string}){
        return this.http.post('/submit', image);
    }

    getImage(image: {id: string}){
        return this.http.post('/image', image);
    }

}