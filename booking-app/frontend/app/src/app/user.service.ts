import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  url = 'http://localhost:4000/user'

  login(username:string, password:string){
    const data = {
      username:username,
      password:password
    }
   return this.http.post<User>(`${this.url}/login`, data);
  }

  getUser(username:string){
    const data = {
      username:username
    }
   return this.http.post<User>(`${this.url}/getUser`, data);
  }

  getUserNames(){
   return this.http.get<string[]>(`${this.url}/getUserNames`);
  }

  getEmail(){
    return this.http.get<string[]>(`${this.url}/getEmail`);
   }

   checkPass(username:string, oldPass:string){
    const data = {
      username:username,
      oldPass:oldPass
    }
   return this.http.post<{message:string}>(`${this.url}/checkPass`, data);
  }

  changePass(username:string, oldPass:string, newPass:string){
    const data = {
      username:username,
      oldPass:oldPass,
      newPass:newPass,
    }
   return this.http.post<User>(`${this.url}/changePass`, data);
  }

  update(username:string, newName:string, newSurname:string, newAddress:string, newMail:string, newNumber:string, newCardNumber:string){
      const data = {
        username:username,
        newName:newName,
        newSurname:newSurname,
        newAddress:newAddress,
        newMail:newMail,
        newNumber:newNumber,
        newCardNumber:newCardNumber
      }
      return this.http.post<{message: string}>(`${this.url}/update`, data);
  }

  getAllByType(tip:string){
    const data = {
      tip:tip
    }
   return this.http.post<User[]>(`${this.url}/getAllByType`, data);
  }

  updateUserInfo(oldUser:User, updatedUser:User){
    const data = {
      oldUser:oldUser,
      updatedUser:updatedUser
    }
   return this.http.post<{message:string}>(`${this.url}/updateUserInfo`, data);
  }

  addUser(user:User){
    const data = {
      user:user
    }
   return this.http.post<{message:string}>(`${this.url}/addUser`, data);
  }
}
