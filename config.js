const firebaseConfig = {
    apiKey: "AIzaSyA0mfxslt6iV1CNCpx8syBMdYOgRWkZ1PU",
    authDomain: "finalproject-bizzqr.firebaseapp.com",
    projectId: "finalproject-bizzqr",
    storageBucket: "finalproject-bizzqr.appspot.com",
    messagingSenderId: "1002524993571",
    appId: "1:1002524993571:web:4be2a34495a4780e182996",
    measurementId: "G-5TLLKD833Z"
  };

  firebase.initializeApp(firebaseConfig);

  const auth =firebase.auth();
  const db =firebase.firestore();

  