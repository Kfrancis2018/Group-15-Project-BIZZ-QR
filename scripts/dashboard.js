firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var UserID = auth.currentUser.uid;
        var docRef = db.collection(UserID).doc("qrcodesList"); // Replace "docId" with the actual document ID

        // Check if the document exists
        docRef.get().then(function(doc) {
          if (doc.exists) {
            console.log("Document 'qrcodesList' already exists.");
          } else {
            // Document doesn't exist, create it
            docRef.set({
              qrcodes: []
            }).then(function() {
              console.log("Document 'qrcodesList' created.");
            }).catch(function(error) {
              console.error("Error creating document: ", error);
            });
          }
        }).catch(function(error) {
          console.error("Error checking document existence: ", error);
        });
      
    } else {
      // No user is signed in.
    }
  });


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


    
    db.collection(UserID).doc("qrcodesList").get().then((doc)=> {
        if(doc.exists){
            console.log("document data" , doc.data() );
            document.getElementById("qrname").innerHTML=doc.data().qrname;
            var qrlist=doc.data().qrcodes;
            additemtolist(qrlist);
        }else{
            console.log("no such document");
        }


    })
    


    

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
  }

  function deleteqr(){
    localStorage.setItem("qrname",  event.srcElement.id);
  }

  
  

 