
function savelocation() {
  var street = document.getElementById("street").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var postcode= document.getElementById("postcode").value;
  var qrname = document.getElementById("qrname").value;
  var UserID = auth.currentUser.uid;

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