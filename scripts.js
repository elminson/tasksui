const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
logo.setAttribute('width','350px');
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http://130.211.234.175/todo/public/api/tasks', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
      console.log(data.data);
      data.data.forEach(item => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = item.task;

      const p = document.createElement('p');
      item.description = item.task_description.substring(0, 300);
      p.textContent = `${item.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();
