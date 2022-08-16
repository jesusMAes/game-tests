import Npc from "../classes/Npc.js";
import Player from "../classes/Player.js";
import {universityEvents} from '../data/universityEvents.js' 

//Variables
let dialogBox = document.getElementById('UI');
let blackScreen = document.getElementById('blackScreen')//for transitions
let gameContainer = document.getElementById('game-container')

let talking = document.createElement('div') //name of the person that is talking
talking.id = 'name';

//player variables
let player;

//events
let eventData = universityEvents //store all events
let mapEvents =[]; //store position of the events in the map
let currentEventData; //store current event data
let interactButton;
let dataPosition;

let currentDialog //stores number of dialog
let actualPhrase; //temporary stores dialog content
let whoTalk; 
let phraseContent; //stores  speech content 
let i = 0 //count letters


//scene class
class UniversityScene extends Phaser.Scene{
  constructor(){
    super('UniversityScene')
  }

  init(){
    //prepare data

  }

  preload(){
    //load map & tileset
    this.load.image('tileset', './Assets/Maps/pokemonTileset.png')
    this.load.tilemapTiledJSON('universityMap','./Assets/Maps/universityMap.json' )

     //player & emotions
     this.load.spritesheet('player', './Assets/Sprites/player trial1.png',{frameWidth:31.333, frameHeight:33})
     this.load.spritesheet('emotions', './Assets/Sprites/emotions.png',{frameWidth:16, frameHeight:16})
  }

  create(){
    //camera
    this.cameras.main.zoom = 1.6
    this.cameras.main.width = 768;

    //map 
    const universityMap = this.make.tilemap({key: 'universityMap'});
    const tileset = universityMap.addTilesetImage('pokemonTileset', 'tileset');

    //render
    universityMap.layers.forEach(layer =>{
      universityMap.createLayer(layer.name, tileset, 0,0)
    })

    //player
   const playerSpawn =  universityMap.findObject('Player', obj => obj.name==='Player')
   player = new Player({
    scene:this,
    x:playerSpawn.x,
    y:playerSpawn.y,
    spritesheet: 'player'
   })
   player.init()

   //get position of the events in the map
   universityMap.findObject('Events', event =>{
    mapEvents.push(event)
   })
   
   

    //interact button
    interactButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    //grid Engine
    const gridEngineConfig ={
    characters:[
       {
        id:'player', 
        sprite: player,
        walkingAnimationMapping: {
          up:{
            leftFoot:1,
            standing:0,
            rightFoot:2
            },
          down:{
            leftFoot:4,
            standing:3,
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
        startPosition: {x: player.x, y:player.y},
        speed:5
        }
      ]
     }
     
   this.gridEngine.create(universityMap, gridEngineConfig)
   

       //camera follow player
   this.cameras.main.setBounds(0,0)
   this.cameras.main.startFollow(player, true)

  }//END CREATE


  update(){
  //loop of the game
  //move emotions
  player.emotions.x = player.x+7
  player.emotions.y = player.y-5

  //check for events
  mapEvents.forEach(event =>{
    this.checkEvent(event)
  })
  //KEYBOARD
  const cursors = this.input.keyboard.createCursorKeys();
  if(cursors.left.isDown && player.movable){
    this.gridEngine.move('player','left')
  }else if(cursors.right.isDown && player.movable){
    this.gridEngine.move('player', 'right')
  }else if(cursors.up.isDown && player.movable){
    this.gridEngine.move('player', 'up')
  }else if(cursors.down.isDown && player.movable){
    this.gridEngine.move('player', 'down')
  }

  }//END UPDATE

  //checkEvent
  checkEvent(event){
    //check distance & activate emotions
    let distance  = Phaser.Math.Distance.Between(player.getCenter().x,player.getCenter().y, event.x, event.y)

    // if near check for activation
    if(distance < 55 && distance > 0){
      if(interactButton.isDown && interactButton.keyCode == 65 && player.isTalking   == false){
        this.playEvent(event)
      }else if(interactButton.isDown && interactButton.keyCode == 65){
        this.keepPlaying(event)
      }
    }

    //activate emotion
    if(distance < 65 && distance > 60){
      let isYet =false 
      for(let i=0; i<player.nearObjects.length;i++){ //prevent double activation
        if(event.id == player.nearObjects[i].id){
          isYet=true
        }
      }
      if(isYet ==false){
        player.nearObjects.push(event)
      }
      player.emotes()
    }else if(distance >65 && distance <70){
      for(let i=0; i<player.nearObjects.length;i++){
        if(event.id == player.nearObjects[i].id){
          player.nearObjects.splice(i,1)
        }
      }
      if(player.nearObjects.length==0){
        player.emotions.visible = false
      }
    }
  }//CHECK EVENT

  playEvent(event){
    //same algorithm that dialogs
    //pause player
    player.movable = false;
    player.isTalking = true
    interactButton.keyCode = 80;

    //get data of that event
    eventData.forEach(object =>{
      if(event.name == object.id){
        currentEventData = object;
        dataPosition = object.position
      }
    })
    //get the content of dialog
    
    currentDialog = currentEventData.currentDialog
    let numberOfCurrentPhrase = currentEventData.content[currentDialog].currentPhrase 
    actualPhrase = currentEventData.content[currentDialog].content[numberOfCurrentPhrase];
    whoTalk = actualPhrase[0];
    phraseContent = actualPhrase[1]

    //display dialog box
     dialogBox.style.display = 'block';
     dialogBox.innerHTML=''
     dialogBox.appendChild(talking);
     talking.innerHTML = whoTalk

     //writeContent
    this.eventWritter(currentEventData)
    
  }

  eventWritter(currentEventData){
    if(i < phraseContent.length){
      dialogBox.innerHTML += phraseContent.charAt(i);
      i++
      this.time.addEvent({ //less problems with scope that timeout
        delay:50,
        callback: this.eventWritter,
        args: [currentEventData],
        callbackScope: this
      })
    }else{
      i=0;
      //next phrase
      //acces to next phrase
      let numberofPhrase = eventData[dataPosition].content[eventData[dataPosition].currentDialog].currentPhrase

      if(eventData[dataPosition].content[currentDialog].content[numberofPhrase+1] =!undefined){
        //access to object and update its currentPhrase
        eventData[dataPosition].content[currentDialog].currentPhrase +=1;
        
      }
      interactButton.keyCode = 65;
    }
  }//eventWritter

  keepPlaying(event){
    interactButton.keyCode = 80

    //clean dialog box 
    dialogBox.innerHTML=''
    dialogBox.appendChild(talking);

    //get content
    let numberofPhrase = eventData[dataPosition].content[currentDialog].currentPhrase
    actualPhrase = eventData[dataPosition].content[currentDialog].content[numberofPhrase]
    console.log(actualPhrase)

  }

}//END OF CLASS

export default UniversityScene