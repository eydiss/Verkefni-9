const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companiesSection;

  function init(companies) {
    companiesSection = companies;

  }


  function fetchData() {

  }

  function show() {
    
  }



  // fengið úr fyrirlestri 11
  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }


  // fengið úr fyrirlestri 10
  function el(name, ...children) {
    const element = document.createElement(name);
    for (const child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
    return element;
  }


  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('.companies');
  program.init(companies);
});
