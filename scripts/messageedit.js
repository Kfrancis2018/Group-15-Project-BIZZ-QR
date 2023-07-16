function savemessage(){


  var qrname = document.getElementById("qrname").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(qrname)
    .set({
  
      phone: phone,
      message: message,
      type: "Message",
    })
    .then(() => {
      console.log("Message Created");
      window.location.href = "dashboard.html";
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





function editcall() {
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(localStorage.getItem("qrname"))
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById("qrname").value = localStorage.getItem("qrname");
        document.getElementById("phone").value = doc.data().phone;
        document.getElementById("message").value = doc.data().message;
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error retrieving document:", error);
    });
}