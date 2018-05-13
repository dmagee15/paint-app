import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-displayimage',
  templateUrl: './displayimage.component.html',
  styleUrls: ['./displayimage.component.css']
})
export class DisplayimageComponent implements OnInit {
  loaded = false;
  fail = false;
  image = null;
  getData: {id: string};

  constructor(private route: ActivatedRoute, private serverService: ServerService) { 
    this.getData = {id: this.route.snapshot.params['id']};
    this.serverService.getImage(this.getData).subscribe(
      (response) => {
        if(response["_body"]!="fail"){
          this.image = JSON.parse(response["_body"]).data;
          this.loaded = true;
        }
        else{
          this.fail = true;
        }
      }
    );
  }

  ngOnInit() {
  }

}
