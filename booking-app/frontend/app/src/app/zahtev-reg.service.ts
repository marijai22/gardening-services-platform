import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class ZahtevRegService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost:4000/zahtevReg'

  register(username:string, password:string, name: string, surname:string, pol:string, address:string, number:string, email:string, profilePicture:string, cardNumber:string){
    const data = {
      username:username,
      password:password,
      name:name,
      surname:surname,
      pol:pol,
      address:address,
      number:number,
      email:email,
      profilePicture:profilePicture,
      cardNumber:cardNumber
    }
   return this.http.post<{message: string}>(`${this.url}/register`, data);
  }

  upload(formData: FormData){
    const data = {}
    return this.http.post<any>(`${this.url}/upload`, formData);
  }

  getAllByStatus(status:string){
    const data = {
      status:status
    }
    return this.http.post<User[]>(`${this.url}/getAllByStatus`, data);
  }

  removeUser(user:User){
    const data = {
      user:user
    }
    return this.http.post<{message:string}>(`${this.url}/removeUser`, data);
  }

  getUserNames(){
    return this.http.get<string[]>(`${this.url}/getUserNames`);
   }
 
  getEmail(){
     return this.http.get<string[]>(`${this.url}/getEmail`);
  }
  
  deny(user:User){
    const data = {
      user:user
    }
    return this.http.post<{message:string}>(`${this.url}/deny`, data);
  }

  getDeniedUsernames(){
    return this.http.get<string[]>(`${this.url}/getDeniedUsernames`);
   }

   getDeniedEmails(){
    return this.http.get<string[]>(`${this.url}/getDeniedEmails`);
  }
}
