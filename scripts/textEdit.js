
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
function savetext(){


  var qrname=document.getElementById("qrname").value;
  var text=document.getElementById("text").value;
  var UserID= auth.currentUser.uid;
  if(localStorage.getItem("qrname")!=qrname){
    // deletes the document so there is not a duplicate document created
    deleteQR(localStorage.getItem("qrname"));
  }
  
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