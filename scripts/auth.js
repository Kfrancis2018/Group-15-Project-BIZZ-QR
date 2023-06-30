


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

function set(){

    var fname=document.getElementById("fname").value;
    var lname=document.getElementById("lname").value;
    var organization=document.getElementById("organization").value;
    var birthday=document.getElementById("birthday").value;
    var title=document.getElementById("title").value;
    var website=document.getElementById("website").value;
    var email=document.getElementById("email").value;
    var qrname=document.getElementById("qrname").value;
    var about=document.getElementById("about").value;
    var UserID= auth.currentUser.uid;

    db.collection(UserID).doc("website").set({
        fname :fname, 
        lname:lname,
        organization:organization,
        birthday:birthday,
        title:title,
        email:email, 
        about:about, 
        qrname:qrname,
        website:website, 

    }).then(() =>{
            "Vcard Created"
    }
    
    
    ).catch((error)=>{
        "Error Writing Document", error
    });
}


