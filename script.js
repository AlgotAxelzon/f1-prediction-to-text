
// Variables and initializations

var src_data;

var list = document.getElementById('list')
var base, randomized, dragging, draggedOver;
var isRight = 'Not In Order!';



fetch('http://test.axelzon.com/data/lastResults.json')
  .then(response => response.json())
  .then(data => {
    src_data = data;
    base = data.drivers;
    randomized = data.drivers;
    array = data.drivers.slice();
    list = document.querySelector(".list");
    raw_text = document.getElementById("raw_text");
    /*NewTrackplate(data.info, ".lastRaceResults");
    for (let i = 0; i < data.drivers.length; i++) {
      let e = data.drivers[i];
      NewNameplate(e, ".lastRaceResults");
    }*/
    renderItems(src_data.drivers);
  });





const renderItems = (data) => {
  list.innerText = '';
  raw_text.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    /*data.forEach(item => {*/

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


    a.draggable = true
    a.addEventListener('drag', setDragging)
    a.addEventListener('dragover', setDraggedOver)
    a.addEventListener('drop', compare)

    list.appendChild(a);

    FixGridWidth();

  }//)
}

const compare = (e) => {
  var index1 = dragging - 1;
  var index2 = draggedOver - 1;
  var temp = randomized[index1];
  randomized.splice(index1, 1);
  randomized.splice(index2, 0, temp);

  renderItems(randomized)
};


const setDraggedOver = (e) => {
  e.preventDefault();
  //console.log(e.target.closest("div.f1").children[0].children[0].innerText)
  //draggedOver = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)

  draggedOver = Number.isNaN(parseInt(e.target.closest("div.f1").children[0].children[0].innerText)) ? e.target.closest("div.f1").children[0].children[0].innerText : parseInt(e.target.closest("div.f1").children[0].children[0].innerText)

  //console.log(draggedOver);
}

const setDragging = (e) => {
  //dragging = Number.isNaN(parseInt(e.target.innerText)) ? e.target.innerText : parseInt(e.target.innerText)
  dragging = Number.isNaN(parseInt(e.target.closest("div.f1").children[0].children[0].innerText)) ? e.target.closest("div.f1").children[0].children[0].innerText : parseInt(e.target.closest("div.f1").children[0].children[0].innerText)

  //console.log(dragging);
}


function copyToClipboard() {
  raw_text.select();
  document.execCommand("copy");
}
