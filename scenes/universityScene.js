import Npc from "../classes/Npc.js";
import Player from "../classes/Player.js";
import {universityEvents} from '../data/universityEvents.js' ;
import {universityNpcs} from '../data/universityNpcs.js'

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

//NPC VARIABLES
let npcData = universityNpcs;
let allNpcs = [];
let talkContent;
let currentPhrase;
//talkContent phrase and whotalk reuse the event variables

//switchZones
let switchZones = []

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

     //Npc Sprites
     this.load.spritesheet('teacher1', './Assets/Sprites/teacher1.png',{frameWidth:32, frameHeight: 32})
     this.load.spritesheet('teacher2', './Assets/Sprites/teacher2.png',{frameWidth:32, frameHeight: 32})
     this.load.spritesheet('teacher3', './Assets/Sprites/teacher3.png',{frameWidth:32, frameHeight: 32})
     this.load.spritesheet('teacher4', './Assets/Sprites/teacher4.png',{frameWidth:32, frameHeight: 32})
     this.load.spritesheet('teacher5', './Assets/Sprites/teacher5.png',{frameWidth:32, frameHeight: 32})
     this.load.spritesheet('teacher6', './Assets/Sprites/teacher6.png',{frameWidth:30.66, frameHeight: 34.7})
     this.load.spritesheet('janitor', './Assets/Sprites/janitor.png',{frameWidth:31, frameHeight: 34.25})
     this.load.spritesheet('student', './Assets/Sprites/student.png',{frameWidth:31, frameHeight: 33})

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
   
   //create npcs

   for(let i=0;i <npcData.length; i++){
    //find npc position in Tiled map
    const npcSpawn = universityMap.findObject('Npcs', npc => npc.name == npcData[i].id);
    //create npc and insert it into array 
    allNpcs[i] = new Npc({
      scene: this,
      x: npcSpawn.x,
      y: npcSpawn.y,
      spritesheet: npcData[i].sprite,
      id: npcData[i].id,
      mapping: npcData[i].animationMapping,
      canTalk: npcData[i].canTalk,
      currentDialog: npcData[i].currentDialog,
      dialogs: npcData[i].dialogs,
      randomMove: npcData[i].randomMove,
    })
  }

    //activate npcs emotions
    allNpcs.forEach(npc =>{
      npc.init()
    })

    //get switchZones
    universityMap.findObject('changeZone', zone =>{
      switchZones.push(zone)
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

    //add npcs to grid engine
   allNpcs.forEach(npc =>{
    gridEngineConfig.characters.push({
      id: npc.id,
      sprite: npc,
      walkingAnimationMapping:{
        up:{
          leftFoot:npc.mapping.up.leftFoot,
          standing: npc.mapping.up.standing,
          rightFoot: npc.mapping.up.rightFoot
        },
        down:{
          leftFoot:npc.mapping.down.leftFoot,
          standing: npc.mapping.down.standing,
          rightFoot: npc.mapping.down.rightFoot
        },
        left:{
          leftFoot: npc.mapping.left.leftFoot,
          standing: npc.mapping.left.standing,
          rightFoot: npc.mapping.left.rightFoot
        },
        right: {
          leftFoot: npc.mapping.right.leftFoot,
          standing: npc.mapping.right.standing,
          rightFoot: npc.mapping.right.rightFoot
        }
      },
      startPosition:{x: npc.x, y: npc.y},
      speed: 2
    })
   })
     
   this.gridEngine.create(universityMap, gridEngineConfig)
   
   //move npcs
   allNpcs.forEach(npc =>{
    if(npc.randomMove != 0)
    this.gridEngine.moveRandomly(npc.id, 2, npc.randomMove)
   })
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

  //check for npcs
  allNpcs.forEach(npc =>{
    if(npc.canTalk == true){
      this.checkNpc(npc)
    }
  })

   //check for scene change
   switchZones.forEach(zone =>{
    this.switchZones(zone)
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
      if(interactButton.isDown && interactButton.keyCode == 65 && player.isTalking == false){
        this.playEvent(event)
      }else if(interactButton.isDown && interactButton.keyCode == 65){
        this.keepPlaying()
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
    console.log(currentEventData.currentDialog)
    let numberOfCurrentPhrase = currentEventData.dialogs[currentDialog].currentPhrase 
    
    actualPhrase = currentEventData.dialogs[currentDialog].content[numberOfCurrentPhrase];
    whoTalk = actualPhrase[0];
    phraseContent = actualPhrase[1]

    //display dialog box
     dialogBox.style.display = 'block';
     dialogBox.innerHTML=''
     dialogBox.appendChild(talking);
     talking.innerHTML = whoTalk

     //writeContent
    this.eventWritter()
   
  }

  eventWritter(){
    if(i < phraseContent.length){
      dialogBox.innerHTML += phraseContent.charAt(i);
      i++
      this.time.addEvent({ //less problems with scope that timeout
        delay:50,
        callback: this.eventWritter,
        args: [currentEventData],
        callbackScope: this
      })
    }
    else{
      i=0;
      //next phrase
      //acces to next phrase
      let numberofPhrase = eventData[dataPosition].dialogs[eventData[dataPosition].currentDialog].currentPhrase
      //access to object and update its currentPhrase
      eventData[dataPosition].dialogs[currentDialog].currentPhrase +=1;
        
      interactButton.keyCode = 65;
    }
  }//eventWritter

  keepPlaying(){
    interactButton.keyCode = 80

    //clean dialog box 
    dialogBox.innerHTML=''
    dialogBox.appendChild(talking);

    //get content
    let numberofPhrase = eventData[dataPosition].dialogs[currentDialog].currentPhrase
    actualPhrase = eventData[dataPosition].dialogs[currentDialog].content[numberofPhrase]

    //if actual phrase exist display it
    if(actualPhrase != undefined){
      whoTalk = actualPhrase[0]
      phraseContent = actualPhrase[1]

      //update dialogBox
      talking.innerHTML='';
      talking.innerHTML = whoTalk;
      //write the text
      this.eventWritter()

    }else{
      //change current dialog for next interaction if exists
      if(eventData[dataPosition].dialogs[currentDialog+1] != undefined){
      eventData[dataPosition].currentDialog +=1
      }else{
        //reset phrase
        eventData[dataPosition].dialogs[currentDialog].currentPhrase = 0
      }

      //exit conversation
      dialogBox.innerHTML='';
      dialogBox.style.display='none';
      player.movable = true;
      this.time.addEvent({ 
        delay:500,
        callback: ()=>{
          player.isTalking = false;
          interactButton.keyCode = 65
        }
      })
     
    }


  }//keep playing


  //checkNpc
  checkNpc(npc){
    //get distante with the npc
    let distance =  Phaser.Math.Distance.Between(player.x,player.y,npc.x, npc.y)

    //listen for talk
    if(distance < 50 && distance > 0){
      //first interaction
      if(interactButton.isDown && interactButton.keyCode ==65
         && player.isTalking == false){
          this.talk(npc)
      }else if(interactButton.isDown && interactButton.keyCode == 65){
        //next interaction
          this.keepTalking(npc)
      }
    }

      //insert npcs to display emotions
      if(distance <50 && distance > 45){
        let isyet = false
        for(let i = 0; i <player.nearNpc.length; i++){
          if(npc.id == player.nearNpc[i].id){
            isyet = true
          }
        }
        if(isyet == false){
          player.nearNpc.push(npc)
        }
  
        player.emotes()
      }else if(distance > 50 && distance < 60){
        for(let i=0; i < player.nearNpc.length;i++){
          if(npc.id == player.nearNpc[i].id){
            player.nearNpc.splice(i,1)
          }
        }
        if(player.nearNpc.length == 0){
          player.emotions.visible = false
        }
      }

  }//Check Npc


  talk(npc){
    //block both player & npc
    player.movable = false;
    this.gridEngine.stopMovement(npc.id)
    interactButton.keyCode = 80;
    player.isTalking = true
    npc.isTalking = true
    setTimeout(npc.emotes.bind(npc), 150)

    // get the content of the dialog 
     currentPhrase = npc.dialogs[npc.currentDialog].currentPhrase
     whoTalk = npc.dialogs[npc.currentDialog].content[currentPhrase][0]
    talkContent = npc.dialogs[npc.currentDialog].content[currentPhrase][1]
    
    //display dialog box
    dialogBox.style.display = 'block';
    dialogBox.innerHTML=''
    dialogBox.appendChild(talking);
    talking.innerHTML = whoTalk

    this.typeWriter(npc);
  }

    
  keepTalking(npc){
    //block interact button
    interactButton.keyCode = 80;

    //clean dialog box 
    dialogBox.innerHTML=''
    dialogBox.appendChild(talking);

    //check if there is more phrases
    if(npc.dialogs[npc.currentDialog].currentPhrase < npc.dialogs[npc.currentDialog].content.length){
    //get content 
    currentPhrase = npc.dialogs[npc.currentDialog].currentPhrase
    whoTalk = npc.dialogs[npc.currentDialog].content[currentPhrase][0]

    talkContent = npc.dialogs[npc.currentDialog].content[currentPhrase][1]
    talking.innerHTML = ''
    talking.innerHTML = whoTalk
    this.typeWriter(npc);
   
  }else {
    //update dialog
    if(npc.dialogs[npc.currentDialog+1] != undefined){
      npc.currentDialog +=1;
     //update data for switch scene
     npcData.forEach(data =>{
      if(data.id== npc.id){
        data.currentDialog +=1;
      }
     })

    }else {
      npc.dialogs[npc.currentDialog].currentPhrase =0;
    }

    //exit conversation
    dialogBox.innerHTML=''
    dialogBox.style.display = 'none'
    npc.isTalking = false
    npc.emotes()
    player.movable = true 
    this.gridEngine.moveRandomly(npc.id, 1, npc.randomMove)
    this.time.addEvent({ 
      delay:500,
      callback: ()=>{
        player.isTalking = false;
        interactButton.keyCode = 65
      }
    })
  }
  }//keep talking

  typeWriter(npc){
    if(i < talkContent.length){
      dialogBox.innerHTML += talkContent.charAt(i);
      i++
      this.time.addEvent({ //less problems with scope that timeout
        delay:50,
        callback: this.typeWriter,
        args: [npc],
        callbackScope: this
      })
    }else{
      i=0;
      //next phrase 
      if(npc.dialogs[npc.currentDialog].content[currentPhrase][1] != undefined){

        npc.dialogs[npc.currentDialog].currentPhrase +=1
        }
        interactButton.keyCode = 65
    }

  }//typewriter

  switchZones(zone){
    //basic position algorithm 
    if(player.x +player.width > zone.x && player.x < zone.x + zone.width
      && player.y+player.height > zone.y &&
      player.y < zone.y + zone.height){
        
        switch(zone.name){
          case 'changeZone':
            player.movable = false
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
              this.scene.start('MurciaScene', 'universitySpawn')
            }
          })
        }
      }//end if
  }


}//END OF CLASS

export default UniversityScene