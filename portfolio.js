//here modifies dom of portfolio, not game

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const burguerButton = document.getElementById('burguerButton')
let activeClass = 'active'
burguerButton.addEventListener('click', (e)=>{
  e.currentTarget.classList.toggle(activeClass)
})

const navButtons = gsap.utils.toArray(".nav-item a");
const panels =gsap.utils.toArray(".panel");
console.log(navButtons)
console.log(panels)

panels.forEach((panel,i) =>{
  ScrollTrigger.create({
    trigger: panel,
    start: "start 50%",
    onEnter:()=>{
      navButtons.forEach((e)=>{
        e.classList.remove("active");
      });
      navButtons[i].classList.add("active");
    },
    onEnterBack: ()=>{
      navButtons.forEach((e) =>{
        e.classList.remove("active");
      });
      navButtons[i].classList.add("active");
    }
  });
});

let tl = gsap.timeline()
//intro effect
tl.from('#myname',{
  x:-1000,
  duration:.5,
})
tl.to('#myname',{
  x:150,
  rotation: 20,
  duration: .5,
})
tl.to('#avatar',{
  y:-150,
  x:130,
  duration:.5
},'<')
tl.to('#myname', {
  x:0,
  rotation:0,
  duration:.1
})
tl.to('#avatar',{
  y:0,
  x:0,
  duration:1
},'<')
tl.to('#myname',{
  marginBottom:40,
  duration:.2
},'<')
tl.to('#myname',{
  marginBottom:0
},'>')


let compressed = 'compressed'
let navbar = document.getElementById('links')
burguerButton.addEventListener('click',()=>{
  navbar.classList.toggle(compressed)
  console.log(navbar)
})
