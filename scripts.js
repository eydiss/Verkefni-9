const API_URL = 'https://apis.is/company?name=';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
const program = (() => {
  let companies;
  const results = document.querySelector('.results');

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

  // fengið úr fyrirlestri 11
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function displayError(error) {
    empty(results);
    results.appendChild(document.createTextNode(error));
  }

  function displayCompany(companiesList) {
    if (companiesList.length === 0) {
      displayError('Fann ekki fyrirtæki');
      return;
    }

    empty(results);

    for (const item of companiesList) {
      const makeList = results.appendChild(el('div', el('dl', el('dt', 'Nafn'), el('dd', item.name), el('dt', 'Kennitala'), el('dd', item.sn))));
      if (item.active === 1) {
        makeList.className = 'company company--active';
      } else {
        makeList.className = 'company company--inactive';
      }
    }
  }

  // Sækir loading.gif ef síða er lengi að loadast
  function loadingGif() {
    empty(results);

    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading');
    const loadingImage = document.createElement('img');
    loadingImage.src = 'loading.gif';
    const loadingText = document.createElement('p');
    loadingText.innerHTML = 'Leita að fyrirtækjum...';

    loadingElement.appendChild(loadingImage);
    loadingElement.appendChild(loadingText);
    results.appendChild(loadingElement);
  }

  // Sækir upplýsingar af apis.is
  function fetchData(company) {
    fetch(`${API_URL}${company}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa kom upp');
      })
      .then((data) => {
        displayCompany(data.results);
      })
      .catch((error) => {
        displayError('Villa við að sækja gögn');
        console.error(error);
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    loadingGif();
    const input = e.target.querySelector('input');
    if (input.value.length === 0) {
      displayError('Lén verður að vera strengur');
    } else {
      fetchData(input.value);
    }
  }

  function init(_companies) {
    companies = _companies;

    const form = companies.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.querySelector('.companies');
  program.init(companies);
});
