const initApp = async () => {
  // get json data
  const contacts = await fetchData();
  // render data to page
  renderContacts(contacts);
  // add listeners
  listenForLikes();
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
  like.classList.add('like', 'like-no');
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

const listenForLikes = () => {
  const likes = document.querySelectorAll('.like');

  likes.forEach((like) => {
    like.addEventListener('click', (e) => {
      e.target.classList.toggle('like-no');
      e.target.classList.toggle('like-yes');

      if (e.target.classList.contains('like-yes')) {
        console.log('✅💾Saving Favorite...');
        getFaveData(e.target);
      } else {
        console.log('❌ Removing Favorite...');
        getFaveData(e.target);
      }
    });
  });
};

const getFaveData = (elem) => {
  const parent = elem.parentElement;
  const img = parent.querySelector('img').src;
  const name = parent.querySelector('h2').textContent;
  const email = parent.querySelector('p').textContent;
  const { firstName, lastName } = name.split(' ');

  const faveObj = {
    img,
    firstName,
    lastName,
    email,
  };

  console.log(faveObj);
};
