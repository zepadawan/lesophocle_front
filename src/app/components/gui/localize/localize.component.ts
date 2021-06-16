import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';

import { GoogleMap, MapMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'node-localize',
  templateUrl: './localize.component.html',
  styleUrls: ['./localize.component.css']
})
export class LocalizeComponent implements OnInit {
  height = "500px";
  width = "100%";
  zoom = 15;
  center;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 15,
  };

  marker = new google.maps.Marker();
  markers: any = [];

  click(event: google.maps.MapMouseEvent) {
    console.log(event)
  }

  addMarker() {
    this.marker.setPosition({
      lat: 43.60920000523757,
      lng: 7.07372001701674,
    })
    this.marker.setOpacity(1.0);
    this.marker.setLabel({
      color: 'red',
      text: 'Le sophocle',
    })
    this.marker.setTitle('Marker title ');
    this.marker.setOptions({
      animation: google.maps.Animation.BOUNCE,
      draggable: true,
      icon: "./icons/4.png",
      label: "Le sophocle",
      cursor: "14px",
      title: "tutu"
    });
    this.markers.push(this.marker);
  }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: 43.60920000523757,
        lng: 7.07372001701674,

      }
    })
    this.addMarker();
  }

}

