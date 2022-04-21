const initApp = async () => {
  // get json data
  const contacts = await fetchData();
  // render data to page
  // add listeners
};

document.addEventListener('DOMContentLoaded', initApp);

const fetchData = async () => {
  const response = await fetch('https://randomuser.me/api/?results=12');
  const data = await response.json();

  return data.results;
};
