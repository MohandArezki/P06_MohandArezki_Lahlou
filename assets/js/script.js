/* 
    On recupére les infos  (slides, nav-right, nav-left) des differents
    sliders existants
*/

const slides = [...document.querySelectorAll('.slide')];
const nxtBtn = [...document.querySelectorAll('#nav-right')];
const preBtn = [...document.querySelectorAll('#nav-left')];

/* sur chaque slider*/
slides.forEach((item, i) => {
  /* 
     Récuperer la largeur du slide 
  */
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;
  /* 
     Passer au slide suivant
  */  
  nxtBtn[i].addEventListener('click', () => {
      item.scrollLeft += containerWidth;
  })
  /* 
     Revenir au slide précédent
  */
  preBtn[i].addEventListener('click', () => {
      item.scrollLeft -= containerWidth;
  })
})

function toggleMenu(){
    let submenu = document.getElementById("submenu_categories");
    submenu.classList.toggle("open-menu");

}