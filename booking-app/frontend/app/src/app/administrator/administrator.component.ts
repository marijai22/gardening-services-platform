import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ZahtevRegService } from '../zahtev-reg.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit{

  constructor(private userService:UserService, private router:Router, private zahtevService: ZahtevRegService){}

  owners:User[] = [];
  decoraters:User[] = [];
  requests:User[] = [];

  ngOnInit(): void {
    this.userService.getAllByType("vlasnik").subscribe((vlasnici:User[]) => {
      this.owners = vlasnici;
    })

    this.userService.getAllByType("dekorater").subscribe((dekorateri:User[]) => {
      this.decoraters = dekorateri;
    })

    this.zahtevService.getAllByStatus("neobradjen").subscribe((reqs:User[]) => {
      this.requests = reqs;
    })
  }

  updateUser(user:User){
    localStorage.setItem("korisnikZaIzmenu", JSON.stringify(user));
    this.router.navigate(['izmenaPodataka']);
  }

  accept(user:User){
    this.userService.addUser(user).subscribe(ok => {
      if(ok['message'] == 'ok'){ // da li mozda ovde treba nesto ako jedno uspe, a drugo ne
        this.zahtevService.removeUser(user).subscribe(ok => {
          if(ok['message'] == 'ok'){
            this.ngOnInit();
          }
        })
      }
    })

  }

  deny(user:User){
    this.zahtevService.deny(user).subscribe(ok => {
      if(ok['message'] == 'ok'){
        this.ngOnInit();
      }
    })
  }

}
