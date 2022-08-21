import Player from "../classes/Player.js";
import AudioManager from "../classes/AudioManager.js"
import { roomData } from "../data/roomData.js";
import {music} from '../data/music.js'


let dialogBox = document.getElementById('UI');
let blackScreen = document.getElementById('blackScreen')//for transitions

//sound 
let roomMusic = new Howl({
  src:['./Assets/Sounds/roomScene.mp3'],
  autoplay:true,
  loop:true,
  volume:0.7
})
let bip = new Howl({
  src:['./Assets/Sounds/talkbip.wav'],
  volume:0.3
})

let audioButton = document.getElementById('audio')


audioButton.addEventListener('click', function(e){
  music.mute(e)
},false )

//get event data
let data = roomData

let scene;
let player;
let luffy;
let dogEmotions;
let events =[];
let interactButton;
let mood

//switch zones
let swicthZone = []
//dialog vars
let countDialogue=0;
let currentDialog;
let currentObject
let dialogues;
let objectIdentifier;
let i = 0

//events
let carousel
let button
let closeButton
let modalOpen = false

//bookEvent 
let area = document.getElementById('area');
let book;
let page;
let yesButton = document.createElement('button');
yesButton.id= 'yesButton'
yesButton.innerHTML= 'YES'
let noButton = document.createElement('button');
noButton.id = 'noButton'
noButton.innerHTML = 'NO'

let stopReading = document.createElement('button');
stopReading.id = 'stopReading';
stopReading.innerHTML = 'Stop reading' 

class RoomScene extends Phaser.Scene{
  constructor(){
    super('RoomScene')
  }

  init(){
    //prepare data
     //sound
     music.Sounds=[roomMusic, bip]
     music.init()
  }

  preload(){
    //load maps, sprites and assets
    this.load.image('interiors1', './Assets/Maps/InteriorTileset/pokemonInteriors 1.png')
    this.load.image('interiors2', './Assets/Maps/InteriorTileset/pokemonInteriors 2.png')
    this.load.image('interiors3', './Assets/Maps/InteriorTileset/pokemonInteriors 3.png')
    this.load.image('interiors4', './Assets/Maps/InteriorTileset/pokemonInteriors 4.png')
    this.load.tilemapTiledJSON('map', './Assets/Maps/roomMap1.json')
   
    //player
    this.load.spritesheet('player', './Assets/Sprites/player trial1.png',{frameWidth:31.333, frameHeight:33})
    this.load.spritesheet('emotions', './Assets/Sprites/emotions.png',{frameWidth:16, frameHeight:16})

    //dog
    this.load.spritesheet('dog','./Assets/Sprites/dogSprite.png',{frameWidth:32, frameHeight:32})

    //title carousel
    this.load.html('carousel', './bootstrapElements/carousel.html')

    //load book to prevent delays
    book =  ePub('./data/books/Interesting Times.epub')
  }

  create(){
    //the base of the game
    scene =this
    this.cameras.main.zoom=2
    this.cameras.main.width=768

   
    //render map
    const map  = this.make.tilemap({key:'map'})

    const interiors1 = map.addTilesetImage('pokemonInteriors 1', 'interiors1')
    const interiors2 = map.addTilesetImage('pokemonInteriors 2', 'interiors2')
    const interiors3 = map.addTilesetImage('pokemonInteriors 3', 'interiors3')
    const interiors4 = map.addTilesetImage('pokemonInteriors 4', 'interiors4')

    const tileset =[interiors1, interiors2, interiors3, interiors4]
  
    map.layers.forEach(layer =>{   
      map.createLayer(layer.name, tileset, 0,0)
     })


     //get map events 
      map.findObject('InteractObjects', (obj)=>{ 
        if(obj.properties != undefined){
          events.push(obj)
        }
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

    //dog
    const dogSpawn = map.findObject('InteractObjects', obj => obj.name=='Luffy')
    luffy = this.add.sprite(dogSpawn.x, dogSpawn.y, 'dog',22)
    luffy.setSize(32,32)

    //dog animations, as it just one we do here instead in a json or class
    this.anims.create({
      key: 'stand',
      frames:[
        {key: 'dog', frame:23},
        {key: 'dog', frame:22},
        {key: 'dog', frame:24},
        {key: 'dog', frame:25},
        {key: 'dog', frame:26}
      ],
      frameRate:1,
      duration:2,
      repeat:-1

    })
    luffy.anims.play('stand')
     dogEmotions = this.add.sprite(dogSpawn.x+10, dogSpawn.y-25,'emotions')
    dogEmotions.anims.create({
      key:'happy',
      frames: this.anims.generateFrameNumbers('emotions',{
      start:32, end:35}),
      frameRate:5,
      repeat:-1
    })
    dogEmotions.depth = 15
    dogEmotions.visible = false

    //load switchzone
    map.findObject('SwitchScene', (obj)=>{
      swicthZone.push(obj)
    })

     //Grid engine
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
          startPosition: { x:player.x, y:player.y},
          speed:5.5
        },
        {
          id: 'luffy',
          sprite: luffy,
          startPosition:{x:Math.floor(dogSpawn.x/16), y:Math.floor(dogSpawn.y/16)}
        },
      ]
    }

