import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerService } from '../../shared/owner/owner.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from  '../../shared/car/car.service';


@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners : Array <any>;
  selectedOwners = [];
  message : any;

  constructor(private ownerService: OwnerService, private carService : CarService,
    private router: Router, private route: ActivatedRoute
    ) { }

  getOwners() {
    this.ownerService.getAll().subscribe(data=> {
      this.owners = data;
    })
  }

  getSelectedOwners($event){
    this.selectedOwners = $event;
  }

  removeListOfOwners(){
   if (this.selectedOwners[0]){
    this.carService.removeOwners(this.selectedOwners);
    this.ownerService.removeList(this.selectedOwners);
    this.message = "Please reload/refresh the page"
   } else {
     this.message = "There are no owners to delete";
   }
  }

  ngOnInit() {
    this.getOwners()
  }



}
