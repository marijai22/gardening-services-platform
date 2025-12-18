import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit{

  constructor(private userService:UserService, private router:Router){}

  ngOnInit(): void {
    
  }

  username:string = "";
  password:string = "";
  error:string = "";

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user && user.tip=="admin"){
        localStorage.setItem("ulogovan", user.kor_ime);
        this.router.navigate([user.tip]);
      }else{
        this.error = "Lose uneti podaci."
      }
    })
  }
}
