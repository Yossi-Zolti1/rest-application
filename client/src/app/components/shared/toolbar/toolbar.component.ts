import { Component, OnInit , HostListener, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  basketQuantity: number = 2;
   @Input() isAuth = false;
   @Input() userName = "";

  isPhoneScreen: boolean = false;

  ngOnInit(): void {    
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isPhoneScreen = window.innerWidth < 500;
  }

  logout() {
    this.auth.logOut();
    const currentUrl = this.router.url;
    if (currentUrl === "/") {
       window.location.reload();
    }else{
      this.router.navigate(["/"]);
    }
  }


  sendVith() {
    // Implement your sendvith logic here
  }
}
