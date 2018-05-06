import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: []
})
export class CanvasComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas;
  ctx = null;
  mouseClicked = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.theCanvas.nativeElement.width = document.documentElement.clientWidth;
    this.theCanvas.nativeElement.height = document.documentElement.clientHeight;
    this.ctx = this.theCanvas.nativeElement.getContext("2d");
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    if(this.mouseClicked == true){
      this.ctx.lineTo(e.clientX,e.clientY);
      this.ctx.stroke();
    }
  }

  onMouseDown(event){
    this.mouseClicked = true;
    this.ctx.beginPath(); 
    this.ctx.lineWidth=this.dataService.getCurrentWidth();
    this.ctx.strokeStyle=this.dataService.getCurrentColor();
    this.ctx.moveTo(event.clientX,event.clientY);
  }

  onMouseUp(event){
    this.mouseClicked = false;
  }

  onMouseLeave(event){
    this.mouseClicked = false;
  }

}
