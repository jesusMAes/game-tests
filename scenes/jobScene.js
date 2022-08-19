import Npc from "../classes/Npc.js";
import Player from "../classes/Player.js";
import {jobEvents} from '../data/jobEvents.js';
import {jobNpcs} from '../data/jobNpcs.js';
import {music} from '../data/music.js'


//variables
let dialogBox = document.getElementById('UI')

let blackScreen = document.getElementById('blackScreen')//for transitions
let gameContainer = document.getElementById('game-container')
let talking = document.createElement('div') //name of the person that is talking
talking.id = 'name';

let rejectedResummes = document.createElement('div')
rejectedResummes.id = 'rejected'
let rejections = 0
rejectedResummes.innerHTML =`Rejected Resummes: ${rejections}`;

let rejectedSound = new Howl({
  src:['./Assets/Sounds/hitSound.wav']
})

let jobFound = document.createElement('div');
jobFound.id = 'jobFound'
let aprovals = 0
jobFound.innerHTML = `Jobs found: ${aprovals}`
let aprovalsSound = new Howl({
  src:['./Assets/Sounds/aproveSound.wav']
})
let citySound;
//music


//control audio

let audioButton = document.getElementById('audio')


//player variables
let player;
let escene;

//events
let eventData = jobEvents 
let mapEvents = []; //store position of the events in the map
let currentEventData; //store current event data
let interactButton;
let dataPosition;

let currentDialog //stores number of dialog
let actualPhrase; //temporary stores dialog content
let whoTalk; 
let phraseContent; //stores  speech content 
let i = 0 //count letters

//NPC VARIABLES
let npcData = jobNpcs ; //npc data, sprite & dialogs
let allNpcs = [];
let talkContent;
let currentPhrase;

//personaliced Event
let userNpc;
let yesButton = document.createElement('button');
yesButton.id= 'yesButton'
yesButton.innerHTML= 'YES'
let noButton = document.createElement('button');
noButton.id = 'noButton'
noButton.innerHTML = 'NO'

//switchZones
let switchZones = []

//SCENE
class JobScene extends Phaser.Scene{
  constructor(){
    super('JobScene')
  }

  init(){
    //prepare data, set sounds
     citySound = new Howl({
      src:['./Assets/Sounds/citySound.mp3'],
      autoplay: true,
      loop:true,
      volume: 0.7
    })
    music.Sounds=[]//clean for previous sounds
    music.Sounds = [rejectedSound, aprovalsSound, citySound] //add current sounds
    music.init()//check current state of button
  }

  preload(){
        //load map & tileset
        this.load.image('tileset', './Assets/Maps/pokemonTileset.png')
        this.load.tilemapTiledJSON('jobMap','./Assets/Maps/jobScene.json' )
    
         //player & emotions
         this.load.spritesheet('player', './Assets/Sprites/player trial1.png',{frameWidth:31.333, frameHeight:33})
         this.load.spritesheet('emotions', './Assets/Sprites/emotions.png',{frameWidth:16, frameHeight:16})

         //NPC sprites
         this.load.spritesheet('bussinesMan1', './Assets/Sprites/bussinesMan1.png',{frameWidth:32, frameHeight: 32})
         this.load.spritesheet('recruiter1', './Assets/Sprites/recruiter1.png',{frameWidth:34, frameHeight: 35})
         this.load.spritesheet('recruiter2', './Assets/Sprites/recruiter2.png',{frameWidth:32, frameHeight: 32})
         this.load.spritesheet('recruiter3', './Assets/Sprites/recruiter3.png',{frameWidth:31, frameHeight: 32})
         this.load.spritesheet('recruiter4', './Assets/Sprites/recruiter4.png',{frameWidth:31, frameHeight: 32})
         this.load.spritesheet('recruiter5', './Assets/Sprites/recruiter5.png',{frameWidth:31, frameHeight: 34})
         this.load.spritesheet('recruiter6', './Assets/Sprites/recruiter6.png',{frameWidth:32, frameHeight: 32})
         this.load.spritesheet('recruiter7', './Assets/Sprites/recruiter7.png',{frameWidth:32, frameHeight: 35.7})
         this.load.spritesheet('recruiter8', './Assets/Sprites/recruiter8.png',{frameWidth:31, frameHeight: 32})
         this.load.spritesheet('recruiter9', './Assets/Sprites/recruiter9.png',{frameWidth:31, frameHeight: 32})
         
         
  }

