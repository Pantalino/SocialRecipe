document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('main');
  const buttonSide = document.querySelector('#buttonSide');

  buttonSide.addEventListener('click', () => {
    if (sidebar.style.left === '' || sidebar.style.left === '0px') {
      sidebar.style.left = '-250px';
      main.style.marginLeft = '0';
    } else {
      sidebar.style.left = '0';
      main.style.marginLeft = '260px';
    }
  });
});