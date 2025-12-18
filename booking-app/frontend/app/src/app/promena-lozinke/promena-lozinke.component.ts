import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  username: string = "";
  oldPass: string = "";
  newPass: string = "";
  repeatedNewPass: string = "";
  error: string = "";

  checkPassword(password: string) {
    const passwordRegex = /^(?=[A-Za-z])(?=(?:.*[a-z]){3})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return passwordRegex.test(password);
  }

  changePass() {
    if (!this.oldPass || !this.newPass || !this.repeatedNewPass) {
      this.error = "Nisu uneti svi podaci";
      return;
    }
    if (!this.checkPassword(this.oldPass) || !this.checkPassword(this.newPass) || !this.checkPassword(this.repeatedNewPass)) {
      this.error = "Lozinka nije u dobrom formatu.";
      return;
    }


    // da li za tog korisnika postoji taj oldPass u bazi - ali je tamo sifrovan bcrypt
    if (this.oldPass === this.newPass) {
      this.error = "Nova lozinka je ista kao stara."
      return;
    }
    if (this.newPass != this.repeatedNewPass) {
      this.error = "Nova i ponovljena lozinka nisu iste."
      return;
    } else {
      this.userService.checkPass(this.username, this.oldPass).subscribe(ok => {
        if (ok['message'] == 'not') {
          this.error = "Nije dobra uneta sifra za ovaj korisnicki nalog."
          return;
        }
      })
      this.userService.changePass(this.username, this.oldPass, this.newPass).subscribe((user: User) => {
        if(user&& user.tip == 'admin'){
          this.router.navigate(['loginadmin']);
        }
        else if(user&& (user.tip == 'vlasnik' || user.tip == 'dekorater')){
          this.router.navigate(['']);
        }
      })
    }
  }
}
