import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas;
  ctx = null;
  mouseClicked = false;

  constructor() { }

  ngOnInit() {
    this.theCanvas.nativeElement.width = document.documentElement.clientWidth;
    this.theCanvas.nativeElement.height = document.documentElement.clientHeight;
    this.ctx = this.theCanvas.nativeElement.getContext("2d");
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    console.log(e);
    if(this.mouseClicked == true){
      this.ctx.lineTo(e.clientX,e.clientY);
      this.ctx.stroke(); // Draw it
    }
  }

  onMouseDown(event){
    this.mouseClicked = true;
//    this.ctx.fillStyle = "#FF0000";
//    this.ctx.fillRect(event.clientX,event.clientY,8,8);
    this.ctx.beginPath(); 
    this.ctx.lineWidth="5";
    this.ctx.strokeStyle="green"; // Green path
    this.ctx.moveTo(event.clientX,event.clientY);
  }

  onMouseUp(event){
    this.mouseClicked = false;
  }

  onMouseLeave(event){
    this.mouseClicked = false;
  }

}
