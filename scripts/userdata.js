

var usertitle =document.getElementById("usertitle");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     
        usertitle.innerHTML= user.email+"'s Dashboard";
    } else {
      // No user is signed in.
    }
  });