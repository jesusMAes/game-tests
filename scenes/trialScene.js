import Player from "../classes/Player.js"
import Npc from "../classes/Npc.js"
import { npcData } from "../data/npcData.js"


//para que las funciones puedan acceder a variables usadas en otras funciones hay que declararlas fuera de la clase
let dialogBox = document.getElementById('UI')
let blackScreen = document.getElementById('blackScreen')


const mapNpc =[]
let trialMap
let interact;
let player;
let currentDialog
let i=0
var changeScene=[]

class trialScene extends Phaser.Scene{
  constructor(){
    super('trialScene')
  }
  init(){
    //preparar datos
  }

  preload(){
    //cargar imagenes y mapas
    this.load.image('tileset', './Assets/Maps/pokemonTileset.png')
    this.load.tilemapTiledJSON('trialMap', './Assets/Maps/trialMap.json')
    //Player
    this.load.spritesheet('player','./Assets/Sprites/player trial1.png', {frameWidth:31.333, frameHeight:33})
    this.load.spritesheet('emotions', './Assets/Sprites/emotions.png',{frameWidth:16, frameHeight:16})
    //NPC
    this.load.spritesheet('BussinessMan', './Assets/Sprites/bussines_man.png',{frameWidth:30.66, frameHeight:31.5})
    this.load.spritesheet('oldWoman1','./Assets/Sprites/oldWoman1.png',{frameWidth:32, frameHeight:32})
  }

