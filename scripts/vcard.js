
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
    console.log("Vcard Created");
    window.location.href ="dashboard.html";
})
.catch((error) => {

    console.error("Error Writing Document", error);
    
});



}








function generateVCard(firstName, lastName, email, phone, organization, jobTitle, address, about, website ) {



const vcard = `BEGIN:VCARD\r\nVERSION:3.0\r\nN:${lastName.trim()};${firstName.trim()};;;\r\nFN:${firstName.trim()}${lastName.trim()}\r\nORG:${organization.trim()}\r\nTEL;TYPE=CELL:${phone.trim()}\r\nEMAIL:${email.trim()}\r\nTITLE:${jobTitle.trim()}\r\nADR:${address.trim()}\r\nNOTE:${about.trim()}\r\nURL:${website.trim()}\r\nEND:VCARD`;

return vcard;
}

// Assign contact information to variables



function downloadQR(){
  
const vcardData = generateVCard(firstName, lastName, email, phone, organization, jobTitle, address, about, website);

// Create a QR code using Google Charts API
  // Create a QR code using Google Charts API
  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(vcardData.trim())}`;

  // Fetch the QR code image as a Blob
  fetch(qrCodeUrl)
    .then(response => response.blob())
    .then(blob => {
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
    })
    .catch(error => {
      console.error("Error downloading QR code:", error);
    });
}


function downloadVcard(){


const vcardData = generateVCard(firstName, lastName, email, phone, organization, jobTitle, address, about, website);
const downloadLink = document.createElement("a");
downloadLink.href = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardData.trim())}`;
downloadLink.download = "contact.vcf";
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);



}

function viewQR(){

  var firstName= localStorage.getItem("fname");
  var lastName =localStorage.getItem("lname");
  var email= localStorage.getItem("email");
  var phone= localStorage.getItem("phone");
  var  organization= localStorage.getItem("organization");
  var jobTitle= localStorage.getItem("title");
  var  address= localStorage.getItem("address");
  var about =localStorage.getItem("about");
  var website =localStorage.getItem("website");
  var phone =localStorage.getItem("phone");
var vcardData = generateVCard(firstName, lastName, email, phone, organization, jobTitle, address, about, website);


// Create a QR code using Google Charts API
const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(vcardData.trim())}`;
// Display the QR code
const qrCodeContainer = document.getElementById("qrcode");
qrCodeContainer.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;


}


