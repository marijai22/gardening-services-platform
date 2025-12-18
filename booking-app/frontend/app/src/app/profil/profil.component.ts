import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  constructor(private userService:UserService, private router:Router){}

  korisnik: User = new User();
  newName: string = "";
  newSurname:string = "";
  newAddress:string = "";
  newMail:string = "";
  newNumber:string = "";
  newCardNumber:string = "";
  error:string = "";
  invalidState: boolean = false;

  ngOnInit(): void {
    let userN = localStorage.getItem("ulogovan");
    this.userService.getUser(String(userN)).subscribe((user:User) =>{
      this.korisnik = user;
      this.newName = this.korisnik.ime;
      this.newSurname = this.korisnik.prezime;
      this.newAddress = this.korisnik.adresa;
      this.newMail = this.korisnik.mejl;
      this.newNumber = this.korisnik.telefon;
      this.newCardNumber = this.korisnik.tip == "vlasnik"?this.korisnik.broj_kartice: "";
      this.checkCardNumber(this.newCardNumber);
    })
  }

  checkPhoneNumber(phoneNumber:string){
    const phoneRegex = /^\+3816\d{8}$/;
    return phoneRegex.test(phoneNumber);

  }

  
  showIcon(type: string) {
    const iconElement = document.getElementById('card');
    if (iconElement) {
      iconElement.className = 'icon'; 

      if (type === 'diners') {
        iconElement.classList.add('diners');
      } else if (type === 'master') {
        iconElement.classList.add('master');
      } else if (type === 'visa') {
        iconElement.classList.add('visa');
      } else {
        iconElement.classList.remove('diners', 'master', 'visa');
      }

      if (type !== 'Invalid') {
        iconElement.classList.add('show');
      } else {
        iconElement.classList.remove('show');
      }
    }
  }

  checkCardNumber(cardNumber: string) {
    const diners = [300, 301, 302, 303, 36, 38];
    const master = [51, 52, 53, 54, 55];
    const visa = [4539, 4556, 4916, 4532, 4929, 4485, 4716];

    for (let prefix of diners) {
      if (cardNumber.startsWith(prefix.toString()) && cardNumber.length === 15) {
        this.showIcon("diners");
        this.invalidState = false;
        return "Diners";
      }
    }

    for (let prefix of master) {
      if (cardNumber.startsWith(prefix.toString()) && cardNumber.length === 16) {
        this.showIcon("master");
        this.invalidState = false;
        return "MasterCard";
      }
    }

    for (let prefix of visa) {
      if (cardNumber.startsWith(prefix.toString()) && cardNumber.length === 16) {
        this.showIcon("visa");
        this.invalidState = false;
        return "Visa";
      }
    }

    this.showIcon("Invalid");
    this.invalidState = true;
    return;
  }

  update(){

    if (!this.checkPhoneNumber(this.newNumber)) {
      this.error = "Broj nije u dobrom formatu.";
      return; 
    }

    this.checkCardNumber(this.newCardNumber);
    if (this.invalidState) {
      this.error = "Broj kartice nije u dobrom formatu.";
      return; 
    }

    this.userService.update(this.korisnik.kor_ime, this.newName, this.newSurname, this.newAddress, this.newMail, this.newNumber, this.newCardNumber).subscribe(ok =>{
      if(ok['message'] == 'ok'){
        this.ngOnInit();
      }else{
        this.error = "Podaci nisu uspesno azurirani";
      }
    })
  }
}
