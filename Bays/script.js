const container = document.querySelector('.container');
const bays = document.querySelectorAll('.row .bay:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const baySelect = document.getElementById('bay');

populateUI();
let ticketPrice = +baySelect.value;

// Save selected movie index and price
function setBayData(bayIndex, bayPrice) {
  localStorage.setItem('selectedBayIndex', bayIndex);
  localStorage.setItem('selectedBayPrice', bayPrice);
}

// update total and count
function updateSelectedCount() {
  const selectedBays = document.querySelectorAll('.row .bay.selected');

  const baysIndex = [...selectedBays].map((bay) => [...bays].indexOf(bay));

  localStorage.setItem('selectedBays', JSON.stringify(baysIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedBaysCount = selectedBays.length;

  count.innerText = selectedBaysCount;
  total.innerText = selectedBaysCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedBays = JSON.parse(localStorage.getItem('selectedBays'));
  if (selectedBays !== null && selectedBays.length > 0) {
    bays.forEach((bay, index) => {
      if (selectedBays.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedBayIndex = localStorage.getItem('selectedBayIndex');

  if (selectedBayIndex !== null) {
    baySelect.selectedIndex = selectedBayIndex;
  }
}

// Movie select event
baySelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setBayData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('bay') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// intial count and total
updateSelectedCount();
