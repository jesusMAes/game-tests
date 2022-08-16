import Player from "../classes/Player.js"


let player;
let changeZone =[]
class switchScene extends Phaser.Scene{
  constructor(){
    super('switchScene')
  }

  preload(){
    //tileset y mapa
    this.load.image('tiles', './Assets/Maps/pokemonTileset.png')
    this.load.tilemapTiledJSON('map1', './Assets/Maps/switchScene.json')

    //player
    this.load.spritesheet('player', './Assets/Sprites/player trial1.png',{frameWidth:31.333, frameHeight:33})
  }

  create(){
     
    //ajustar camara 
    this.cameras.main.zoom = 2
    
    //Mapa
    const map = this.make.tilemap({key:'map1'});
    const tileset = map.addTilesetImage('pokemonTileset', 'tiles');
    
    map.layers.forEach(layer =>{
      map.createLayer(layer.name, tileset,0,0)
    })

    
    const spawn = map.findObject('Player', obj => obj.name =='Player')
    player = new Player({
      scene:this,
      x:spawn.x,
      y:spawn.y,
      spritesheet:'player'
    })
    player.init()

    this.cameras.main.setBounds(0,0)
    this.cameras.main.startFollow(player,true)

    //gridEngine
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
    this.gridEngine.create(map, gridEngineConfig)

    //por algun motivo me llama la funcion create 60 veces, en lo que veo como arreglarlo al vaciar en cada vuelta solo conserva la ultima
    changeZone = []
    map.findObject('ChangeScene', changer =>{
      changeZone.push(changer)
    })
  
  
  }//Fin create

  update(){


    //back to other scene
    changeZone.forEach(changer =>{
      if(player.x > changer.x && player.x < changer.x+changer.width
        && player.y + player.height >= changer.y
        ){
        player.movable=false
        gsap.to('#blackscreen',{
          opacity:1,
          duration:0.5,
          onComplete:()=>{
            gsap.to('#blackScreen',{
              backgroundColor: 'white',
              duration:0.2,
              onComplete: ()=>{
                this.scene.start('trialScene')
                gsap.to('#blackScreen',{
                  opacity:0,
                  backgroundColor:'black'
                }) 
              }
            })
          }
        })
      }//end if
    })
    
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
}


export default switchScene