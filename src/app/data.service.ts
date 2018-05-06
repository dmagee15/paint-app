import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    currentTool = 'draw';
    currentColor = 'black';
    currentWidth = "5";

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

}