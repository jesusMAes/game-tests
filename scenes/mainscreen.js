import Player from "../classes/Player.js";
import AudioManager from "../classes/AudioManager.js"
import {music} from '../data/music.js';

let blackScreen = document.getElementById('blackScreen')//for transitions

//sound 
let mainscreenMusic = new Howl({
  src:['./Assets/Sounds/roomScene.mp3'],
  autoplay:true,
  loop:true,
  volume:0.7
});

let audioButton = document.getElementById('audio')

audioButton.addEventListener('click', function(e){
  music.mute(e)
},false )

let scene;
let player;
let counEmotions =0;
let arrayEmotions = ['question', 'confused', 'exclamation', 'sleep'] 
let random

let startButton = document.createElement('button');
startButton.id = 'startButton';
startButton.innerHTML = 'Start';
let gameContainer = document.getElementById('game-container')
gameContainer.appendChild(startButton)

class mainScreen extends Phaser.Scene{
  constructor(){
    super('MainScreen')
  }

  init(){
      //sound
    music.Sounds=[mainscreenMusic]
    music.init()
    
  }
  preload(){
     //player
     this.load.spritesheet('player', './Assets/Sprites/player trial1.png',{frameWidth:31.333, frameHeight:33})
     this.load.spritesheet('emotions', './Assets/Sprites/emotions.png',{frameWidth:16, frameHeight:16})

     //load maps, sprites and assets
    this.load.image('interiors1', './Assets/Maps/InteriorTileset/pokemonInteriors 1.png')
    this.load.image('interiors2', './Assets/Maps/InteriorTileset/pokemonInteriors 2.png')
    this.load.image('interiors3', './Assets/Maps/InteriorTileset/pokemonInteriors 3.png')
    this.load.image('interiors4', './Assets/Maps/InteriorTileset/pokemonInteriors 4.png')
    this.load.tilemapTiledJSON('mainscene', './Assets/Maps/mainSceneMap.json')
  }

  create(){
    scene =this
    this.cameras.main.zoom=3
    this.cameras.main.width=900

    const map  = this.make.tilemap({key:'mainscene'})

    const interiors1 = map.addTilesetImage('pokemonInteriors 1', 'interiors1')
    const interiors2 = map.addTilesetImage('pokemonInteriors 2', 'interiors2')
    const interiors3 = map.addTilesetImage('pokemonInteriors 3', 'interiors3')
    const interiors4 = map.addTilesetImage('pokemonInteriors 4', 'interiors4')

    const tileset =[interiors1, interiors2, interiors3, interiors4]
  
    map.layers.forEach(layer =>{   
      map.createLayer(layer.name, tileset, 0,0)
     })

    //player
    const spawn = map.findObject('Player', obj => obj.name==='Player')
    player = new Player({
      scene:this,
      x:spawn.x,
      y:spawn.y,
      spritesheet:'player'
    })
    player.setSize(25,25)
    player.setScale(1.2)
    player.init()

    const gridEngineConfig = {
      characters:[
        {
          id: 'player',
          sprite: player,
          walkingAnimationMapping: {
            up:{
              leftFoot:1,
              standing:0,
              rightFoot:2
            },
            down:{
              leftFoot:4,
              standing:0,
              rightFoot:5
            },
            left:{
              leftFoot:7,
              standing:6,
              rightFoot:8
            },
            right:{
              leftFoot:10,
              standing:9,
              rightFoot:11
            }
          },
          startPosition: { x:player.x, y:player.y},
          speed:5.5
        }
      ]
    }

    this.gridEngine.create(map, gridEngineConfig)

       //follow movement
       this.cameras.main.setBounds(0,0)
       this.cameras.main.startFollow(player,true)

       player.emotes('confused')

       startButton.addEventListener('click', this.begginGame.bind(this));
  }

  update(){
    player.emotions.x = player.x+10
    player.emotions.y = player.y-3

    counEmotions++
    if(counEmotions >= 500){
      random = Math.floor(Math.random()*5)
      player.emotes(arrayEmotions[random])
      counEmotions=0;
    }
    
  }

  begginGame(){
    music.clean();
    gameContainer.removeChild(startButton)
         //gsap animation
         gsap.to('#blackScreen',{
          opacity:1,
          duration:0.5,
          onComplete:()=>{
            gsap.to('#blackScreen',{
              backgroundColor: 'white',
              duration: 0.2,
              onComplete: ()=>{
                gsap.to('#blackScreen',{
                  opacity:0,
                  backgroundColor:'black'
                })
              }
            })
          }
        })
        this.time.addEvent({
          delay:500,
          loop:false,
          callback:()=>{
            this.scene.start('RoomScene')
            this.scene.pause()
            
          }
        })
  }
}

export default mainScreen