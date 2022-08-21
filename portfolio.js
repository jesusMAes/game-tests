//here modifies dom of portfolio, not game



const burguerButton = document.getElementById('burguerButton')
let activeClass = 'active'
burguerButton.addEventListener('click', (e)=>{
  e.currentTarget.classList.toggle(activeClass)
})

let tl = gsap.timeline()

tl.from('#myname',{
  x:-1000,
  duration:.2,
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