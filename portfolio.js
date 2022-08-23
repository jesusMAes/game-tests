//here modifies dom of portfolio, not game

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const burguerButton = document.getElementById('burguerButton')
let activeClass = 'active'
burguerButton.addEventListener('click', (e)=>{
  e.currentTarget.classList.toggle(activeClass)
})

window.onload =(event)=>{
  burguerButton.click()
}

const navButtons = gsap.utils.toArray(".nav-item a");
const panels =gsap.utils.toArray(".panel");

//nav animation
panels.forEach((panel,i) =>{
  ScrollTrigger.create({
    trigger: panel,
    start: "top 60%",
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

const abouts = document.querySelectorAll('.about-block ');


abouts.forEach((about, i) =>{
  ScrollTrigger.create({
    trigger: about,
    start: "top 60%",
    onEnter: ()=>{
      let ps = about.querySelectorAll('p');
      gsap.fromTo(about,{
        y:50,
        opacity:0,
        duration:1,
      },
      {
        y:0,
        opacity:1,
        duration:1
      });
      ps.forEach(p =>{
        gsap.fromTo(p,{
          y:50,
          opacity:0,
          duration:1
        },{
          y:0,
          opacity:1,
          duration:1
        })
      })
    },
    onEnterBack:()=>{
      let ps = about.querySelectorAll('p');
      gsap.fromTo(about,{
        y:-50,
        opacity:0,
        duration:1,
      },
      {
        y:0,
        opacity:1,
        duration:1
      });
      ps.forEach(p =>{

        gsap.fromTo(p,{
          y:-50,
          opacity:0,
          duration:1
        },{
          y:0,
          opacity:1,
          duration:1
        })
      })
    },
    onLeave: ()=>{
      let ps = about.querySelectorAll('p');
      gsap.fromTo(about,{
        y:0,
        opacity:1,
        duration:1,
      },
      {
        y:50,
        opacity:0,
        duration:1
      });
      ps.forEach(p =>{

        gsap.fromTo(p,{
          y:0,
          opacity:1,
          duration:1
        },{
          y:50,
          opacity:0,
          duration:1
        })
      })
    },
    onLeaveBack: ()=>{
      let ps = about.querySelectorAll('p');
      gsap.fromTo(about,{
        y:0,
        opacity:1,
        duration:1,
      },
      {
        y:50,
        opacity:0,
        duration:1
      });
      ps.forEach(p =>{

        gsap.fromTo(p,{
          y:0,
          opacity:1,
          duration:1
        },{
          y:50,
          opacity:0,
          duration:1
        })
      })
    }
  })
})

const photo = document.querySelector('#picrewPhoto');
ScrollTrigger.create({
  trigger:photo,
  start: 'top 60%',
  onEnter:()=>{
    gsap.fromTo(photo,{
      opacity:0,
      x:100,
      duration:1
    },{
      opacity:1,
      x:0,
      duration:1
    })
  },
  onEnterBack:()=>{
    gsap.fromTo(photo,{
      opacity:0,
      x:100,
      duration:1
    },{
      opacity:1,
      x:0,
      duration:1
    })
  },
  onLeaveBack:()=>{
    gsap.fromTo(photo,{
      opacity:1,
      x:0,
      duration:1
    },{
      opacity:0,
      x:100,
      duration:1
    })
  }
})

const flipbox = document.querySelector('.flip-box')
const imgLabel = document.querySelector('.photo-label')

flipbox.addEventListener('mouseover', ()=>{
  gsap.fromTo(imgLabel,{
    opacity:0,
    y:10,
  },{
    opacity:1,
    y:0,
    duration:.3
  })
})
flipbox.addEventListener('mouseleave', ()=>{
  gsap.fromTo(imgLabel,{
    opacity:1,
    y:0,
  },{
    opacity:0,
    y:10,
    duration:.3
  })
})

flipbox.addEventListener('mouseout', ()=>{
   flipInner.style.transform='rotateY(0deg)'
 })

//submit form
let user_name = document.getElementById('user_name');
let user_email = document.getElementById('user_email');
let user_message = document.getElementById('contact-textArea');
let submitButton = document.getElementById('contact-form');

console.log(user_name)
console.log(user_email)
console.log(user_message)
submitButton.addEventListener('submit', ()=>{
  user_name.value='';
  user_email.value='';
  user_message.value='';
  user_message.placeholder='Thanks for contact me!!'
})
