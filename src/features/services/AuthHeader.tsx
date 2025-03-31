import AuthService from "./AuthServices";

// export default function authHeader() {
//   const userData = AuthService.getCurrentAccessToken();
//   console.log(userData)
//   // / Decode the token
// const decodedToken = atob(userData.split('.')[1]);
//
// // Parse the decoded token as JSON
// const tokenData = JSON.parse(decodedToken);
//
// // Extract the user name from the token data
// const userName = tokenData.username;
//
// // Use the extracted user name
// console.log(userName);
//   if (userData) {
//     // console.log(userData)
//     return {
//       Authorization: `Bearer ${userData}`}
//   } else {
//     return {};
//   }
//
// }
