
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




