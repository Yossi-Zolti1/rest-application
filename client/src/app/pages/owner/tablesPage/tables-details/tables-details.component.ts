import { Component } from '@angular/core';
import { TableDetailsService } from 'src/app/services/tables.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tables-details',
  templateUrl: './tables-details.component.html',
  styleUrls: ['./tables-details.component.css']
})
export class TablesDetailsComponent {

  items: { name: number, position: { x: number, y: number } }[] = [];

  constructor(private tableService: TableDetailsService, private route: Router
    , private routes: ActivatedRoute, private auth: AuthService,) { }

  tableNumber: number = 1;
  // public tables$ = this.tableService.getTables(this.auth.getRestId());

  ngOnInit(): void {
    this.getTablesDetails();
  }

  createNewItem() {
    const newItem = {
      name: this.tableNumber++,
      position: { x: 0, y: 0 } // Initial position
    };
    this.items.push(newItem);
    
  }

  updateItemPosition(item: any, event: any) {
    console.log(item.position);
    item.position = { x: event.source._dragRef._passiveTransform.x, y: event.source._dragRef._passiveTransform.y };
  }

  saveTables(){
    let  restId: string =  this.auth.getRestId();


    this.tableService.addTables(this.items, restId).subscribe(res => {
      if(res === 400 || res === 403){
        alert('ההוספה נכשלה')
      }
      else{
        console.log("success");
        
      }
    })
  }

  getTablesDetails(){
    
    let  restId: string =  this.auth.getRestId();

    this.tableService.getTables(restId).subscribe(res => {
      if(res === 400 || res === 403){
        alert('קבלת הנתונים נכשלה נכשלה')
      }
      else{
        
        console.log(res);
        
          
        
      }
      
    })

  }


}

