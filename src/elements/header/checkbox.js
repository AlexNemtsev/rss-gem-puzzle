let isSoundOn = localStorage.getItem('sound') ?? '';

const checkBoxLabel = document.createElement('label');
const checkBox = document.createElement('input');
checkBox.checked = isSoundOn;

checkBox.type = 'checkbox';
checkBoxLabel.textContent = 'Sound';
checkBoxLabel.append(checkBox);

checkBox.addEventListener('change', (event) => {
  const checkBox = event.target;

  if (checkBox.checked) {
    isSoundOn = 1;
  } else {
    isSoundOn = '';
  }
  localStorage.setItem('sound', isSoundOn);
});

export { checkBoxLabel, isSoundOn };