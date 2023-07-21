
function savelocation() {
  var street = document.getElementById("street").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var postcode= document.getElementById("postcode").value;
  var qrname = document.getElementById("qrname").value;
  var UserID = auth.currentUser.uid;
  if(localStorage.getItem("qrname")!=qrname){
    // deletes the document so there is not a duplicate document created
    deleteQR(localStorage.getItem("qrname"));
  }
  
  db.collection(UserID)
    .doc(qrname)
    .set({
      street: street,
      city: city,
      state: state,
      postcode: postcode,
      type: "Location",
    })
    .then(() => {
      console.log("Location Created");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error Writing Document", error);
    });
}




function deleteQR(qrname){
  var database = firebase.firestore();
  var UserID = auth.currentUser.uid;
  // Specify the document to  to delete
  var documentRef = database.collection(UserID).doc(qrname);
  
  // Delete the document
  documentRef.delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error deleting document: ", error);
    });
}






firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

      editlocation();
 
    
    
  } else {
    // No user is signed in.
  }
});





function editlocation() {
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(localStorage.getItem("qrname"))
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById("street").value=doc.data().street;
        document.getElementById("city").value=doc.data().city;
        document.getElementById("state").value=doc.data().state;
        document.getElementById("postcode").value=doc.data().postcode;
        document.getElementById("qrname").value = localStorage.getItem("qrname");

      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error retrieving document:", error);
    });
}