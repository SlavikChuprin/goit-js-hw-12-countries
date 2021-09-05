import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countriesListTpl from './templates/countriesList.hbs';
import countryInfoTpl from './templates/countryInfo.hbs';
import { alert, defaults } from '@pnotify/core';
const _ = require('lodash');

const refs={
    input: document.querySelector('.input'),
    countriesMarkUp: document.querySelector('.countries-result'),
};


defaults.labels = {close: 'Close'};
defaults.minHeight= '10px'


refs.input.addEventListener('input',_.debounce(onSearch,500))

function onSearch(e) {
    const searchQuery= e.target.value;
    fetchCountries(searchQuery)
    .then((countries)=> {
        if(countries.length>10){
        } else {
            return countries;
        }  
    })
    .then(renderCountriesList)
    .catch((error)=>manyCountriesError())        
    .finally(()=> {
            refs.input.value="";})    
};

function renderCountriesList(countries){
    if(countries.length ===1){
 const list= countryInfoTpl(...countries);
 refs.countriesMarkUp.innerHTML =list;
    } else{
     const list= countriesListTpl(countries);
     refs.countriesMarkUp.innerHTML =list;
 };
};

function manyCountriesError (){
        refs.countriesMarkUp.innerHTML='';
        myAlert("Too many matches found. Please enter a more specific query!");
};


function myAlert(text) {
alert({
  text ,
  type: 'info',
});}