  create(){
    //camera
    this.cameras.main.zoom = 1.6;
    this.cameras.main.width = 768;
    escene =this


    gameContainer.appendChild(rejectedResummes)
    //Map
    const jobMap = this.make.tilemap({key: 'jobMap'})
    const tileset = jobMap.addTilesetImage('pokemonTileset', 'tileset');

    //render
    jobMap.layers.forEach(layer =>{
      jobMap.createLayer(layer.name, tileset,0,0)
    })

    //player
    const playerSpawn = jobMap.findObject('Player', obj => obj.name === 'Player');
    player = new Player({
      scene:this,
      x:playerSpawn.x,
      y:playerSpawn.y,
      spritesheet: 'player'
    })
    player.init();

    //get Events from map to know its position
    jobMap.findObject('Events', event =>{
      mapEvents.push(event)
    })

    //Create npcs
   for(let i=0;i <npcData.length; i++){
    //find npc position in Tiled map
    const npcSpawn = jobMap.findObject('Npcs', npc => npc.name == npcData[i].id);
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

    //user npc
    const userSpawn = jobMap.findObject('Recruiter', user => user.name == 'userSprite');

    userNpc = new Npc({
      scene:this,
      x: userSpawn.x,
      y: userSpawn.y,
      spritesheet: 'recruiter9',
      id: 'UserSpawn',
      mapping: { //moves
        up:{
          leftFoot:10,
          standing: 0,
          rightFoot:2
        },
        down:{
          leftFoot:11,
          standing:5,
          rightFoot:8
        },
        left:{
          leftFoot:3,
          standing:6,
          rightFoot:9
        },
        right:{
          leftFoot:7,
          standing:1,
          rightFoot:4
        }
      },
      canTalk: true,
      currentDialog:0,
      dialogs: [],
      randomMove:0
    })
    userNpc.init();
      
  //interact button
  interactButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

  //get switchZones
  jobMap.findObject('changeZone', zone =>{
    switchZones.push(zone)
  })
  //grid Engine
  const gridEngineConfig = {
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

   //add user npc to grid engine
   gridEngineConfig.characters.push({
    id: userNpc.id,
    sprite: userNpc,
    walkingAnimationMapping:{
      up:{
        leftFoot:userNpc.mapping.up.leftFoot,
        standing: userNpc.mapping.up.standing,
        rightFoot: userNpc.mapping.up.rightFoot
      },
      down:{
        leftFoot:userNpc.mapping.down.leftFoot,
        standing: userNpc.mapping.down.standing,
        rightFoot: userNpc.mapping.down.rightFoot
      },
      left:{
        leftFoot: userNpc.mapping.left.leftFoot,
        standing: userNpc.mapping.left.standing,
        rightFoot: userNpc.mapping.left.rightFoot
      },
      right: {
        leftFoot: userNpc.mapping.right.leftFoot,
        standing: userNpc.mapping.right.standing,
        rightFoot: userNpc.mapping.right.rightFoot
      }
    },
    startPosition:{x: userNpc.x, y: userNpc.y},
    speed: 2

   })

  this.gridEngine.create(jobMap, gridEngineConfig);

  //move npcs
  allNpcs.forEach(npc =>{
    if(npc.randomMove != 0)
    this.gridEngine.moveRandomly(npc.id, 2, npc.randomMove)
   })

  //camera follow player
  this.cameras.main.setBounds(0,0)
  this.cameras.main.startFollow(player, true)

  }//create method

  update(){
    //move emotions
    player.emotions.x = player.x+7
    player.emotions.y = player.y-5

    //checkEvents
    mapEvents.forEach(event =>{
      this.checkEvent(event)
    })

      //check for npcs
  allNpcs.forEach(npc =>{
    if(npc.canTalk == true){
      this.checkNpc(npc)
    }
  })

  //check for your npc
  this.checkUserNpc()
  
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

  }//update method


  //util methods
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
      rejections++;
      rejectedResummes.innerHTML = `Rejected Resummes: ${rejections}`;
      rejectedSound.play()
     //update data for switch scene
     npcData.forEach(data =>{
      if(data.id== npc.id){
        data.currentDialog +=1;
      }
     })

    }else {
      npc.dialogs[npc.currentDialog].currentPhrase =0;
      rejections++;
      rejectedResummes.innerHTML = `Rejected Resummes: ${rejections}`;
      rejectedSound.play()

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

  checkUserNpc(){
    let distance =  Phaser.Math.Distance.Between(player.x,player.y,userNpc.x, userNpc.y)

    //listen for talk
    if(distance < 50 && distance > 0){
      //first interaction
      if(interactButton.isDown && interactButton.keyCode ==65
         && player.isTalking == false){
          this.userNpcEvent()
      }
    }

    //activate emotions
    if(distance <55 && distance >50){
      player.emotes()
    }else if(distance > 55 && distance <60){
      player.emotions.visible = false
    }
  }//check user npc

  userNpcEvent(){
    player.movable=false;
    interactButton.keyCode =80;
    player.isTalking = true;
    setTimeout(userNpc.emotes.bind(userNpc), 150)
    //write the dialog

    let talk = 'Jesús'
    let dialogContent =  `Hi! I'm a junior developer, would you give me a chance?`

     dialogBox.style.display = 'block';
     dialogBox.innerHTML=''
     dialogBox.appendChild(talking);
     talking.innerHTML = talk

     let writer = function(){

      if(i < dialogContent.length){
        dialogBox.innerHTML += dialogContent.charAt(i);
        i++
        setTimeout(writer, 50)
      }else{
        i=0
       setTimeout( escene.addButtons, 300)
      }

     }//writer function

     writer()
  }

  addButtons(){
    talking.innerHTML= 'You'
    dialogBox.innerHTML = 'What do you say?'
    dialogBox.appendChild(talking);
    dialogBox.appendChild(yesButton);
    dialogBox.appendChild(noButton);
    yesButton.addEventListener('click', escene.handleButtons);
    noButton.addEventListener('click', escene.handleButtons);
  }

  handleButtons(e){
    //get source
    let source = e.target.id;

    if(source == 'yesButton'){
      //open mail
      window.open("mailto:jesusmarmolesp@gmail.com?subject=Job%20offer&body=Hello!")

      //sound & div
      gameContainer.appendChild(jobFound);
      aprovals++;
      jobFound.innerHTML = `Jobs found: ${aprovals}`;
      aprovalsSound.play()

      //clear box and unlock player
      dialogBox.removeChild(yesButton)
      dialogBox.removeChild(noButton)
      dialogBox.innerHTML = ''
      dialogBox.style.display= 'none'
      player.movable = true
      player.isTalking = false

      setTimeout(()=> interactButton.keyCode =65)
    }else if(source == 'noButton'){
      //just go out
      dialogBox.removeChild(yesButton)
      dialogBox.removeChild(noButton)
      rejections++;
      rejectedResummes.innerHTML = `Rejected Resummes: ${rejections}`;
      rejectedSound.play()
      dialogBox.innerHTML = ''
      dialogBox.style.display= 'none'
      player.movable = true
      player.isTalking = false

      setTimeout(()=> interactButton.keyCode =65)
    }

  }//handleButtons


  //switchzones
  switchZones(zone){
    //basic position algorithm 
    if(player.x +player.width > zone.x && player.x < zone.x + zone.width
      && player.y+player.height > zone.y &&
      player.y < zone.y + zone.height && player.movable == true){
       
        //clean interface
        let erase = document.getElementById('rejected')
        if(erase != undefined){erase.remove()}
        let erase1 = document.getElementById('jobFound')
        if(erase1 !=undefined){erase1.remove()}
        audios.forEach(audio =>{audio.mute(true)})
        audios =[]
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
              this.scene.start('MurciaScene', 'jobSpawn')
            }
          })
        }
      }//end if
  }


}//END CLASS

export default JobScene