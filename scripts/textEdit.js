function savetext(){


  var qrname=document.getElementById("qrname").value;
  var text=document.getElementById("text").value;
  var UserID= auth.currentUser.uid;

  db.collection(UserID).doc(qrname).set({

      text:text, 
      type:"Text", 

  }).then(() => {
      window.location.href ="dashboard.html";
    console.log("text Created");
})
.catch((error) => {

    console.error("Error Writing Document", error);
    
});



}







firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

      editwebsite();
 
    
    
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
        document.getElementById("text").value = doc.data().text;
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error retrieving document:", error);
    });
}