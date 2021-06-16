import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Configuration } from '../../../models/configuration';

@Component({
  selector: 'node-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public emailTo: string;

  constructor(private configService: ConfigService,
  ) { }

  onMethod() {
  }

  ngOnInit(): void {
    this.emailTo = this.configService.getConfiguration().emailTo;

  }

}
