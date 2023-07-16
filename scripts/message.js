
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










