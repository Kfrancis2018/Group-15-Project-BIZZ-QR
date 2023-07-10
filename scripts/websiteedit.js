function savewebsite(){


  var qrname=document.getElementById("qrname").value;
  var phone=document.getElementById("phone").value;
  var UserID= auth.currentUser.uid;

  db.collection(UserID).doc(qrname).set({

      phone:phone, 
      type:"Website", 

  }).then(() => {
      window.location.href ="dashboard.html";
    console.log("Vcard Created");
})
.catch((error) => {

    console.error("Error Writing Document", error);
    
});



}







firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

      editcall();
 
    
    
  } else {
    // No user is signed in.
  }
});





function editwebsite() {
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(localStorage.getItem("qrname"))
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById("qrname").value = localStorage.getItem("qrname");
        document.getElementById("website").value = doc.data().website;
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error retrieving document:", error);
    });
}