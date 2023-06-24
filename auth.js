


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
    var lname=document.getElementById("birthday").value;
    var organization=document.getElementById("organization").value;
    var birthday=document.getElementById("birthday").value;
    var title=document.getElementById("title").value;
    var UserID= auth.currentUser.uid;

    db.collection(UserID).doc("Vcard").set({
        fname :fname, 
        lname:lname,
        organization:organization,
        birthday:birthday,
        title:title, 

    }).then(() =>{
            "Vcard Created"
    }
    
    
    ).catch((error)=>{
        "Error Writing Document", error
    });
}
function show(){
    var UserID = auth.currentUser.uid;
    db.collection(UserID).doc("Vcard").get().then((doc)=> {
        if(doc.exists){
            console.log("document data" , doc.data() );
            document.getElementById("fnameshow").innerHTML=doc.data().fname;
            document.getElementById("lnameshow").innerHTML=doc.data().lname;
            document.getElementById("organizationshow").innerHTML=doc.data().organization;
            document.getElementById("birthdayshow").innerHTML=doc.data().birthday;
            document.getElementById("titleshow").innerHTML=doc.data().title;
        }else{
            console.log("no such document");
        }


    })
    

    }

