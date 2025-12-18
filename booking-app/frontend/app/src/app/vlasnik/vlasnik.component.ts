import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vlasnik',
  templateUrl: './vlasnik.component.html',
  styleUrls: ['./vlasnik.component.css']
})
export class VlasnikComponent implements OnInit{

  constructor(private userService:UserService, private router:Router){}

  korisnik: User = new User();

  ngOnInit(): void {
    this.router.navigate(['profil']);
  }
}
