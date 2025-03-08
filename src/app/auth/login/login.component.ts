import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common'; 




@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule,NgIf,CommonModule] 
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      console.log("🔐 Attempting login:", this.user);
      const response = await this.authService.login(this.user);
      
      console.log("✅ Login successful:", response);
      localStorage.setItem('token', response.token); // Store JWT
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    } catch (error: any) {
      this.errorMessage = error; // Set the error message from backend
      console.error("❌ Login failed:", this.errorMessage);
    }
  }
  goToSignup() {
    this.router.navigate(['/signup']);
  }   
}
