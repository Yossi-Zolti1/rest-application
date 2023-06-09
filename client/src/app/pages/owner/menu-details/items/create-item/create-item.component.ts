import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDetailsService } from 'src/app/services/menu-details.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { AddRestaurantDetails } from 'src/app/state/restaurant.state';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  departmentId!:string
  itemId!:string
  imageUrl!:string | null
  isItemExist:boolean = false
  isAuth = false;
  userName: string = "";
  constructor(public fb: UntypedFormBuilder, private menuService: MenuDetailsService, private route: Router
    ,private routes: ActivatedRoute, private auth: AuthService, private store:Store) { }
    itemForm = this.fb.group({
      name:[''],
      description:[''],
      price:[],
      comment:['']
    })
    formData: FormData = new FormData();
  ngOnInit(): void {
    this.showToolbarDetails();
    this.departmentId = this.routes.snapshot.paramMap.get('departmentId')!;
    this.itemId = this.routes.snapshot.paramMap.get('itemId')!;
    console.log(this.itemId);
    
    if(this.itemId != null){
      this.menuService.getSingleItem(+this.itemId).subscribe(res => {
        this.itemForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          comment: res.comment
        })
        if(res.image){
          this.imageUrl = environment.baseUrl + res.image!
        }
        this.isItemExist = true
      })
    }
  }
  addItem(){
    this.formData.append('name', this.itemForm.controls['name'].value)
    this.formData.append('description', this.itemForm.controls['description'].value)
    this.formData.append('price', this.itemForm.controls['price'].value)
    this.formData.append('comment', this.itemForm.controls['comment'].value)
    this.formData.append('departmentId', this.departmentId)
    this.menuService.addItem(this.formData).subscribe(res => {
      if(res === 400 || res === 403){
        alert('ההוספה נכשלה')
      }
      else{
        this.menuService.getRestDetails(+this.auth.getRestId()).subscribe(res => {
          this.store.dispatch(new AddRestaurantDetails({
            restaurant: res
          }))
        })
        this.route.navigate([`items-page/${this.departmentId}`]);
      }
    })
  }
  updateItem(){
    this.formData.append('name', this.itemForm.controls['name'].value)
    this.formData.append('description', this.itemForm.controls['description'].value)
    this.formData.append('price', this.itemForm.controls['price'].value)
    this.formData.append('comment', this.itemForm.controls['comment'].value)
    this.formData.append('departmentId', this.departmentId)
    this.formData.append('itemId', this.itemId)
    this.menuService.updateItem(this.formData).subscribe(res => {
      if(res === 400 || res === 403){
        alert('העדכון נכשלה')
      }
      else{
        this.menuService.getRestDetails(+this.auth.getRestId()).subscribe(res => {
          this.store.dispatch(new AddRestaurantDetails({
            restaurant: res
          }))
        })
        this.route.navigate([`items-page/${this.departmentId}`]);
      }
    })
  }
  onFileSelected(e: any) {
    this.formData.append('my', e.target.files[0])
  }


  showToolbarDetails(): void {
    let auth = this.auth.checkAuth();
    if (auth) {
      this.isAuth = true;
      this.userName = this.auth.getUserName();
    }else{
      this.isAuth = false;
      this.route.navigate(["/"]);
    }
  }

}
