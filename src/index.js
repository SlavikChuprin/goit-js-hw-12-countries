 

import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countriesListTpl from './templates/countriesList.hbs';
import countryInfoTpl from './templates/countryInfo.hbs';
const _ = require('lodash');


const BASE_URL = 'https://restcountries.eu/rest/v2/';
const refs={
    input: document.querySelector('.input'),
    countriesMarkUp: document.querySelector('.countries-result'),
};

refs.input.addEventListener('input',_.debounce(onSearch,500))

function onSearch(e) {
     const searchQuery= e.target.value;
     console.log(searchQuery);
    fetch(`${BASE_URL}name/${searchQuery}`)
    .then(res=>res.json())
    .then(renderCountriesList)
    .catch(onFetchError); 
};
     
console.dir();
function renderCountriesList(countries){
    if(countries.length ===1){
 const list= countryInfoTpl(...countries);
 refs.countriesMarkUp.innerHTML =list;
    } else{
        console.log("больше 1",countries.length );
     const list= countriesListTpl(countries);
     refs.countriesMarkUp.innerHTML =list;
 };
 refs.input.value="";
};


function onFetchError (error){
    alert('Error');
}