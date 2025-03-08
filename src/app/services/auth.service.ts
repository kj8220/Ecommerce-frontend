import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';  // Base API URL

  constructor(private http: HttpClient) {}

  // ✅ Login method
  async login(user: any): Promise<any> {
    return this.handleAuthRequest(`${this.apiUrl}/login`, user);
  }

  // ✅ Signup method
  async signup(user: any): Promise<any> {
    return this.handleAuthRequest(`${this.apiUrl}/register`, user);
  }

  // 🔄 Reusable function for handling authentication requests
  private async handleAuthRequest(endpoint: string, user: any): Promise<any> {
    try {
      console.log(`📡 Sending API request to ${endpoint}:`, user);

      const response = await firstValueFrom(
        this.http.post<any>(endpoint, user).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error("❌ API Error:", error);
            return throwError(() => this.getErrorMessage(error)); 
          })
        )
      );

      console.log("✅ API Response:", response);
      return response;
    } catch (error: any) {
      console.error("❌ AuthService Error:", error);
      throw error;  // Re-throw error for component handling
    }
  }

  // 🔹 Extract meaningful error messages
  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return "❌ Network error! Please check your connection.";
    } else if (error.status === 400) {
      return error.error.message || "Invalid request!";
    } else if (error.status === 401) {
      return "⛔ Unauthorized! Invalid credentials.";
    } else if (error.status === 409) {
      return error.error.message || "⚠️ User already exists!";
    } else {
      return "❌ Something went wrong! Please try again.";
    }
  }
}
