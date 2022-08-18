import Npc from "../classes/Npc.js";
import Player from "../classes/Player.js";
import {murciaEvents} from '../data/murciaEvents.js';
import {murcianpcs} from '../data/murciaNpcs.js'

let dialogBox = document.getElementById('UI');
let blackScreen = document.getElementById('blackScreen')//for transitions
let gameContainer = document.getElementById('game-container')

let talking = document.createElement('div') //name of the person that is talking
talking.id = 'name'
//variables
let scene; //for use when this lose context

//player variables
let player;

//events
let events =[]; //store the map events
let data = murciaEvents; //store all events
let eventData; // store current event data
let interactButton;
let signOpen; //flag to open/close signal div

//sign html
let universitySign = document.createElement('div')
universitySign.id = 'universitySign';
universitySign.innerHTML = 'University ↑' 
let directions = document.createElement('div');
directions.id = 'directions'
directions.innerHTML=`University <i class="fa-solid fa-arrow-up"></i> <br> 
                      Developer Center <i class="fa fa-arrow-left"></i> <br>
                      Job  Search <i class="fa-solid fa-arrow-right"></i>`

//NPCs
let npcData = murcianpcs
let allNpcs =[]
let talkContent;
let whoTalk;
let currentPhrase;
// let currentDialog;
let i =0;

//switchZones
let switchZones =[]
let spawnPoint

//class & methods
class MurciaScene extends Phaser.Scene{
  constructor(){
    super('MurciaScene')
  }


  init(data){
    //prepare data, use it when passing data between scenes
    spawnPoint=data
  }

  preload(){
    //load map & tileset
    this.load.image('tileset', './Assets/Maps/pokemonTileset.png')
    this.load.tilemapTiledJSON('murciaMap', './Assets/Maps/murciaMap.json')

    //player & emotions
    this.load.spritesheet('player', './Assets/Sprites/player trial1.png',{frameWidth:31.333, frameHeight:33})
    this.load.spritesheet('emotions', './Assets/Sprites/emotions.png',{frameWidth:16, frameHeight:16})

    //npc sprites
    this.load.spritesheet('oldWoman1','./Assets/Sprites/oldWoman1.png',{frameWidth:32, frameHeight:32});
    this.load.spritesheet('normalGuy1', './Assets/Sprites/normalGuy1.png', {frameWidth:31.333, frameHeight:32});
    this.load.spritesheet('normalGuy2', './Assets/Sprites/normalGuy2.png', {frameWidth:31.333, frameHeight:32});
    this.load.spritesheet('oldMan1', './Assets/Sprites/oldMan1.png', {frameWidth:31.333, frameHeight:33});
    this.load.spritesheet('baby', './Assets/Sprites/baby.png', {frameWidth:31.333, frameHeight:33});
    this.load.spritesheet('gameBoyBoy', './Assets/Sprites/gameBoyBoy.png', {frameWidth:24, frameHeight:34});
    this.load.spritesheet('bikeWoman', './Assets/Sprites/bikeWoman.png', {frameWidth:32.33, frameHeight:33});
    this.load.spritesheet('friendWoman1', './Assets/Sprites/friendWoman1.png', {frameWidth:33, frameHeight: 34});
    this.load.spritesheet('friend1', './Assets/Sprites/friend1.png', {frameWidth:33.333, frameHeight: 32.6})
    
  }

