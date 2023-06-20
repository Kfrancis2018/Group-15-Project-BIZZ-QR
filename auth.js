

function login(){
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        alert(cred.user.email+"has Logged in" )
    });

}


function signup(){
    email=document.getElementById("email").value;
    password=document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        alert(cred.user.email+"has Signed up" )
    });
}