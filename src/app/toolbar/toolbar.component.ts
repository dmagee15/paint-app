import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private dataService: DataService) { 
    this.activeTool = dataService.getCurrentTool();
    this.activeWidth = dataService.getCurrentWidth();
  }

  ngOnInit() {
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

}
