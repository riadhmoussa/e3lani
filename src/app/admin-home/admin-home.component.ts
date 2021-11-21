import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Response} from "../model/Response";
import {Ad} from "../model/Ad";
import {AdService} from "../services/ad.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public annonces: Ad[];
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService, private adService: AdService, private router: Router){}

  ngOnInit() {
   this.getAnnonces()
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

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = [{
          id: 1, name: '', email : '', jobTitle: '', phone: '', imageUrl: '', employeeCode: ''
        },
          {
            id: 2, name: '', email : '', jobTitle: '', phone: '', imageUrl: '', employeeCode: ''
          },
          {
            id: 3, name: '', email : '', jobTitle: '', phone: '', imageUrl: '', employeeCode: ''
          } ];
        console.log(this.employees);
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
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  logout(){
    localStorage.removeItem("idUser");
    this.router.navigateByUrl('/feed');
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.adService.deleteAd(employeeId).subscribe(
      (response: Response) => {
        console.log(response);
        this.getAnnonces()
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
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee, mode: string): void {
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
}
