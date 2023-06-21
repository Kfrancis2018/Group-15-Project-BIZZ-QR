

function login(){
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        alert(cred.user.email+"has Logged in" )
        window.location.href ="dashboard.html";
    });

  
}


function signup(){
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        alert(cred.user.email+"has Signed up" )
        window.location.href ="login.html";
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
