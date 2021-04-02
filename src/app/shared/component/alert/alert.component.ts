import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  show: boolean = false
  type: string
  msg: string

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.alertSettings$.subscribe(
      (data) => {
        this.type = data.type
        this.msg = data.msg
        this.show = true
        setTimeout( _ => {
          this.show = false
        }, 2000)
      }
    )
  }

  dismiss(){
    this.show = false
  }

}
