import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Ad} from '../model/Ad';
import {AdService} from '../services/ad.service';
import {Response} from '../model/Response';
import {User} from '../model/User';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public employees: Employee[];
  public editEmployee: Ad;
  public deleteEmployee: Ad;
  public annonces: Ad[];

  constructor(private employeeService: EmployeeService, private adService: AdService, private router: Router){}

  ngOnInit() {
    this.getMyAnnonces();
  }

  public getMyAnnonces(): void {
    const id =  localStorage.getItem('idUser');
    this.annonces = [ ];

    this.adService.getMyAnnonces(id).subscribe(

      (response: Response) => {
        console.log(response.data as Ad[]);
        response.data.forEach(value => {

          this.annonces.push(value[0] as Ad);
        });


      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
       // this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(ad: Ad): void {
    const id =  localStorage.getItem('idUser');
    ad.ad_fid = Number(id);
    ad.id_fid = Number(id);
    ad.id = this.editEmployee.id;
    this.adService.updateAd( ad, this.editEmployee.id ).subscribe(
      (response: Employee) => {
        this.getMyAnnonces();
     //   this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.adService.deleteAd(employeeId).subscribe(
      (response: Response) => {
        console.log(response);
        this.getMyAnnonces();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
     // this.getEmployees();
    }
  }

  public onOpenModal(employee: Ad, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

  logout(){
    localStorage.removeItem("idUser");
    this.router.navigateByUrl('/feed');
  }


  onAddAnnonce(addForm: Ad) {
    console.log(addForm);
    const id =  localStorage.getItem('idUser');
    console.log(id);
    addForm.ad_fid = Number(id);
    addForm.id_fid = Number(id);
    this.adService.addAnnonce(addForm).subscribe(
      (response: Response) => {
        this.getMyAnnonces();

      },
      (error: HttpErrorResponse) => {
       console.log(error);
      }
    );
    console.log(addForm);
  }
}
