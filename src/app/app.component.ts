import { Component, OnInit } from '@angular/core';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ServiceRequest } from './service-request';
import { Buildings } from './buildings';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private requestid = '358589';
  private chkStatusresults: Subscription;
  private buildings: Buildings;
  private status: string;
  private serviceRequest: ServiceRequest;
  x;
  customerForm: FormGroup;
  title = 'app';
  panelOpenState: boolean = false;

  constructor(private fb: FormBuilder, private cityworksservice: CityworksService, private arcgisservice: ArcgisService) { }

  createForm() {
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      details: ''
    });
  }

  save(theform, isValid: boolean) {
    console.log('inside save form', theform.firstname);
  }

  ngOnInit(): void {
    // initialize our form
    this.createForm();

    // we should move this to another method that is only invoked when check status field is submitted
    this.arcgisservice.getFacilities().subscribe(
      mobojumbo => {  // we're subscribing to the returned value of getFacilities and we can call it whatever we want.
        console.log('data from buildings = ', (this.x = mobojumbo.features[0].geometry.x));
      },
      err => {
        console.log('some error happened');
      }
    );

    // TODO: we should move this to another method that is called from a button and only invoked when check status field is submitted
    this.cityworksservice.getServiceRequest(this.requestid).subscribe(
      ServiceRequest => {
        console.log(
          'status = ',
          (this.serviceRequest = ServiceRequest),
          (this.status = ServiceRequest.Value.Status)
        );
      },
      err => {
        console.log('some error happened');
      }
    );

  }

}
