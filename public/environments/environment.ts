// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useMock: true,
  baseURL: 'http://localhost:4200/',
  URL: 'assets/data',
  apiUrl: 'https://api.nextgenerationmart.com',
  cognito: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_e5FiF6ZJc',
    userPoolWebClientId: '5nkkq0dsegjljdcjbai37eioe3',
    identityPoolId: 'us-east-1:YOUR_ACTUAL_IDENTITY_POOL_ID', // Replace with your actual Identity Pool ID
    oauth: {
      domain: 'https://us-east-1e5fif6zjc.auth.us-east-1.amazoncognito.com',
      redirectSignIn: 'http://localhost:4200/nxt/auth/callback',
      redirectSignOut: 'http://localhost:4200/nxt/auth/login',
      responseType: 'code'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
