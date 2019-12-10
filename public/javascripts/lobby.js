const validateResponse = response => {
  if (response.status < 300) {
    return response;
  } else {
    throw `Received ${response.status}`;
  }
};

const jsonifyResponse = response => response.json();

const gameContainer = game => {
  const icon = document.createElement('i');

  icon.classList.add('material-icons', 'right');
  icon.appendChild(document.createTextNode('arrow_forward'));

  const link = document.createElement('a');

  link.setAttribute('href', `/games/${game.id}`);
  link.classList.add('btn', 'waves-effect', 'waves-light', 'blue');
  link.appendChild(document.createTextNode(`Join game ${game.id}`));
  link.appendChild(icon);

  const listItem = document.createElement('li');
  listItem.appendChild(link);

  return listItem;
};

const renderGames = games => {
  const gameList = document.createElement('ul');

  games.forEach(game => {
    gameList.appendChild(gameContainer(game));
  });

  const activeGamesContainer = document.querySelector('.active-games');
  activeGamesContainer.append(gameList);
};

fetch('/games', { credentials: 'include' })
  .then(validateResponse)
  .then(jsonifyResponse)
  .then(renderGames)
  .catch(error => console.log(error));
