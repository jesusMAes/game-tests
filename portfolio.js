//here modifies dom of portfolio, not game

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const burguerButton = document.getElementById('burguerButton')
let activeClass = 'active'
burguerButton.addEventListener('click', (e)=>{
  e.currentTarget.classList.toggle(activeClass)
})

const navButtons = gsap.utils.toArray(".nav-item a");
const panels =gsap.utils.toArray(".panel");

//nav animation
panels.forEach((panel,i) =>{
  ScrollTrigger.create({
    trigger: panel,
    start: "top 50%",
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
//introduction animation
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

//projects info
const projects = gsap.utils.toArray('.project');
let description;
let stack;

projects.forEach(project =>{
  project.addEventListener('mouseenter', ()=>{
    description = project.querySelector('.projectDescription')
    stack = project.querySelector('.stack')
   
    gsap.to(description,{
      height: '100%',
      color: '#fffe',
      paddingTop:'40px',
      display:'block',
      duration:.5
    })
    gsap.to(stack, {
      display:'block',
      duration:.1
    })
  })
  project.addEventListener('mouseleave', ()=>{
    description = project.querySelector('.projectDescription')
    stack = project.querySelector('.stack')
    gsap.to(stack, {
      display:'none',
      duration:.1
    })
    gsap.to(description,{
      height: '0px',
      display:'none',
      paddingTop:0,
      color:'transparent',
      duration:.5,
      ease: 'expo'
    },'<')
  })

})