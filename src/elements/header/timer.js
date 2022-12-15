import { checkWin } from "../../handlers/on-click-handler";

const time = document.createElement('p');

let seconds = localStorage.getItem('time') ?? 0;

const updateTime = () => {
  if (!checkWin()) seconds++;
  const mins = `${Math.floor(seconds / 60)}`.padStart(2, '0');
  const secs = `${seconds % 60}`.padStart(2, '0');
  time.textContent = mins + ':' + secs;

  setTimeout(updateTime, 1000);
}

const resetTime = () => seconds = 0;
const saveTime = () => localStorage.setItem('time', seconds);

export { time, updateTime, resetTime, saveTime };