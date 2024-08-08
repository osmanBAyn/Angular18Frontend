import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { UserService } from '../user.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const userService = inject(UserService);
  await userService.reload();
  console.log(userService.userData());
  if(userService.userData()){
    return true;
  }
  router.navigate(['', 'login']);
  return false
  // let isAuth = false;
  // await http.get("http://localhost:3000/users/isAuthenticated",{withCredentials: true}).forEach((val)=>{
  //   if(val instanceof HttpErrorResponse){
  //     isAuth = false;
  //   }
  //   isAuth = true;
  // })
  // return isAuth;
};
