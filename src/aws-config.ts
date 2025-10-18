/**
 * AWS Amplify Configuration
 * Configure AWS Cognito User Pool and App Client
 */

export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_e5FiF6ZJc', // ✅ Your actual User Pool ID
      userPoolClientId: '5nkkq0dsegjljdcjbai37eioe3', // ✅ Your actual App Client ID
      loginWith: {
        email: true,
        username: false,
        phone: true
      }
    }
  }
};
