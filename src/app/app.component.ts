import { Component } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vaccine-assist';
  dataGot = false;
  items=[];
  validPincode = true;
  date;
  pincode;
  model: NgbDateStruct;
  showLoader=false;;
constructor(private apiService:ApiServiceService){}
  getSchedule(){
    this.showLoader = true;
    this.apiService.getData(this.pincode, this.date).subscribe(res=>{
      if(res){
        this.showLoader = false;
        this.items = res.sessions;
        if(this.items.length){
        this.dataGot = true;
        }else{
          this.dataGot = false;
        }
      }
    },error=>{
      this.showLoader = false;
      this.dataGot = false;
    })
   }
   validatePinCode(ev){
    this.pincode = ev;
    if(ev===''){
      this.validPincode = true;
      return;
    }
    var a = /(^\d{6}$)/;  
    if (a.test(this.pincode)){
     this.validPincode = true;
    }
    else{
      this.validPincode = false;
    }
   }

   validateDate(ev){
    this.date = moment([ev.year, ev.month-1, ev.day]).format('DD/MM/YYYY');
   }
}

