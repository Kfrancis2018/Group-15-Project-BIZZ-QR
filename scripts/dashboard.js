





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
     
                
                document.getElementById("type").innerHTML=doc.data().type;
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
    newTableElement.setAttribute('id', name);
  
    // Create the table rows and cells
    const tableRows = [
      { qrname: name, type: type },

      // Add more rows as needed
    ];
  
    tableRows.forEach(rowData => {
      const newRow = document.createElement('tr');
  
      // Create and populate the cells
      const qrnameCell = document.createElement('th');
      qrnameCell.setAttribute('rowspan', '3');
      qrnameCell.textContent = rowData.qrname;
  
      const typeCell = document.createElement('th');
      typeCell.setAttribute('rowspan', '3');
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
  
  function viewqr(){
    localStorage.setItem("qrname",  event.srcElement.id);
    window.location.href ="viewQRcode.html";
  }

  function editqr(){
    localStorage.setItem("qrname",  event.srcElement.id);
    
    window.location.href ="vcardedit.html";
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
  

 