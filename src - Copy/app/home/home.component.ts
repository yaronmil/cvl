import { UsersService } from './../users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(d => console.log(d));
  }
  ngOnDestroy(): void {
  }

}
