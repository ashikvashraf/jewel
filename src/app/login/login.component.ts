import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { error } from '@angular/compiler/src/util';
import { AuthenticationService } from './authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('usForm') usForm: NgForm;

  loginForm: any = {};
  result: any = {};
  returnUrl: string;
  error = '';
  loading = false;

  constructor(
    public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onSubmit() {
    this.loginForm = this.usForm.value;
    console.log(this.loginForm);
    this.loading = true;
    this.authenticationService
      .login(this.loginForm)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
          alert(data.message);
        },
        (error) => {
          this.error = error;
          this.loading = false;
          console.log(error);
          alert(error.error.message);
        }
      );

    // this.dataservice.Login(this.loginForm).subscribe(
    //   (result) => {
    //     console.log('login', result);
    //     this.result = result;
    //     if (this.result.status === 200) {
    //       localStorage.setItem('token', this.result.body.jwt);
    //       localStorage.setItem('user_id', this.result.body.user.id);
    //       localStorage.setItem('user_name', this.result.body.user.name);
    //       localStorage.setItem(
    //         'emp_typeid',
    //         this.result.body.user.employee_type.id
    //       );
    //       localStorage.setItem(
    //         'emp_type',
    //         this.result.body.user.employee_type.name
    //       );
    //       localStorage.setItem(
    //         'company_name',
    //         this.result.body.user.company.name
    //       );
    //       localStorage.setItem('company_id', this.result.body.user.company.id);
    //       localStorage.setItem('isLoggedIn', true);
    //       this.router.navigate(['dashboard']);
    //     }
    //   },
    //   (error) => {
    //     console.log('error caught in component', error);
    //   }
    // );
  }
}
