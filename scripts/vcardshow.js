
const qrname= localStorage.getItem("qrname");
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      viewQR();
      
    } else {
      // No user is signed in.
    }
  });




  







  function generateVCard(qrname) {
    return new Promise((resolve, reject) => {
      var UserID = auth.currentUser.uid;
      db.collection(UserID)
        .doc(qrname)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("document data", doc.data());
            var firstName = doc.data().fname;
            var lastName = doc.data().lname;
            var email = doc.data().email;
            var phone = doc.data().phone;
            var organization = doc.data().organization;
            var jobTitle = doc.data().title;
            var address = doc.data().address;
            var about = doc.data().about;
            var website = doc.data().website;
            const vcard = `BEGIN:VCARD\r\nVERSION:3.0\r\nN:${lastName.trim()};${firstName.trim()};;;\r\nFN:${firstName.trim()} ${lastName.trim()}\r\nORG:${organization.trim()}\r\nTEL;TYPE=CELL:${phone.trim()}\r\nEMAIL:${email.trim()}\r\nTITLE:${jobTitle.trim()}\r\nADR:${address.trim()}\r\nNOTE:${about.trim()}\r\nURL:${website.trim()}\r\nEND:VCARD`;
  
            resolve(vcard);
          } else {
            console.log("no such document");
            reject(new Error("No such document"));
          }
        })
        .catch((error) => {
          console.error("Error retrieving vCard data:", error);
          reject(error);
        });
    });
  }

// Assign contact information to variables


async function downloadQR() {
  try {
    const vcardData = await generateVCard(qrname);
    const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(vcardData.trim())}`;

    // Fetch the QR code image as a Blob
    const response = await fetch(qrCodeUrl);
    const blob = await response.blob();

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "qr_code.png";

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

async function downloadVcard() {
  try {
    const vcardData = await generateVCard(qrname);
    const downloadLink = document.createElement("a");
    downloadLink.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardData.trim())}`;
    downloadLink.download = "contact.vcf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Error generating vCard:", error);
  }
}

async function viewQR() {
  try {
    const vcardData = await generateVCard(qrname);
    
    // Create a QR code using Google Charts API
    const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(vcardData.trim())}`;
    
    // Display the QR code
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;
  } catch (error) {
    console.error("Error generating QR code:", error);
  }
}


