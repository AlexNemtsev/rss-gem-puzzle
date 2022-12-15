const top10Header = document.createElement('h2');
const top10List = document.createElement('ol');
top10List.className = 'top-10-list';

let top10;

const loadTop = () => top10 = JSON.parse(localStorage.getItem('top')) ?? {
  '3': [],
  '4': [],
  '5': [],
  '6': [],
  '7': [],
  '8': [],
};

const setTop = (fieldSize) => {
  top10Header.textContent = `Top ${fieldSize}x${fieldSize}`;

  const items = top10List.children;

  while (items.length !== 0) {
    items[0].remove();
  }

  for (let i = 0; i < 10; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = (top10[fieldSize][i]) ? `${top10[fieldSize][i]} moves` : '';
    top10List.append(listItem);
  }
}

const insertRecord = (moves, fieldSize) => {
  const pushAndSort = (moves, fieldSize) => {
    top10[fieldSize].push(moves);
    top10[fieldSize].sort((a, b) => a - b);
    localStorage.setItem('top', JSON.stringify(top10));
  }

  if (top10[fieldSize].length < 10) {
    pushAndSort(moves, fieldSize, top10);
  } else {
    if (moves < Math.max(...top10[fieldSize])) {
      top10[fieldSize].pop();
      pushAndSort(moves, fieldSize, top10);
    }
  }
}

export { top10Header, top10List, loadTop, setTop, insertRecord }