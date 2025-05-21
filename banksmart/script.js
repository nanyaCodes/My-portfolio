const navbarToggler = document.querySelector('.navbar-toggler');
const collapse = document.querySelector('.collapse');

navbarToggler.addEventListener('click', () =>{
navbarToggler.classList.toggle('active');
collapse.classList.toggle('active');
})