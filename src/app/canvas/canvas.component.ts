import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: []
})
export class CanvasComponent implements OnInit {
  @ViewChild('theCanvas') theCanvas;
  @ViewChild('ghostCanvas') ghostCanvas;
  ctx = null;
  ghost = null;
  mouseClicked = false;
  startX = 0;
  startY = 0;

  constructor(private dataService: DataService, private serverService: ServerService) {
    
   }

  ngOnInit() {
    this.dataService.save.subscribe(
      () => {
        var image = {content: this.theCanvas.nativeElement.toDataURL()};
        this.serverService.uploadImage(image).subscribe(
          (response) => {
            if(response["_body"]){
              this.dataService.imageSuccess(response["_body"]);
            }
            else{

            }
          }
        );
      }
    );
    this.theCanvas.nativeElement.width = document.documentElement.clientWidth;
    this.theCanvas.nativeElement.height = document.documentElement.clientHeight;
    this.ghostCanvas.nativeElement.width = document.documentElement.clientWidth;
    this.ghostCanvas.nativeElement.height = document.documentElement.clientHeight;
    this.ctx = this.theCanvas.nativeElement.getContext("2d");
    this.ghost = this.ghostCanvas.nativeElement.getContext("2d");
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    switch(this.dataService.getCurrentTool()){
      case 'draw': 
      if(this.mouseClicked == true){
        this.ctx.lineTo(e.clientX,e.clientY);
        this.ctx.stroke();
      }
      break;
      case 'line':
      if(this.mouseClicked == true){
        this.ghost.clearRect(0, 0, this.ghostCanvas.nativeElement.width, this.ghostCanvas.nativeElement.height);
        this.ghost.beginPath(); 
        this.ghost.lineWidth=this.dataService.getCurrentWidth();
        this.ghost.strokeStyle=this.dataService.getCurrentColor();
        this.ghost.moveTo(this.startX,this.startY);
        this.ghost.lineTo(e.clientX,e.clientY);
        this.ghost.stroke();
      }
      break;
      case 'rect':
      if(this.mouseClicked == true){
        this.ghost.clearRect(0, 0, this.ghostCanvas.nativeElement.width, this.ghostCanvas.nativeElement.height);
        this.ghost.beginPath(); 
        this.ghost.lineWidth=this.dataService.getCurrentWidth();
        this.ghost.strokeStyle=this.dataService.getCurrentColor();
        this.ghost.rect(this.startX,this.startY, e.clientX-this.startX,e.clientY-this.startY);
        this.ghost.stroke();
      }
      break;
    }
  }

  onMouseDown(event){
    switch(this.dataService.getCurrentTool()){
      case 'draw': 
      this.mouseClicked = true;
      this.ctx.beginPath(); 
      this.ctx.lineWidth=this.dataService.getCurrentWidth();
      this.ctx.strokeStyle=this.dataService.getCurrentColor();
      this.ctx.moveTo(event.clientX,event.clientY);
      break;
      case 'line':
      this.mouseClicked = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      break;
      case 'text': 
      this.ctx.font="20px Georgia";
      this.ctx.fillText(this.dataService.getCurrentText(),event.clientX,event.clientY);
      break;
      case 'rect':
      this.mouseClicked = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      break;
    }
  }

  onMouseUp(event){
    switch(this.dataService.getCurrentTool()){
      case 'line':
      this.ghost.clearRect(0, 0, this.ghostCanvas.nativeElement.width, this.ghostCanvas.nativeElement.height);
      this.ctx.beginPath(); 
      this.ctx.lineWidth=this.dataService.getCurrentWidth();
      this.ctx.strokeStyle=this.dataService.getCurrentColor();
      this.ctx.moveTo(this.startX,this.startY);
      this.ctx.lineTo(event.clientX,event.clientY);
      this.ctx.stroke();
      break;
      case 'rect':
      this.ghost.clearRect(0, 0, this.ghostCanvas.nativeElement.width, this.ghostCanvas.nativeElement.height);
      this.ctx.beginPath(); 
      this.ctx.lineWidth=this.dataService.getCurrentWidth();
      this.ctx.strokeStyle=this.dataService.getCurrentColor();
      this.ctx.rect(this.startX,this.startY, event.clientX-this.startX,event.clientY-this.startY);
      this.ctx.stroke();
      break;
    }
    this.mouseClicked = false;
  }

  onMouseLeave(event){
    switch(this.dataService.getCurrentTool()){
      case 'rect':
      break;
    }
    this.mouseClicked = false;
  }

  onMouseEnter(event){
    this.mouseClicked = false;
  }

  onDblClick(event){
    this.mouseClicked = false;
  }

//   dataURItoBlob(dataURI) {
//     var byteString;
//     if (dataURI.split(',')[0].indexOf('base64') >= 0)
//         byteString = atob(dataURI.split(',')[1]);
//     else
//         byteString = decodeURI(dataURI.split(',')[1]);
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//     var ia = new Uint8Array(byteString.length);
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ia], {
//         type: mimeString
//     });
// }


}
