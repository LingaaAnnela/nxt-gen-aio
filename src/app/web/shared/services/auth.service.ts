import { Injectable } from "@angular/core";
import { CognitoAuthService } from "../../../services/cognito-auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  public redirectUrl: string | undefined;

  constructor(private cognitoAuthService: CognitoAuthService) {}

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.cognitoAuthService.isAuthenticated();
  }

  // Get current user
  getCurrentUser(): Observable<any> {
    return this.cognitoAuthService.getCurrentUser();
  }

  // Get authentication tokens
  getTokens(): Observable<any> {
    return this.cognitoAuthService.getTokens();
  }

  // Check if user has valid tokens
  hasValidTokens(): boolean {
    const tokens = this.cognitoAuthService.getStoredTokens();
    if (!tokens) return false;
    
    // Check if tokens exist and are not expired
    // This is a basic check - in production, you'd want to verify JWT expiration
    return !!(tokens.accessToken && tokens.idToken);
  }

  // Sign out
  signOut(): Observable<any> {
    return this.cognitoAuthService.signOut();
  }

  // Get pending phone number for OTP verification
  getPendingPhoneNumber(): string | null {
    return this.cognitoAuthService.getPendingPhoneNumber();
  }

  // Clear pending phone number
  clearPendingPhoneNumber(): void {
    this.cognitoAuthService.clearPendingPhoneNumber();
  }
}
