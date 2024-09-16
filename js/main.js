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


let body=document.querySelector('body');
const toggle=document.getElementById('toggle');
let indicator=document.querySelector('.indicator');
let me=document.querySelector('.gradient-text');
let navbar=document.querySelector('.navbar');
let anc=document.querySelectorAll('a');
let myself=document.getElementById('me');


let modes=['m1.jpg','m2.jpg','m3.jpg'];
let currentIndex=0;
function fav(){
  let link=document.getElementById('favicon');
  link.href='/images/'+modes[currentIndex];
  currentIndex=(currentIndex+1) % modes.length;

}
setInterval(fav,1000);





function applyMode(mode){
  if(mode==='dark'){
    body.classList.replace('light','dark');
    toggle.style.backgroundColor="white"
    toggle.classList.remove('active');
    toggle.style.backgroundImage='url(/images/pexels-arnie-chou-304906-1229042.jpg)'
    toggle.style.backgroundPosition=''
    indicator.style.transition='0.5s';
    me.style.backgroundImage='url(/images/mortext.jpg)'
    navbar.style.backgroundImage='linear-gradient(315deg, #130f40 0%, #000000 74%),url(/images/sidebars.jpeg)';
    myself.style.borderColor='#deff58'
    
    myself.addEventListener('mouseenter',()=>{
      myself.style.borderColor="#FF6600";
    })
    myself.addEventListener('mouseleave',()=>{
       myself.style.borderColor="#deff58";
    })
    
    
  }
  else{
    body.classList.replace('dark','light');
    toggle.classList.add('active');
    toggle.style.backgroundImage='url(/images/morsky.jpg)'
    toggle.style.backgroundSize='cover';
    toggle.style.filter='brightness(1.5)'
    me.style.backgroundImage='url(/images/wakdn.webp)';
    toggle.style.backgroundPosition='-100px'
    navbar.style.backgroundImage='linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%),url(/images/sidebars.jpeg)';
    myself.style.borderColor='#00a6ff'
    myself.addEventListener('mouseenter',()=>{
      myself.style.borderColor="#d7aef3";
    })
    myself.addEventListener('mouseleave',()=>{
      myself.style.borderColor="#00a6ff";
    })
    
  }
  
}


window.onload=()=>{
  const savedMode=localStorage.getItem('theme')||'dark';
  applyMode(savedMode);
  
  
};

toggle.addEventListener('click',()=>{
  const currentMode=body.classList.contains('dark')?'dark':'light';
  const newMode=currentMode==='dark'?'light':'dark';
  
  applyMode(newMode);
  
  localStorage.setItem('theme',newMode);
})
