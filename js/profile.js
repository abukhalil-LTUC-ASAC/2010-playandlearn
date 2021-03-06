

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(event) {
  // TODO: suss out the item picked from the select list
  var selectedItem = event.target[1].value;

  // TODO: get the quantity
  var itemQuantity = event.target[2].value;

  // TODO: using those, add one item to the Cart
  cart.addItem(selectedItem, itemQuantity);
}

// Cart.prototype.saveToLocalStorage = function() {
//   localStorage.removeItem('cart');
//   localStorage.setItem('cart', JSON.stringify(allClicked));
// };

function updateCartPreview(event) {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var HTMLcontent = document.getElementById("cartContents");
  HTMLcontent.innerHTML = ''
  if (!event) {
    console.log(allClicked.length)
    for (var i = 0; i < allClicked.length; i++){
      HTMLcontent.innerHTML += '<div>Item: ' + allClicked[i][0] + '</div>' 
      + '<div>Quantity: ' + allClicked[i][1] + '</div><br>'
    }
  } else {
      HTMLcontent.innerHTML += '<div>' + Product.allProducts[event.target[1].value].name + '</div>' 
      + '<div>' + event.target[2].value + '</div><br>'
  }

}


// ------------------- Textarea Work ------------------- //

  document.getElementById('textarea').onkeyup = function () {
  document.getElementById('textCount').innerHTML = "Characters left: " + (75 - this.value.length);
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  var dateTitle = document.getElementById('dateTitle');
  dateTitle.innerHTML += today;

  var journalForm = document.getElementById('journalForm');
  journalForm.addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();
    // Do all the things ...
    var text = event.target[1].value;
    var note = [today, text];
    activeUser[3].push(note)
    localStorage.setItem('activeUser', JSON.stringify(activeUser))
    renderNotes();
    // addSelectedItemToCart(event);
    // cart.saveToLocalStorage();
    // updateCartPreview();
  }

// ------------------- Print Notes from storage and add from input ------------------- //
  
  var activeUser = JSON.parse(localStorage.getItem('activeUser')) || [];
  var frame = document.getElementById('frame');
  frame.addEventListener('dblclick', removeItemFromFrame);

  function renderNotes() {

    var notes = activeUser[3];
    frame.innerHTML = '';
    for (var i = 0; i < notes.length; i++) {

      var anchor = document.createElement('a');
      anchor.classList.add('note','sticky'+i);
      anchor.id = i;

      var pin = document.createElement('div');
      pin.classList.add('pin');
      anchor.appendChild(pin);

      var text = document.createElement('div');
      text.innerHTML ='<p>' + notes[i][0] + '</p>' + notes[i][1];
      text.classList.add('text');
      anchor.appendChild(text);
      frame.appendChild(anchor);
      saveNotesUpdates()
      // if(i >= 11) {

      // }
    }
  }

  function renderProfile() {
    document.getElementById("profImage").src = '';
    document.getElementById("userName").innerHTML = activeUser[0];
    document.getElementById("profImage").src = activeUser[1];
    document.getElementById("highScore").innerHTML = 'High Score: ' + activeUser[2];
  }

  function removeItemFromFrame(e) {
    console.log(e.target.id);
    console.log(activeUser[3])

    // e.target.remove();
    activeUser[3].splice(e.target.id,1,'');
    var filtered = activeUser[3].filter(function (el) {
      return el != '';
    });
    activeUser[3] = filtered;
    console.log(activeUser[3])
    localStorage.setItem('activeUser', JSON.stringify(activeUser))
    renderNotes();
  }
  renderNotes();
  renderProfile();
// -------------------------- Save Active User Details ------------------------//
  var allUsersProfile = [];
  function saveNotesUpdates() {
    console.log(JSON.parse(localStorage.getItem('users')));
    allUsersProfile = JSON.parse(localStorage.getItem('users'));

    for (var i = 0; i < allUsersProfile.length; i++) {
      if (activeUser[0] == allUsersProfile[i].name) {
        console.log('found match at', allUsersProfile[i].name);
        allUsersProfile[i].notes = activeUser[3];
        allUsersProfile[i].score = activeUser[2];
        break;
      }
    }
    localStorage.setItem('users', JSON.stringify(allUsersProfile))
  }

  // -------------------------- Print scores of all users ------------------------//
  function compareClicked(a, b) {
    const scoreA = a.score
    const scoreB = b.score
  
    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = -1;
    } else if (scoreA < scoreB) {
      comparison = 1;
    }
    return comparison;
  }

  var SortedObj = [];
  var scoreContainer = document.getElementById('listView');

  function printScores() {
    scoreContainer.innerHTML = '';

    allUsersProfile = JSON.parse(localStorage.getItem('users'));
    SortedObj = SortedObj.concat(allUsersProfile); // assign, compare and print at the end
    SortedObj.sort(compareClicked);

    console.log('Sorted ', SortedObj);

    for (var i = 0; i < allUsersProfile.length; i++) {
      scoreContainer.innerHTML += "<p><span>" + SortedObj[i].name + "</span><br>" + SortedObj[i].score + "</p>";
    }
  }

  printScores();