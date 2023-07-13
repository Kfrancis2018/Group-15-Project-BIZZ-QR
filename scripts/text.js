
function savetext() {
  var text= document.getElementById("text").value;
  
  var qrname = document.getElementById("qrname").value;
  var UserID = auth.currentUser.uid;

  db.collection(UserID)
    .doc(qrname)
    .set({
      text: text,
      type: "Text",
    })
    .then(() => {
      console.log("Text Created");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error Writing Document", error);
    });
}




