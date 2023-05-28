import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {
  restId!: any;
  isAuth = false;
  userName: string = "";
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
     this.restId = +this.auth.getRestId();    
     this.showToolbarDetails();
  }

  showToolbarDetails(): void {
    let auth = this.auth.checkAuth();
    if (auth) {
      this.isAuth = true;
      this.userName = this.auth.getUserName();
    }else{
      this.isAuth = false;
      this.router.navigate(["/"]);
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.myVariable && !changes.myVariable.firstChange) {
  //     // Handle variable changes
  //     console.log('myVariable changed:', this.myVariable);
  //   }
  // }

}