    this.gridEngine.create(map, gridEngineConfig)

    //interact button
    interactButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

    let titlePositionX = events[1].x
    let titlePositionY = events[1].y
    //carousel DOM
    carousel = this.add.dom(titlePositionX, titlePositionY, 'div','width:400').createFromCache('carousel',`section`)
    carousel.depth = 7
    carousel.node.style.width = 100+'px'
    carousel.node.style.height = 100+'px'
    carousel.node.style.left = -150+'px'
    
    button = carousel.getChildByID('button')
    closeButton = carousel.getChildByID('closeCarousel')
    button.addEventListener('click', ()=>{
      modalOpen = !modalOpen
    })
    closeButton.addEventListener('click', ()=>{
      modalOpen = !modalOpen
    })

    carousel.updateSize();

    //follow movement
    this.cameras.main.setBounds(0,0)
    this.cameras.main.startFollow(player,true)

    //debug
    window.__GRID_ENGINE__ = this.gridEngine;
    
  }//End create Method


  update(){
    //update the game
    player.emotions.x = player.x+7
    player.emotions.y = player.y-5

    //checkDistance
    events.forEach(object =>{
      this.checkPosition(player, object)
    })

    //dog emotion
    this.checkDogDistance()

    //check for switch zones
    swicthZone.forEach(zone =>{
      this.checkSwitchZone(zone)
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

     

  }//END update

  checkDogDistance(){
    let distance = Phaser.Math.Distance.Between(player.getCenter().x,player.getCenter().y, luffy.x, luffy.y)

    if(distance < 65 && distance >60){
      dogEmotions.visible = true;
      dogEmotions.anims.play('happy')
    }else if(distance > 66 ){
      dogEmotions.visible = false
    }
  }

  checkPosition(player, object){
    
    let distance = Phaser.Math.Distance.Between(player.getCenter().x,player.getCenter().y, object.x, object.y)
    
    //check for interaction

    if(distance <60 && distance >0){
      if(interactButton.isDown && interactButton.keyCode == 65 && player.isTalking == false){
        if(object.name == 'Book'){
          this.readBook()
        }else if(object.name == 'titles'){
          this.titleEvent()

        }else{
        this.interactWithObject(object)}
      }else if(interactButton.isDown && interactButton.keyCode== 65){
        this.keepTalking(object)
      }
    }

    //emotion sprite activated
    if(distance <70 && distance >65){
      let isyet=false;
      for(let i=0;i<player.nearObjects.length;i++){
        if(object.id == player.nearObjects[i].id){
          isyet=true;
        }
      }
      if(isyet ==false){
        player.nearObjects.push(object);
      }

      player.emotes()
    }else if(distance >70 && distance <75){
      for(let i=0; i < player.nearObjects.length;i++){
        if(object.id == player.nearObjects[i].id){
          player.nearObjects.splice(i,1)
        }
      }

      if(player.nearObjects.length ==0){
        player.emotions.visible =false
      }
    }
  }//end of checkPosition

  //interact with object method
  interactWithObject(object){
    interactButton.keyCode = 80 //prevents multiple calls
    player.movable =false //block movement
    player.isTalking= true

    //find the correct dialog
    for(let j =0; j<data.length;j++){
      if(object.name == data[j].name){
        currentObject = data[j]
        objectIdentifier = j //For later operations with data
      }
    }

    dialogues = currentObject.dialogues[data[objectIdentifier].currentDialog]//get all dialogues
    mood = currentObject.emotion
    player.emotes(mood)
    currentDialog = dialogues.content[countDialogue]//get current dialog
    dialogBox.style.display = 'block'
    dialogBox.innerHTML = ''
    this.typeWritter();
  }

  typeWritter(){
    
    if(i < currentDialog.length){
      dialogBox.innerHTML += currentDialog.charAt(i);
      bip.play()
      i++
      setTimeout(this.typeWritter.bind(this), 5, )
    }else{
      i=0
      //next phrase
      if(dialogues.content[countDialogue]+1 != undefined){
        countDialogue++
      }
      
      interactButton.keyCode = 65
    }
  }

  //continue conversations
  keepTalking(){
  
    dialogBox.innerHTML = ''
    interactButton.keyCode = 80
    //update dialog
    currentDialog = dialogues.content[countDialogue]

    if(currentDialog != undefined){
      //write the dialog
    this.typeWritter()
    }else{
      //next dialog
      countDialogue=0
      
      //check for the next dialog block, if doesnt exist return to the last
     if( data[objectIdentifier].currentDialog+1 < data[objectIdentifier].dialogues.length ){
      data[objectIdentifier].currentDialog += 1
     }else{
      data[objectIdentifier].currentDialog = data[objectIdentifier].dialogues.length -1
     }
      
      //close dialog
      dialogBox.innerHTML='';
      dialogBox.style.display='none'
      player.movable =true
      player.isTalking = false
      setTimeout(()=>  interactButton.keyCode=65, 500)
    }
  }

  titleEvent(){
    interactButton.keyCode =80 //prevent doble activation
    player.movable = false 
    //writte text
    dialogBox.style.display = 'block'
    dialogBox.innerHTML=''
    let content = "Ah, my university degrees. Study two degrees at the same time was so hard...  "

    let write = function(content){
      if(i < content.length){
        dialogBox.innerHTML += content.charAt(i);
        i++
        setTimeout(write.bind(this), 5,content)
      }else{
        i=0;
        dialogBox.style.display = 'none'
        dialogBox.innerHTML=''
        button.click()
        scene.checkModal()
      }
    }
    
    write(content)
   
  }

  checkModal(){
    let akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    if(akey.isDown){
      button.click()
    }    
    if(modalOpen == true){
      setTimeout(this.checkModal.bind(this), 5)
    }else{
      player.movable = true
      setTimeout(()=>interactButton.keyCode = 65,500)
    }
  }

  readBook(){
    //block Movement
    player.movable = false
    interactButton.keyCode=80
    dialogBox.style.display = 'block'
    dialogBox.innerHTML=''
    //dialog
    let content = 'Do you want to read the book?'

    let writeDialog = function (){
      if(i < content.length){
        dialogBox.innerHTML += content.charAt(i);
        i++
        setTimeout(writeDialog, 5,content)
        
      }else{
        i=0
        scene.addButtons()
      }
    }

    writeDialog()

  }

  addButtons(){
    dialogBox.appendChild(yesButton)
    dialogBox.appendChild(noButton)
    yesButton.addEventListener('click', this.handleButtons)
    noButton.addEventListener('click', this.handleButtons)
  }

  handleButtons(e){
    let source = e.target.id
    if(source == 'yesButton'){

      //clean dialog
      dialogBox.removeChild(yesButton)
      dialogBox.removeChild(noButton)
      dialogBox.innerHTML = ''
      dialogBox.style.display= 'none'

      //displaying the book
      var rendition = book.renderTo('area',{flow: "paginated", width: 500, height: 400});
      area.style.display='block'
      //load last page
      if(page == undefined){
      var displayed = rendition.display()
      }else{
        var displayed = rendition.display(page)
      }
      area.appendChild(stopReading)
      //change page
    var next = document.getElementById('next');
    next.addEventListener('click', function(e){
      if(book.package.metadata.direction === 'rtl'){
        rendition.prev()
      }else{
        rendition.next()
      }
    })
    var prev = document.getElementById('prev');
    prev.addEventListener('click', function(e){
      if(book.package.metadata.direction ==='rtl'){
        rendition.next()
      }else{
        rendition.prev()
      }
    })

    //key movement
    var keyListener = function(e){
      if((e.keyCode  || e.which) == 37){
        //short if with the same of the buttons if
        book.package.metadata.direction ==='rtl' ? rendition.next():rendition.prev()
      }
      if((e.keyCode  || e.which) == 39){
        //short if with the same of the buttons if
        book.package.metadata.direction ==='rtl' ? rendition.prev():rendition.next()
      }
    }

    rendition.on('keyup', keyListener)
    document.addEventListener('keyup',keyListener,false)

    //close the book
    stopReading.addEventListener('click',function(){
      //clean the mesh
      var location = rendition.currentLocation()
      page = location.start.cfi 
      rendition.destroy()
      area.removeChild(stopReading)
      area.style.display= 'none'

      player.movable= true;
      setTimeout(()=>interactButton.keyCode =65, 500)
    })
      
    }else{
      //clean && out of the method
      dialogBox.removeChild(yesButton)
      dialogBox.removeChild(noButton)
      dialogBox.innerHTML = ''
      dialogBox.style.display= 'none'
      player.movable = true

      setTimeout(()=> interactButton.keyCode =65)
    }
  }

  //Switch zones
  checkSwitchZone(zone){
    //checkPosition
    if(player.x > zone.x && player.x < zone.x + zone.width
      && player.y+player.height > zone.y){
        
        player.movable = false
        music.clean()
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
            this.scene.start('MurciaScene', 'roomSpawn')
            this.scene.pause()
            
          }
        })
    }//end of if
  }

}//END OF SCENE

export default RoomScene