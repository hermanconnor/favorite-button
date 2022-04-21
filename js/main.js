const initApp = async () => {
  // get json data
  const contacts = await fetchData();
  // render data to page
  renderContacts(contacts);
  // add listeners
};

document.addEventListener('DOMContentLoaded', initApp);

const fetchData = async () => {
  const response = await fetch('https://randomuser.me/api/?results=12');
  const data = await response.json();

  return data.results;
};

const renderContacts = (contacts) => {
  const main = document.querySelector('main');
  const cardsArray = [];

  contacts.forEach((contact) => {
    const elementObj = createCardElements();
    const card = createPersonCard(elementObj, contact);
    cardsArray.push(card);
  });

  cardsArray.forEach((card) => {
    main.appendChild(card);
  });
};

const createCardElements = () => {
  const article = document.createElement('article');
  const img = document.createElement('img');
  const details = document.createElement('div');
  const like = document.createElement('div');
  const name = document.createElement('h2');
  const email = document.createElement('p');
  const phone = document.createElement('p');

  return { article, img, details, like, name, email, phone };
};

const createPersonCard = (elemObj, person) => {
  const { article, img, details, like, name, email, phone } = elemObj;

  details.className = 'details';
  like.classList.add('like', 'unfavorite');
  name.textContent = `${person.name.first} ${person.name.last}`;
  img.src = person.picture.large;
  email.textContent = person.email;
  phone.textContent = person.cell;

  article.appendChild(img);
  details.appendChild(name);
  details.appendChild(email);
  details.appendChild(phone);
  article.appendChild(details);
  article.appendChild(like);

  return article;
};
