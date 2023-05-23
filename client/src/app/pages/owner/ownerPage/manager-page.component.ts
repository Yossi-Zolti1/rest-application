import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})
export class ManagerPageComponent implements OnInit {
  restId!: any;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
     this.restId = +this.auth.getRestId();    
    
  }

  logout(): void {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }

}