  create(){
    //instanciar mapa
    this.cameras.main.zoom=1.8
    trialMap = this.make.tilemap({key:'trialMap'})
    const tileset = trialMap.addTilesetImage('pokemonTileset', 'tileset')
    console.log(trialMap)
    // const floor = map.createLayer('Floor', tileset,0,0)
    // const World = map.createLayer('World', tileset,0,0)
    trialMap.layers.forEach(layer =>{
      trialMap.createLayer(layer.name, tileset,0,0)
      })
     //sprite del jugador 
    const spawn = trialMap.findObject('Player', obj => obj.name ==='Player')
    player = new Player({
      scene:this,
      x:spawn.x,
      y:spawn.y,
      spritesheet:'player'})
    player.scale=0.7
    player.setSize(25,25)
    player.init()
      

      //crear npcs
    for(let i=0;i<npcData.length;i++){
        const npcSpawn = trialMap.findObject('Npcs',npc => npc.name==npcData[i].id)//seleccionar el objeto de tiled, cambiar por id cuando actualice el mapa
        mapNpc[i] = new Npc({
        scene:this,
        x:npcSpawn.x,
        y:npcSpawn.y,
        spritesheet: npcData[i].sprite,
        id:npcData[i].id,
        mapping: npcData[i].animationMapping,
        dialogs: npcData[i].dialogs
       })
       
    }

    mapNpc.forEach(npc =>{
        npc.scale=0.8
        npc.init()
    })

    
    this.cameras.main.setBounds(0,0)
    this.cameras.main.startFollow(player,true)


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
          startPosition: { x:player.x, y:player.y}
        },
      ]
    }

    //add npcs to gridEngine
    for(let i=0;i<mapNpc.length;i++){
      gridEngineConfig.characters.push({
        id: mapNpc[i].id,
        sprite: mapNpc[i],
         walkingAnimationMapping:{
          up:{
            leftFoot:mapNpc[i].mapping.up.leftFoot,
            standing:mapNpc[i].mapping.up.standing,
            rightFoot:mapNpc[i].mapping.up.rightFoot
          },
          down:{
            leftFoot:mapNpc[i].mapping.down.leftFoot,
            standing:mapNpc[i].mapping.down.standing,
            rightFoot:mapNpc[i].mapping.down.rightFoot
          },
          left:{
            leftFoot:mapNpc[i].mapping.left.leftFoot,
            standing:mapNpc[i].mapping.left.standing,
            rightFoot:mapNpc[i].mapping.left.rightFoot
          },
          right:{
            leftFoot:mapNpc[i].mapping.right.leftFoot,
            standing:mapNpc[i].mapping.right.standing,
            rightFoot:mapNpc[i].mapping.right.rightFoot
          }
         },
         startPosition:{x:mapNpc[i].x, y:mapNpc[i].y},
         speed:2
      })
    }
  
  this.gridEngine.create(trialMap, gridEngineConfig)

  mapNpc.forEach(npc =>{
    this.gridEngine.moveRandomly(npc.id, 0,10)
  })

  interact = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  window.__GRID_ENGINE__ = this.gridEngine;
  this.cameras.main.width=768

  //cambiar escena
  changeScene=[]
  trialMap.findObject('ChangeScene', changer => {
      changeScene.push(changer)
  })



  }//FIN METODO CREATE
  

  update(){
    //actualizar el juego
    //comprobar si está cerca de un pj
    mapNpc.forEach(npc =>{
      this.checkPosition(npc)
    })

    player.emotions.x = player.x+7
    player.emotions.y = player.y-5

    //check for scene switch
    changeScene.forEach(changer =>{
      let distance =Phaser.Math.Distance.Between(player.getCenter().x,player.getCenter().y,changer.x, changer.y)

      if(distance <2){
        player.movable=false;
       gsap.to('#blackScreen',{
        opacity:1,
        duration:0.2,
        onComplete:()=>{
          
          gsap.to('#blackScreen',{
            backgroundColor: 'white',
            duration:0.2,
            onComplete:()=>{
              this.scene.start('switchScene')
              gsap.to('#blackScreen',{
                backgroundColor:'black',
                opacity:0,
                duration:0.2
              })
            }
          })
        }
       })//fin gsap
      }//fin if distance
    })//fin for each

    //TECLADO
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
    
  }
  
  
  checkPosition(npc){
    let distance = Phaser.Math.Distance.Between(player.x,player.y,npc.x, npc.y)

    if(distance<45 && distance > 0){
      if(interact.isDown && interact.keyCode === 65 && player.isTalking==false){
        this.talk(player, npc)
      }else if(interact.isDown && interact.keyCode ===65){
        this.keepTalking(npc)
      }
    }


    //emotion
    if(distance < 50 && distance > 45){
      let isyet=false 
      for(let i=0;i<player.nearNpc.length;i++){
        if(npc.id == player.nearNpc[i].id){
          isyet =true
        }
      }
      if (isyet == false){
        player.nearNpc.push(npc)
      }

      player.emotes()
    }else if(distance >50 && distance <55){
      for(let i=0; i < player.nearNpc.length;i++){
        if(npc.id == player.nearNpc[i].id){
          player.nearNpc.splice(i,1)
        }
      }
      if(player.nearNpc.length ==0){
      player.emotions.visible=false}
    }
  }

  

  talk(player,npc){
    interact.keyCode = 80 //al cambiar el keyCode solo se ejecuta una vez

    this.gridEngine.stopMovement(npc.id)
    player.movable=false
    player.isTalking = true
    npc.isTalking = true
    //acercar jugadores
    let npcPosition = this.gridEngine.getPosition(npc.id)
    let playerPosition = this.gridEngine.getPosition('player')
    // let npcDestinyX
    // let npcDestinyY
    // //posiciones en x
    // if(playerPosition.x < npcPosition.x ){
    //  npcDestinyX = playerPosition.x+1
    // }else if(playerPosition.x >npcPosition.x ){
    //   npcDestinyX = playerPosition.x-1
    // }else if(playerPosition.x ==npcPosition.x ){
    //   npcDestinyX=playerPosition.x
    // }
    
    // //posiciones en Y
    // if(playerPosition.y < npcPosition.y ){
    //   npcDestinyY = playerPosition.y+1
    //   npcDestinyX = playerPosition.x
    //  }else if(playerPosition.y >npcPosition.y ){//funciona
    //    npcDestinyY = playerPosition.y-1
    //    npcDestinyX = playerPosition.x
    //  }else if(playerPosition.y ==npcPosition.y ){
    //    npcDestinyY=playerPosition.y
    //  }
    // this.gridEngine.moveTo(npc.id, {x: npcDestinyX, y:npcDestinyY})
     setTimeout(npc.emotes.bind(npc), 250)

    currentDialog = npc.dialogs[npc.currentDialog]
    dialogBox.style.display = 'block'
    dialogBox.innerHTML = ''
    this.typeWritter(npc)
    //funcion de escribir aparte para modularizar
  }

  typeWritter(npc){
    if(i < currentDialog.length){
      dialogBox.innerHTML += currentDialog.charAt(i);
      i++
      setTimeout(this.typeWritter.bind(this), 50, npc)
    }else{
      i=0
      if(npc.dialogs[npc.currentDialog] != undefined){
      npc.currentDialog++
      }
      interact.keyCode = 65
    }
  }

  keepTalking(npc){
    interact.keyCode = 80
    currentDialog = npc.dialogs[npc.currentDialog]
    dialogBox.innerHTML=''
    if(currentDialog != undefined){
    this.typeWritter(npc)

    }else{
       //devolvemos al npc a su ultimo dialogo y quitamos el emote
      npc.currentDialog =1
      npc.isTalking = false
      npc.emotes()
      //limpiamos el dialogo
      dialogBox.innerHTML='';
      dialogBox.style.display='none'

      //devolvemos al npc su movimiento
      this.gridEngine.moveRandomly(npc.id, 1, 25)
      player.movable =true

      //restauramos el estado de hablando y la tecla
     
      interact.keyCode=65

      setTimeout(()=> player.isTalking=false, 500)
    }
  }

}//Fin de clase escena



export default trialScene
