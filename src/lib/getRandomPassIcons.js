import getAllPassIcons from './getAllPassIcons';

export default function getRandomPassIcons() {
  return getAllPassIcons()
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);
}
