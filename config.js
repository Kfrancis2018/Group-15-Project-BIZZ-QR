const firebaseConfig = {
    apiKey: "AIzaSyC2L81JBuyHhdm6zCH7EwBLyVUIfP9k4Tk",
    authDomain: "exampleproject-5b4a9.firebaseapp.com",
    projectId: "exampleproject-5b4a9",
    storageBucket: "exampleproject-5b4a9.appspot.com",
    messagingSenderId: "697031281705",
    appId: "1:697031281705:web:a12703410db1f3a2352038",
    measurementId: "G-2LE9NRX19V"
  };

  firebaseConfig.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db= firebase.firestore();