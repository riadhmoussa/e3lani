import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Response} from '../model/Response';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  LogIn(value: User) {
    this.userService.LoginIn(value).subscribe((response: Response) => {
      if (response.message === 'false'){
        this.toastr.error('E-mail ou mot de passe incorrect');

      }else{
        localStorage.setItem('idUser', String((response.data.user as User).id));
        this.toastr.success('Connectez-vous avec succès');
        console.log(value.email);
        if (value.email === 'admin@admin.com'){
          this.router.navigateByUrl('/admin');


        }else{
          this.router.navigateByUrl('/home');

        }

      }
      console.log(response.message);
    });
    console.log(value);
  }
}
