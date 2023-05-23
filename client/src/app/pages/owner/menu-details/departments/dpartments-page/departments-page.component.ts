import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css']
})
export class DepartmentsPageComponent implements OnInit {
  title:string = 'הוסף מחלקות לתפריט שלך'
  buttonText: string = 'הוסף מחלקה'
  route: string = '/add-department'
  constructor() { }

  ngOnInit(): void {
  }

}
