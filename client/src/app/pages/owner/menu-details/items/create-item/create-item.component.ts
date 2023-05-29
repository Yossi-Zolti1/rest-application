import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDetailsService } from 'src/app/services/menu-details.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  departmentId!:string
  constructor(public fb: FormBuilder, private menuService: MenuDetailsService, private route: Router
    ,private routes: ActivatedRoute) { }
    itemForm = this.fb.group({
      name:[''],
      description:[''],
      price:[],
      comment:['']
    })
    formData: FormData = new FormData();
  ngOnInit(): void {
    this.departmentId = this.routes.snapshot.paramMap.get('departmentId')!;
  }
  addItem(){
    this.formData.append('name', this.itemForm.controls['name'].value)
    this.formData.append('description', this.itemForm.controls['description'].value)
    this.formData.append('price', this.itemForm.controls['price'].value)
    this.formData.append('comment', this.itemForm.controls['comment'].value)
    this.formData.append('departmentId', this.departmentId)
    this.menuService.addItem(this.formData).subscribe(res => {
      debugger;
    })
  }
  onFileSelected(e: any) {
    this.formData.append('my', e.target.files[0])
  }
}
