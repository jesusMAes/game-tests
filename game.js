import DialogModalPlugin from './dialog_plugin/dialog__plugin.js'
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
  scene: [RoomScene,JobScene, MurciaScene, UniversityScene, ],
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


new Phaser.Game(config)

