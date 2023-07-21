


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

      editvcard();
 
    
    
  } else {
    // No user is signed in.
  }
});


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
function savevcard(){


  var fname=document.getElementById("fname").value;
  var lname=document.getElementById("lname").value;
  var organization=document.getElementById("organization").value;
  var title=document.getElementById("title").value;
  var website=document.getElementById("website").value;
  var email=document.getElementById("email").value;
  var qrname=document.getElementById("qrname").value;
  var about=document.getElementById("about").value;
  var address=document.getElementById("address").value;
  var phone=document.getElementById("phone").value;
  var UserID= auth.currentUser.uid;

  // checks if the qrname has beem changed
  if(localStorage.getItem("qrname")!=qrname){
    // deletes the document so there is not a duplicate document created
    deleteQR(localStorage.getItem("qrname"));
  }


  // access the document containing the vcard information and saves the new data 
  db.collection(UserID).doc(qrname).set({
      fname :fname, 
      lname:lname,
      organization:organization,
      title:title,
      email:email, 
      about:about, 
      website:website, 
      address:address,
      phone:phone, 
      type:"vcard",

  }).then(() => {
      window.location.href ="dashboard.html";
    console.log("Vcard Created");
})
.catch((error) => {

    console.error("Error Writing Document", error);
    
});



}




function editvcard() {
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(localStorage.getItem("qrname"))
    .get()
    .then((doc) => {
      if (doc.exists) {
        // auto populated the content of the form with data
        console.log("Document data:", doc.data());
        document.getElementById("fname").value = doc.data().fname;
        document.getElementById("lname").value = doc.data().lname;
        document.getElementById("organization").value = doc.data().organization;
        document.getElementById("title").value = doc.data().title;
        document.getElementById("website").value = doc.data().website;
        document.getElementById("email").value = doc.data().email;
        document.getElementById("qrname").value = localStorage.getItem("qrname");
        document.getElementById("about").value = doc.data().about;
        document.getElementById("address").value = doc.data().address;
        document.getElementById("phone").value = doc.data().phone;
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log("Error retrieving document:", error);
    });
}