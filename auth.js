

function login(){
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        alert(cred.user.email+"has Logged in" )
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href ="dashboard.html";
        } else {
          // No user is signed in.
        }
      });
}


function signup(){
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        alert(cred.user.email+"has Signed up" )
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href ="dashboard.html";
        } else {
          // No user is signed in.
        }
      });
}

function signout(){
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.href ="index.html";
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}
