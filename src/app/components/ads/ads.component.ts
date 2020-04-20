import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ads } from 'src/app/models/ads';
import { AdsService } from 'src/app/services/ads.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  public ad: Ads;
  isGreater: string;

  @ViewChild('myInput') myInputVariable: ElementRef;

  constructor(private adsService: AdsService,
    private toastr: ToastrService,
    private router: Router) {
    this.ad = new Ads("", "", "", false, "");
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.isGreater == "1") {
      this.ad.isgreater = null;
    } else if (this.isGreater == "2") {
      this.ad.isgreater = true;
    } else if (this.isGreater == "3") {
      this.ad.isgreater = false;
    }
    this.adsService.addAds(this.ad).subscribe(
      response => {
        this.toastr.success("Advertisment added")

        console.log(response);
        this.refresh();
      },
      error => {
        this.toastr.error("Error in adding the advertisment")

        console.log(<any>error);
      }
    );
  }

  image: File = null;
  onFileSelected(event, ad) {
    this.image = <File>event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = function () {
      ad.image = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  refresh() {
    this.ad.body = '';
    this.ad.location = '';
    this.myInputVariable.nativeElement.value = '';
    this.ad.age = '';
    this.isGreater = '';
    this.ad.image = '';
  }
}
