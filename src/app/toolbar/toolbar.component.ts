import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: []
})
export class ToolbarComponent implements OnInit {
  activeTool = 'draw';
  activeWidth = '5';
  activeColor = 'black';
  activeText = 'Sample Text';
  activeUrl = null;
  activeUrlHref = null;
  urlLoaded = false;

  @Output() onSave: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService) { 
    this.activeTool = dataService.getCurrentTool();
    this.activeWidth = dataService.getCurrentWidth();
    
  }

  ngOnInit() {
    this.dataService.url.subscribe(
      (text: {id: string, url: string}) => {
        console.log(text);
        this.activeUrl = text["url"]+"/"+text["id"];
        this.activeUrlHref = text["id"];
        this.urlLoaded = true;
      }
    );
  }

  changeTool(tool){
    this.dataService.setCurrentTool(tool);
    this.activeTool = this.dataService.getCurrentTool();
  }

  changeColor(color){
    this.dataService.setCurrentColor(color);
    this.activeColor = this.dataService.getCurrentColor();
  }

  changeWidth(width){
    this.dataService.setCurrentWidth(width);
    this.activeWidth = this.dataService.getCurrentWidth();
  }

  changeText(text){
    this.dataService.setCurrentText(text);
    this.activeText = this.dataService.getCurrentText();
  }

  saveImage(){
    this.dataService.saveImage();
  }

}