  create(){
    //scene & camera
    scene = this;
    this.cameras.main.zoom = 1.6
    this.cameras.main.width = 768;

    
    //map
    const murciaMap = this.make.tilemap({key: 'murciaMap'})
    const tileset = murciaMap.addTilesetImage('pokemonTileset', 'tileset')

    murciaMap.layers.forEach(layer => {
      murciaMap.createLayer(layer.name, tileset, 0,0)
    })

    //player
   const playerSpawn =  murciaMap.findObject('spawnPoints', obj => obj.name===spawnPoint)
   player = new Player({
    scene:this,
    x:playerSpawn.x,
    y:playerSpawn.y,
    spritesheet: 'player'
   })
   player.init()

    //   let example =this.add.sprite(player.x*16, player.y*16, 'friend1',6)
    // example.depth =99

   //interact button
   interactButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

   //get Map Events
    murciaMap.findObject('Events', obj =>{
    events.push(obj)
   })

   //get switch zones
   murciaMap.findObject('ChangeZones', obj =>{
    switchZones.push(obj)
   })

   //Create an npc for each in the data
   for(let i=0;i <npcData.length; i++){
    //find npc position in Tiled map
    const npcSpawn = murciaMap.findObject('Npcs', npc => npc.name == npcData[i].id);
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

  //baby, hardcoded cause its just one
  let baby = this.add.sprite(490, 299, 'baby',1)
  baby.depth = 5

  //activate npcs emotions
  allNpcs.forEach(npc =>{
    npc.init()
  })


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

   this.gridEngine.create(murciaMap, gridEngineConfig)

   allNpcs.forEach(npc =>{
    if(npc.randomMove != 0)
    this.gridEngine.moveRandomly(npc.id, 2, npc.randomMove)
   })

   //camera follow player
   this.cameras.main.setBounds(0,0)
   this.cameras.main.startFollow(player, true)

  }//END OF CREATE

  update(){
    //loop of the game
    //move emotions
    player.emotions.x = player.x+7
    player.emotions.y = player.y-5

    //check for events
    events.forEach(event =>{
      this.checkEvent(event)
    })

    //check for npcs
    allNpcs.forEach(npc =>{
      if(npc.canTalk==true)
      this.checkNpc(npc);
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

  checkEvent(event){
    let distance  = Phaser.Math.Distance.Between(player.getCenter().x,player.getCenter().y, event.x, event.y)

    //check nearby
    if(distance < 55 && distance > 0){
      //check activation
      if(interactButton.isDown && interactButton.keyCode == 65 &&player.isTalking == false){
        if(event.name != 'Sign'){
        this.playEvent(event)
        }else{
          this.Signs(event);
        }
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
  }//check Event

  playEvent(event){
    
    //pause player
    player.movable=false
    interactButton.keyCode = 80;
    //get data 
    data.forEach(object =>{
      if(event.name == object.id){
        eventData = object
      }
    })
   //get current dialog
   let dialog = eventData.content[eventData.currentDialog]
  
   //display dialog
    dialogBox.style.display = 'block';
    dialogBox.innerHTML=''
    dialogBox.appendChild(talking);
    talking.innerHTML=dialog[0]
    let i=0
    //write Content 
    let content = dialog[1]
    let writer =function(){
      if(i < content.length){
        dialogBox.innerHTML += content.charAt(i);
        i++
        setTimeout(writer.bind(this), 5)
      }else{
        //update dialog
        if(data[eventData.position].currentDialog < data[eventData.position].content.length-1){
        data[eventData.position].currentDialog++
        player.movable = true
          player.isTalking= false
          setTimeout(function(){
            dialogBox.style.display = 'none'
            talking.innerHTML = ''
          },500)
         
          setTimeout(interactButton.keyCode = 65, 1000)
        }else{
          data[eventData.position].currentDialog = data[eventData.position].content.length-1;
          //no more dialogs, close
          player.movable = true
          player.isTalking= false
          setTimeout(function(){
            dialogBox.style.display = 'none'
            talking.innerHTML = ''
          },500)
         
          setTimeout(interactButton.keyCode = 65, 1000)
        }
      }
    }
    writer()
  
  }//play event

  Signs(event){
    //block movement
    player.movable = false
    signOpen = true
    player.isTalking=true
    interactButton.keyCode = 80;
    //get the name of the signal
    let signal = event.properties[0].name;
    switch (signal){
      case 'universitySign':
        gameContainer.appendChild(universitySign)
        setTimeout(this.checkSignal.bind(this),200, universitySign)
        break
      case 'directions':
        gameContainer.appendChild(directions)
        setTimeout(this.checkSignal.bind(this),200, directions)
        break
    }

  }

  checkSignal(sign){
    let signal = sign;
    if(interactButton.isDown && interactButton != 65){
      signOpen = false
    }
    if(signOpen == true){
      setTimeout(this.checkSignal.bind(this),100, signal)
    }else{
      gameContainer.removeChild(sign);
      player.movable = true;
      this.time.addEvent({
        delay:500,
        callback:()=>{
          interactButton.keyCode = 65
          player.isTalking = false
        }
      })

    }
   
  }//check Signal

  //Npc Methods
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


  }// end checkNpc


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
          case 'changeRoom':
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
              this.scene.start('RoomScene')
            }
          })
          break
          
          case 'changeUniversity':
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
              this.scene.start('UniversityScene')
            }
          })
          break
        }
      }//end if

  }


}//END OF CLASS


export default MurciaScene