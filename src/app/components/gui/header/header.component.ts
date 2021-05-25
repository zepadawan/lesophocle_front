import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'node-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Input() isAuth = false;
  @Input() user: any;
  @Input() isAdmin = false;
  @Input() isSuperArmin = false;

  refApiImages = environment.api_image;

  constructor() { }

  ngOnInit(): void {
  }

}
