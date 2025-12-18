import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-dekorater',
  templateUrl: './dekorater.component.html',
  styleUrls: ['./dekorater.component.css']
})
export class DekoraterComponent implements OnInit{

  constructor(private userService:UserService, private router:Router){}

  korisnik: User = new User();

  ngOnInit(): void {
    this.router.navigate(['profil']);
  }
}
