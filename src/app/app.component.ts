import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FilterDataFromExcel';
  isExpanded = false;
  constructor(private router: Router){

  }
  goToList(){
    this.router.navigate(['dashboard/list']);
  }

  changeView(){
    this.isExpanded = !this.isExpanded;
  }
}
 