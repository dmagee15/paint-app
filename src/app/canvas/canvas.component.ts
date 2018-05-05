import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas;
  ctx = null;
  constructor() { }

  ngOnInit() {
    this.ctx = this.theCanvas.nativeElement.getContext("2d");
  }

  onClick(event){
    console.log(event.screenX+" ",event.screenY);
    console.log(event.clientX+" ",event.clientY);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(event.clientX,event.clientY,8,5);
  }

}
