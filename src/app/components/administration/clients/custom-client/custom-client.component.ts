import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'node-custom-client',
  templateUrl: './custom-client.component.html',
  styleUrls: ['./custom-client.component.css']
})
export class CustomClientComponent implements OnInit, OnChanges {

  @Input() clientForm : FormGroup;
  @Input() client :Client;

  constructor( ) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }


}
