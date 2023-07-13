
function savevcard() {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var organization = document.getElementById("organization").value;
  var title = document.getElementById("title").value;
  var website = document.getElementById("website").value;
  var email = document.getElementById("email").value;
  var qrname = document.getElementById("qrname").value;
  var about = document.getElementById("about").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(qrname)
    .set({
      fname: fname,
      lname: lname,
      organization: organization,
      title: title,
      email: email,
      about: about,
      website: website,
      address: address,
      phone: phone,
      type: "vcard",
    })
    .then(() => {
      console.log("Vcard Created");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error Writing Document", error);
    });
}




