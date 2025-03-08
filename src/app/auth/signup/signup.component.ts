import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-signup',
  imports: [FormsModule,NgIf,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async signup() {
    try {
      console.log("📌 Attempting signup:", this.user);
      const response = await this.authService.signup(this.user);
      
      console.log("✅ Signup successful:", response);
      this.router.navigate(['/login']); // Redirect to login after successful signup
    } catch (error: any) {
      this.errorMessage = error; // Set the error message from backend
      console.error("❌ Signup failed:", this.errorMessage);
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }   
}