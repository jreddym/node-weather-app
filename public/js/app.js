const weatherFormElem = document.querySelector('form');
const searchElem = weatherFormElem.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherFormElem.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchElem.value;
  messageOne.textContent = 'Loading .....';
  messageTwo.textContent = '';
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
    });
  });
});
