const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companies;


  function displayError(error) {
    const container = companies.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }

  function loadingGif() {
    const container = companies.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    const loadingImage = document.createElement('img');
    loadingImage.src = 'loading.gif';
    const loadingText = document.createElement('p');
    loadingText.innerHTML = 'Leita að fyrirtækjum...';

    loadingElement.appendChild(loadingImage);
    loadingElement.appendChild(loadingText);
    container.appendChild(loadingElement);
  }

  function fetchData(company) {
    fetch(`${API_URL}${company}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Villa kom upp');
      })
      .then((data) => {
        console.log(data.results);
        displayCompany(data.results);
      })
      .catch((error) => {
        displayError('Villa!');
        console.error(error);
      })
  }

  function onSubmit(e) {
    e.preventDefault();
    loadingGif();
    const input = e.target.querySelector('input');

    fetchData(input.value);
  }

  function init(_companies) {
    companies = _companies;

    const form = companies.querySelector('form');
    form.addEventListener('submit', onSubmit);
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
