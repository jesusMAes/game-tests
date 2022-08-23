import DialogModalPlugin from './dialog_plugin/dialog__plugin.js'
import mainScreen from './scenes/mainscreen.js'
import RoomScene from './scenes/roomScene.js'
import MurciaScene from './scenes/murciaScene.js'
import UniversityScene from './scenes/universityScene.js'
import JobScene from './scenes/jobScene.js'
import trialScene from './scenes/trialScene.js'
import switchScene from './scenes/switchScene.js'

let config ={
  type:Phaser.AUTO,
  width:700,
  height:500,
  zoom:2.5,
  parent: 'game-container',
  dom: {
    createContainer:true,
  },

  title: 'Take a walk',
  scene: [mainScreen,RoomScene,JobScene, MurciaScene, UniversityScene],
  plugins:{
    scene:[{
      key: "gridEngine",
      plugin:GridEngine,
      mapping:"gridEngine"
    },
    {
      key: 'DialogModalPlugin',
      plugin: DialogModalPlugin,
      mapping: 'dialogModal'
    }]
  },
  physics:{
    default: 'arcade',
    arcade:{
      gravity:{y:0},
      debug:false
    }
  }
}


let game =new Phaser.Game(config)

//disable keys when not on screen
let divGame = document.getElementById('game-container')

var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

window.addEventListener('scroll', function(event){
  if(isInViewport(divGame)){
    game.input.keyboard.enabled=true

  }else{
    game.input.keyboard.enabled=false

  }
})