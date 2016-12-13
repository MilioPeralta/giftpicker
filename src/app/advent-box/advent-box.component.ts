import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-advent-box',
  templateUrl: './advent-box.component.html',
  styleUrls: ['./advent-box.component.css']
})
export class AdventBoxComponent implements OnInit {
  @Input()
  private content: String;

  constructor() {
  }

  ngOnInit() {
  }

}
