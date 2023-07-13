
const qrname= localStorage.getItem("qrname");
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      viewQR();
      
    } else {
      // No user is signed in.
    }
  });

  function generateTextQR(qrname) {
    return new Promise((resolve, reject) => {
      var UserID = auth.currentUser.uid;
      db.collection(UserID)
        .doc(qrname)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("document data", doc.data());
   
            var text = doc.data().text;
      
            
            resolve(text);
          } else {
            console.log("no such document");
            reject(new Error("No such document"));
          }
        })
        .catch((error) => {
          console.error("Error retrieving call data:", error);
          reject(error);
        });
    });
  }


  async function downloadQR() {
    try {
      const callData = await generateTextQR(qrname);
      const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(callData.trim())}`;
  
      // Fetch the QR code image as a Blob
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
  
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
  
      // Create a temporary anchor element
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = localStorage.getItem("qrname");
  
      // Trigger a click event on the anchor element to initiate the download
      downloadLink.click();
  
      // Remove the anchor element from the DOM
      document.body.removeChild(downloadLink);
  
      // Revoke the URL to release resources
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  }
  async function viewQR() {
    try {
      const callData = await generateTextQR(qrname);
  
      // Create a QR code using Google Charts API
      const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(
        callData.trim()
      )}`;
  
      // Display the QR code
      const qrCodeContainer = document.getElementById("qrcode");
      qrCodeContainer.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }
