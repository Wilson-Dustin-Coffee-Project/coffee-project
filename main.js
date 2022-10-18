"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee rounded-3">';
    html += '<div class="col d-flex justify-contnet-center align-items-top"><a href="#"><h3>' + coffee.name + '</h3><p>' + coffee.roast + '</p></a></div>';
    // html += '<div class="col"><p>' + coffee.roast + '</p></div>';
    html += '</div>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for (var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees() {
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    var sort = document.getElementById("text").value.toUpperCase();
    coffees.forEach(function (coffee) {
        if (((selectedRoast === 'all') || (coffee.roast === selectedRoast)) && (coffee.name.toUpperCase().includes(sort))) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];
coffees.reverse()
if(localStorage.getItem('newCoffeeNames') !== null){
    coffees =JSON.parse(localStorage.getItem('newCoffeeNames'));
}

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
roastSelection.addEventListener('change', updateCoffees);
document.getElementById("text").addEventListener('keyup',updateCoffees);
tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', coffeeInput);

//function for coffee selection based on input
function coffeeInput(e) {
    e.preventDefault();
    var id = coffees.length + 1;
    var roast = document.getElementById('roast-selection-add').value;
    var name = document.getElementById('text-add').value;
    var newcoffee ={id,name,roast};
    coffees.push(newcoffee);
    updateCoffees();

    var newCoffeeNames = coffees;
    localStorage.setItem("newCoffeeNames", JSON.stringify(newCoffeeNames));
}

// window.localStorage.clear();
document.getElementById('clear').addEventListener("click", clearStorage)
function clearStorage(){
    localStorage.removeItem("newCoffeeNames");
    return window.localStorage.clear();
}
