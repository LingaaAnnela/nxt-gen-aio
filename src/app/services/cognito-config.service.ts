import { Injectable } from '@angular/core';
import { environment } from '../../public/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoConfigService {
  
  constructor() {}

  getConfig() {
    return {
      region: environment.cognito.region,
      userPoolId: environment.cognito.userPoolId,
      userPoolWebClientId: environment.cognito.userPoolWebClientId,
      oauth: environment.cognito.oauth
    };
  }
}
