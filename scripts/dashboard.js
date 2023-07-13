


createDashboard();


function createDashboard(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
            showqr();
        } else {
          // No user is signed in.
        }
      });
    

}





function showqr(){
  var UserID = auth.currentUser.uid;

  const collectionRef = db.collection(UserID);

  collectionRef.get()
  .then((querySnapshot) => {
    // Array to store the document names
    const documentNames = [];

    // Loop through each document
    querySnapshot.forEach((doc) => {
      // Get the name of each document
      const documentName = doc.id;

      // Add the document name to the array
      documentNames.push(documentName);
    });

    // Do something with the array of document names
    console.log(documentNames);
    additemtolist(documentNames);
  })
  .catch((error) => {
    console.log('Error getting documents:', error);
  });

    }

function additemtolist(qrlist){
    var UserID = auth.currentUser.uid;

    
    for(let i=0; i< qrlist.length;i++){
        db.collection(UserID).doc(qrlist[i]).get().then((doc)=> {
            if(doc.exists){
              
              addNewLiElement(qrlist[i], doc.data().type);
                
                
            }else{
                console.log("no such document");
            }
    
    
        })

    }

}


function addNewLiElement(name , type) {
    // Get reference to the ul element
    const ulElement = document.getElementById('dynamicList');
  
    // Create a new li element
    const newLiElement = document.createElement('li');
  
    // Create a new table element
    const newTableElement = document.createElement('table');
    newTableElement.setAttribute('id', "QR_List_Element");
  
    // Create the table rows and cells
    const tableRows = [
      { qrname: name, type: type },

      // Add more rows as needed
    ];
  
    tableRows.forEach(rowData => {
      const newRow = document.createElement('tr');
  
      // Create and populate the cells
      const qrnameCell = document.createElement('th');
    
      qrnameCell.textContent = rowData.qrname;
  
      const typeCell = document.createElement('th');
    
      typeCell.textContent = rowData.type;
  
      // Create the buttons and their respective cells
      const viewButtonCell = document.createElement('th');
      const viewButton = document.createElement('button');
      viewButton.className = 'button';
      viewButton.textContent = 'View QR Code';
      viewButton.addEventListener('click', viewqr); // Add the appropriate event listener function
      viewButton.setAttribute('id', name);
      const editButtonCell = document.createElement('th');
      const editButton = document.createElement('button');
      editButton.className = 'button';
      editButton.textContent = 'Edit QR Code';
      editButton.addEventListener('click', editqr); // Add the appropriate event listener function
      editButton.setAttribute('id', name);
      const deleteButtonCell = document.createElement('th');
      const deleteButton = document.createElement('button');
      deleteButton.className = 'button';
      deleteButton.textContent = 'Delete QR Code';
      deleteButton.addEventListener('click', deleteqr); // Add the appropriate event listener function
      deleteButton.setAttribute('id', name);
      
      // Append the cells to the row
      newRow.appendChild(qrnameCell);
      newRow.appendChild(typeCell);
      newRow.appendChild(viewButtonCell).appendChild(viewButton);
      newRow.appendChild(editButtonCell).appendChild(editButton);
      newRow.appendChild(deleteButtonCell).appendChild(deleteButton);
  
      // Append the row to the table
      newTableElement.appendChild(newRow);
    });
  
    // Append the new table to the li element
    newLiElement.appendChild(newTableElement);
  
    // Append the new li element to the ul
    ulElement.appendChild(newLiElement);
  }
  
  function getType(qrname) {
    return new Promise((resolve, reject) => {
      var UserID = auth.currentUser.uid;
  
      db.collection(UserID)
        .doc(qrname)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            var type = doc.data().type;
            console.log(type);
            resolve(type);
          } else {
            console.log("No such document");
            resolve(null); // or reject("No such document") if you prefer to indicate an error
          }
        })
        .catch((error) => {
          console.log("Error retrieving document:", error);
          reject(error);
        });
    });
  }

  
  async function viewqr() {
    localStorage.setItem("qrname", event.srcElement.id);
    const qrname = localStorage.getItem("qrname", event.srcElement.id);
    try {
      const type = await getType(qrname);
  
      switch (type) {
        case "Call":
          window.location.href = "viewCall.html";
          break;
        case "vcard":
          window.location.href = "viewQRcode.html";
          break;
        case "Location":
          window.location.href = "viewLocation.html";
          break;
        case "Text":
          window.location.href = "viewText.html";
          break;
        case "Website":
          window.location.href = "viewWebsite.html";
          break;
        case "Message":
          window.location.href = "viewMessage.html";
          break;
        default:
          console.log("Unknown type: " + type);
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  }

  async function editqr(){
    localStorage.setItem("qrname", event.srcElement.id);
    const qrname = localStorage.getItem("qrname", event.srcElement.id);
    try {
      const type = await getType(qrname);
  
      switch (type) {
        case "Call":
          window.location.href = "editCall.html";
          break;
        case "vcard":
          window.location.href = "editVcard.html";
          break;
        case "Location":
          window.location.href = "editLocation.html";
          break;
        case "Text":
          window.location.href = "editText.html";
          break;
        case "Website":
          window.location.href = "editWebsite.html";
          break;
        case "Message":
          window.location.href = "editMessage.html";
          break;
        default:
          console.log("Unknown type: " + type);
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  }

  function deleteqr(){
    localStorage.setItem("qrname",  event.srcElement.id);
    deleteQR();
  }


  function deleteQR(){
    var database = firebase.firestore();
    var UserID = auth.currentUser.uid;
    // Specify the document you want to delete
    var documentRef = database.collection(UserID).doc(localStorage.getItem("qrname"));
    
    // Delete the document
    documentRef.delete()
      .then(function() {
        console.log("Document successfully deleted!");
        window.location.href ="dashboard.html";
      })
      .catch(function(error) {
        console.error("Error deleting document: ", error);
      });
  }
  

 