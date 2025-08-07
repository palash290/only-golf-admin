import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ValidationErrorService } from '../../services/validation-error.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SubmitButtonComponent } from '../shared/submit-button/submit-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SubmitButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Form: FormGroup;
  atValues: any;
  htmlText: string = '';
  isLoading: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService, private route: Router,
    private service: CommonService
  ) {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      this.isLoading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('email', this.Form.value.email);
      formURlData.set('password', this.Form.value.password);
      this.service.post('admin/login', formURlData.toString()).subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.service.setToken(resp.data);
            // this.toastr.success(resp.message);
            this.isLoading = false;
            this.route.navigateByUrl('/home/dashboard')
          } else {
            // this.toastr.warning(resp.message);
            this.isLoading = false;
          }
        },
        error: (error) => {
          this.isLoading = false;
          // this.toastr.warning(error || 'Something went wrong!');
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


}
