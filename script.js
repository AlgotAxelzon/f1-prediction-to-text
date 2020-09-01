
// Variables and initializations

var list = document.getElementById('list');
var raw_text = document.getElementById("raw_text");
var src_data, base, randomized, dragging, draggedOver;


fetch('http://test.axelzon.com/data/lastResults.json')
  .then(response => response.json())
  .then(data => {
    src_data = data;
    base = data.drivers;
    randomized = data.drivers;
    array = data.drivers.slice();

    renderItems(src_data.drivers);
  });


// Functions

const renderItems = (data) => {
  list.innerText = '';
  raw_text.innerHTML = '';
  for (let i = 0; i < data.length; i++) {

    var item = data[i];

    raw_text.innerHTML += i + 1 + ". " + item.firstname + " " + item.lastname + "&#13;&#10;";
    raw_text.value = raw_text.innerHTML;

    let a = ElementAndClass("div", "f1 nameplate-short");

    let grid = ElementAndClass("div", `grid grid-${item.grid.state}`);
    let span = document.createElement("span");
    span.innerText = i + 1;
    grid.appendChild(span);
    a.appendChild(grid);

    let sep = ElementAndClass("div", "separator");
    let sep_inner = ElementAndClass("div", `color-bg-${item.color}`);
    sep.appendChild(sep_inner);
    a.appendChild(sep);

    let driver = ElementAndClass("div", "driver");
    let name = ElementAndClass("div", "name");
    let firstname = ElementAndClass("span", "firstname");
    firstname.innerText = item.firstname;
    let lastname = ElementAndClass("span", "lastname");
    lastname.innerText = item.lastname;
    name.appendChild(firstname);
    name.appendChild(lastname);
    let team = ElementAndClass("div", "constructor");
    team.innerText = item.constructor;
    driver.appendChild(name);
    driver.appendChild(team);
    a.appendChild(driver);

    let ident = ElementAndClass("div", `ident color-text-${item.color}`);
    let number = ElementAndClass("div", "number");
    number.innerText = item.number;
    let abbr = ElementAndClass("div", "abbreviation");
    abbr.innerText = item.abbreviation;
    ident.appendChild(number);
    ident.appendChild(abbr);
    a.appendChild(ident);

    a.draggable = true;
    a.addEventListener('drag', setDragging);
    a.addEventListener('dragover', setDraggedOver);
    a.addEventListener('drop', compare);

    list.appendChild(a);

    FixGridWidth();
  }
}


const compare = (e) => {
  var index1 = dragging - 1;
  var index2 = draggedOver - 1;
  var temp = randomized[index1];
  randomized.splice(index1, 1);
  randomized.splice(index2, 0, temp);

  renderItems(randomized);
};


const setDraggedOver = (e) => {
  e.preventDefault();
  var targetIndex = e.target.closest("div.f1").children[0].children[0].innerText;
  draggedOver = Number.isNaN(parseInt(targetIndex)) ? targetIndex : parseInt(targetIndex);
}


const setDragging = (e) => {
  var targetIndex = e.target.closest("div.f1").children[0].children[0].innerText;
  dragging = Number.isNaN(parseInt(targetIndex)) ? targetIndex : parseInt(targetIndex);
}


function copyToClipboard() {
  raw_text.select();
  document.execCommand("copy");
}
