'use strict';



/**
 * MOBILE NAVBAR TOGGLE
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});


window.addEventListener('scroll', function() {
  var logo = document.querySelector('.logo');
  var scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    logo.style.animation = 'scrollAnimation 2s forwards';
  } else {
    logo.style.animation = 'none';
  }
});