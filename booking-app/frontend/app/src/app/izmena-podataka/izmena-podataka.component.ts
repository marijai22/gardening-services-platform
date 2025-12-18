import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-izmena-podataka',
  templateUrl: './izmena-podataka.component.html',
  styleUrls: ['./izmena-podataka.component.css']
})
export class IzmenaPodatakaComponent implements OnInit{

  constructor(private userService:UserService, private router:Router){}

  korisnik: User = new User();
  oldUser: User = new User(); 
  oldUsername:string = "";
  error:string = "";

  ngOnInit(): void {
    let user = localStorage.getItem("korisnikZaIzmenu");
    if(user){
      this.oldUser = JSON.parse(user);
      this.oldUsername = this.oldUser.kor_ime;
    }
  }

  updateUserInfo(){
    const updatedUser: User = { ...this.oldUser };

    // Dinamički ažuriramo samo ona polja iz korisnik koja nisu prazna
    Object.keys(this.korisnik).forEach(key => { //['kor_ime', 'ime', 'prezime', ...]
      const value = (this.korisnik as any)[key];  
      if (value) { 
        (updatedUser as any)[key] = value;
      }
     });

     if (!this.korisnik.lozinka) {
      updatedUser.lozinka = this.oldUser.lozinka; // Ako lozinka nije uneta, postavi prazno
    }

    this.userService.updateUserInfo(this.oldUser, updatedUser).subscribe(ok => {
      if(ok['message'] == 'ok'){
        console.log("Do ovde.")
        this.router.navigate(['admin']);
      }else{
        this.error = "Azuriranje podataka nije uspelo.";
      }
    })
  }
}
