import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {
    save = new Subject();
    url = new Subject();
    currentTool = 'draw';
    currentColor = 'black';
    currentWidth = "5";
    currentText = "Sample Text";

    constructor() {}

    getCurrentTool(){
        return this.currentTool;
    }
    setCurrentTool(tool){
        this.currentTool = tool;
    }
    getCurrentColor(){
        return this.currentColor;
    }
    setCurrentColor(color){
        this.currentColor = color;
    }
    getCurrentWidth(){
        return this.currentWidth;
    }
    setCurrentWidth(width){
        this.currentWidth = width;
    }
    getCurrentText(){
        return this.currentText;
    }
    setCurrentText(text){
        this.currentText = text;
    }
    saveImage(){
        this.save.next();
    }
    imageSuccess(text){
        console.log(text);
        this.url.next(text);
    }

}