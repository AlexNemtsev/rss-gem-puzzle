const form = document.createElement('form');
const ngButton = document.createElement('button');
const fieldSizeSelect = document.createElement('select');

const generateSizeOptions = () => {
  const options = [];

  for (let i = 3; i <= 8; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', i);

    if (i === 4) option.setAttribute('selected', true);

    option.innerHTML = `${i}x${i}`;
    options.push(option);
  }

  return options;
}

fieldSizeSelect.append(...generateSizeOptions());

form.className = 'form';
ngButton.type = 'submit';
ngButton.innerHTML = '<div class="rect">New game</div>';

form.append(ngButton);
form.append(fieldSizeSelect);

export { form, fieldSizeSelect };