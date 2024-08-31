AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation//
})


let mes=document.getElementById('me');
let spans=document.querySelectorAll('span');
let bt=document.querySelectorAll('div')


function colorChange(colorss){
  spans.forEach(span=>{
    span.style.color=colorss;

  })

}
function changeColor(colors){
  bt.forEach(span=>{
    span.style.color=colors;

  })
}

mes.addEventListener('mouseover',()=>{
  changeColor('#96C9F4');
  colorChange("#A084E8");

  dynamic();

})

mes.addEventListener('mouseleave',()=>{
  changeColor('');
  colorChange('');
})


