import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private userService:UserService, private router:Router) {}

  username:string = "";
  password:string = "";
  error:string = "";

  ngOnInit(): void {
   
  }


  login(){
  
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user && user.tip!="admin"){
        localStorage.setItem("ulogovan", user.kor_ime);
        this.router.navigate([user.tip]);
      }else{
        this.error = "Lose uneti podaci."
      }
    })
  }
}
