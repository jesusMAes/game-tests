
export default class AudioManager{
constructor(){
  this.Sounds = [] //array of howlers

}

init(){//prevent autoplay
  let controler = document.getElementById('audio')
   //check for previous stopped 
  if(controler.checked == false){
    this.Sounds.forEach(sound =>{
      sound.mute(true)
    })
  }else{
      this.Sounds.forEach(sound =>{
        sound.mute(false)
      })
  }
  
}

mute(e){
  let checked = e.target.checked

  if(checked==false){
    this.Sounds.forEach(sound =>{
      sound.mute(true)
    })
  }else{
    this.Sounds.forEach(sound =>{
      sound.mute(false)
    })
  }

}

 clean(){
  //called when switching scenes, stop all music of that scene
  this.Sounds.forEach(sound =>{
    sound.mute(true)
  })
 }
}

//class to control all sounds