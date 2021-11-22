import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {AdService} from '../services/ad.service';
import {Response} from '../model/Response';
import {Ad} from '../model/Ad';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {SearchadPipe} from "../pipes/searchad.pipe";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public annonces: Ad[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  queryString: any;

  constructor(private adService: AdService, private router: Router){}

  ngOnInit() {
    this.getAnnonces();
  }

  public getAnnonces(): void {
    this.adService.getAnnonces().subscribe(
      (response: Response) => {
        console.log(response.data as Ad[])
        this.annonces = response.data as Ad[];

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goToSignIn(){
    this.router.navigateByUrl('/signin');

  }
  goToSignUp(){
    this.router.navigateByUrl('/signup');

  }


}

