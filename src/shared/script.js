  // resp_menu
  const togglerItem = document.querySelector(".toggler_item");
  const respMenu = document.querySelector(".resp_menu");
  const togglerMenu = document.getElementById('menu');
 
  respMenu.addEventListener('click', () =>{
    togglerItem.classList.toggle('open');
    togglerMenu.classList.toggle('resp_toggler_menu');
   })

let headerNavigationLink = document.getElementsByClassName('header_navigation_link');
let rightSide = document.getElementById('right_side');

const checkPage = (page) => window.location.pathname.split('/').slice(-1)[0] === `${page}.html`;