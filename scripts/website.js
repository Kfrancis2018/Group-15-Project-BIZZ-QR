
function savewebsite(){


  var qrname=document.getElementById("qrname").value;
  var website=document.getElementById("website").value;
  var UserID= auth.currentUser.uid;

  db.collection(UserID).doc(qrname).set({
 
      website:website, 
      type:"Website",

  }).then(() => {
    console.log("Website Created");
    window.location.href ="dashboard.html";
})
.catch((error) => {

    console.error("Error Writing Document", error);
    
});



}



