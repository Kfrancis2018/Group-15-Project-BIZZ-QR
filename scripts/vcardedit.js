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







firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

      editvcard();
 
    
    
  } else {
    // No user is signed in.
  }
});





function editvcard() {
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(localStorage.getItem("qrname"))
    .get()
    .then((doc) => {
      if (doc.exists) {
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