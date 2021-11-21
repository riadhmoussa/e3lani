import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {EmployeeService} from '../employee.service';
import {UserService} from '../services/user.service';
import {Employee} from '../employee';
import {Response} from '../model/Response';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submit(value: User){
    console.log(value);
    value.etat = 'user';
    console.log(value);
    this.userService.Register(value).subscribe((response: Response) => {
      localStorage.setItem('idUser', String((response.data as User).id));
      this.toastr.success('Inscrivez-vous avec succès');

      if (value.email === 'admin@admin.com'){
        this.router.navigateByUrl('/admin');


      }else{
        this.router.navigateByUrl('/home');

      }

    });

  }

}
