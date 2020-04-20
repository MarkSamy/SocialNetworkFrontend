import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BlockedComponent } from '../blocked/blocked.component';
import { AdsComponent } from '../ads/ads.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BlockedComponent) private blockedComponent: BlockedComponent;
  @ViewChild(AdsComponent) private adsComponent: AdsComponent;

  constructor() { }

  ngOnInit(): void {
  }
  onTabChanged(event: MatTabChangeEvent) {
    if (event.index == 1) {
      this.adsComponent.refresh();//Or whatever name the method is called
    }
    else if (event.index == 2) {
      this.blockedComponent.refresh(); //Or whatever name the method is called
    }
  }

}
