import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ZahtevRegService } from '../zahtev-reg.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private zahtevReg: ZahtevRegService) { }

  userNames: string[] = [];
  emails: string[] = [];
  selectedFile: File | null = null;
  deniedUsernames: string[] = [];
  deniedEmails: string[] = [];

  ngOnInit(): void {
    this.userService.getUserNames().subscribe((usernames:string[]) => {
        this.userNames = usernames;
        this.zahtevReg.getUserNames().subscribe((names:string[]) => {
          this.userNames.push(...names);
        })
     })

     this.userService.getEmail().subscribe((emails:string[]) => {
        this.emails = emails;
        this.zahtevReg.getEmail().subscribe((mails:string[]) => {
          this.emails.push(...mails);
        })
     })

     this.zahtevReg.getDeniedUsernames().subscribe((usernames:string[]) => {
        this.deniedUsernames = usernames;
    })

    this.zahtevReg.getDeniedEmails().subscribe((emails:string[]) => {
      this.deniedEmails = emails;
  })

     this.onFileSelected(null);
  }

  username: string = "";
  password: string = "";
  name: string = "";
  surname: string = "";
  pol: string = "";
  address: string = "";
  number: string = "";
  email: string = "";
  profilePicture: string = "";
  cardNumber: string = "";
  error: string = "";

  invalidState: boolean = false;

  isFilled(){
    if (this.username && this.password && this.name && this.surname && this.pol && this.address.trim() && this.number && this.email && this.cardNumber) {
      return true;
    }
    return false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // Preuzmi odabranu sliku
    if (file) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file); // Kreiraj URL za učitavanje slike

      img.onload = () => {
        if ((img.width >= 100 && img.width <= 300) && (img.height >= 100 && img.height <= 300)) {
          this.selectedFile = file; // Postavi selektovani fajl
          this.error = ''; // Očisti grešku
        } else {
          this.error = 'Dimenzije slike moraju biti izmedju 100x100 i 300x300 piksela';
          this.selectedFile = null;
        }
        URL.revokeObjectURL(objectUrl); // Oslobodi URL nakon provere
      };
      img.src = objectUrl; // Učitaj sliku iz object URL
    }else {
      this.selectedFile = null; // Ako nije odabrana nijedna slika, postavi na null
  }
  }

  


  async uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await this.zahtevReg.upload(formData).toPromise();
      if (response.message === 'ok' && response.filePath) {
        this.profilePicture = response.filePath; // Obezbeđuješ tačnu putanju slike
      } else {
        this.error = "Greška u otpremanju slike.";
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.error = 'Greška u otpremanju slike: ' + error.message;
      } else {
        this.error = 'Greška u otpremanju slike.';
      }
    }
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

  checkPassword(password: string) {
    const passwordRegex = /^(?=[A-Za-z])(?=(?:.*[a-z]){3})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  return passwordRegex.test(password);
  }

  checkPhoneNumber(phoneNumber:string){
    const phoneRegex = /^\+3816\d{8}$/;
    return phoneRegex.test(phoneNumber);

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

  async register() {
    this.error = "";
    this.invalidState = false;
    let uniqueUsername = this.userNames.some(usern => this.username === usern);
    let uniqueEmails = this.emails.some(e => this.email === e);

    let deniedUserN = this.deniedUsernames.some(usern => this.username === usern);
    let deniedEmail = this.deniedEmails.some(e => this.email === e);

    if (!this.isFilled()) {
      this.error = "Nisu popunjeni svi podaci";
      return; 
    }
    
    if(uniqueUsername){this.error = "Korisnickon ime je zauzeto. Probajte neko drugo."; return;}
    if(uniqueEmails){this.error = "Mejl adresa se vec koristi za drugi nalog. Iskoristite neku drugu mejl adresu."; return;}
    if(deniedUserN){this.error = "Korisnicko ime nije dozvoljeno. Probajte neko drugo."; return;}
    if(deniedEmail){this.error = "Mejl adresa nije dozvoljena. Probajte neko drugu."; return;}

    if (!this.checkPassword(this.password)) {
      this.error = "Lozinka nije u dobrom formatu.";
      return; 
    }

    if (!this.checkPhoneNumber(this.number)) {
      this.error = "Broj nije u dobrom formatu.";
      return; 
    }
  
    this.checkCardNumber(this.cardNumber);
    if (this.invalidState) {
      this.error = "Broj kartice nije u dobrom formatu.";
      return; 
    }

    if (this.selectedFile) {
      console.log("Započinjem otpremanje slike...");
      await this.uploadProfilePicture(this.selectedFile);
      if (this.error) { // Ako je došlo do greške tokom otpremanja slike
        console.error('Registracija prekinuta zbog greške u otpremanju slike.');
        this.selectedFile = null;
        return;
      }
    } else {
      this.profilePicture = 'defaultProfilePicture.png'; 
    }

    this.zahtevReg.register(this.username, this.password, this.name, this.surname, this.pol, this.address, this.number,this.email, this.profilePicture, this.cardNumber).subscribe(ok =>{
      if(ok['message']!= 'ok'){
        this.error = 'Zahtev za registraciju nije poslat';
      }else{
        this.error = 'Zahtev za registraciju je poslat';

        this.username = "";
        this.password = "";
        this.name = "";
        this.surname = "";
        this.pol = "";
        this.address = "";
        this.number = "";
        this.email = "";
        this.profilePicture = "";
        this.cardNumber = "";
        this.selectedFile = null;
        this.error = "";

        const iconElement = document.getElementById('card');
        if (iconElement) {
          iconElement.className = 'icon'; // Ukloni sve klase vezane za ikonu
          iconElement.classList.remove('diners', 'master', 'visa', 'show');
        }
        
        window.location.reload();

        this.ngOnInit();
      }
    })
  }
}
