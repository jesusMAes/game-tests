
export default 
class Player extends Phaser.GameObjects.Sprite{
  constructor({
    scene,
    x,
    y,
    spritesheet
  }){

    super(scene, x,y, spritesheet)
    scene.add.existing(this)
    this.x = Math.floor(x/16)
    this.y = Math.floor(y/16)

    this.scene = scene
    this.emotions
    this.movable = true
    this.isTalking = false
    this.nearNpc =[]
    this.nearObjects =[]


  }

  init(){
    //añadir emote
    let emotionX = this.x * 16
    let emotionY = this.y * 16
    let emotion = this.scene.add.sprite(emotionX, emotionY,'emotions')
    //animar emotions
    emotion.anims.create({
      key:'begin',
      frames: this.anims.generateFrameNumbers('emotions',{
      start:0, end:3}),
     frameRate:10,
     duration:0.5
    })
    emotion.anims.create({
      key:'question',
      frames: this.anims.generateFrameNumbers('emotions',{
        start:8, end:11}),
      frameRate:5
    })
    emotion.anims.create({
      key:'confused',
      frames: this.anims.generateFrameNumbers('emotions',{
        start:12, end:15}),
      frameRate:5
    })
    emotion.anims.create({
      key:'exclamation',
      frames: this.anims.generateFrameNumbers('emotions',{
        start:16, end:19}),
        frameRate:5
    })
    emotion.anims.create({
      key:'love',
      frames: this.anims.generateFrameNumbers('emotions',{
      start:20, end:23}),
    frameRate:5
    })
    emotion.anims.create({
      key:'sleep',
      frames: this.anims.generateFrameNumbers('emotions',{
      start:24, end:27}),
    frameRate:5
    })
    emotion.anims.create({
      key:'happy',
      frames: this.anims.generateFrameNumbers('emotions',{
      start:32, end:35}),
    frameRate:5,
    repeat:-1
    })
    emotion.anims.create({
      key:'talk',
      frames: this.anims.generateFrameNumbers('emotions',{
      start:40, end:43}),
    frameRate:5
    })   
    this.emotions = emotion
    this.emotions.setDepth(12)//cambia la capa en que se muestra
    this.emotions.visible = false
  }

  emotes(mood){
    
    if(this.nearTalkable !=0){
    this.emotions.visible = true;
    this.emotions.anims.play('begin')
    this.emotions.on('animationcomplete',()=> this.emotions.anims.play('talk'))
    }
    if(mood != undefined){
      switch(mood){
        case 'question':
          this.emotions.anims.play('begin')
          this.emotions.on('animationcomplete',()=> this.emotions.anims.play('question'))
          break;
        case 'confused':
            this.emotions.anims.play('begin')
            this.emotions.on('animationcomplete',()=> this.emotions.anims.play('confused'))
            break;
        case 'exclamation':
          this.emotions.anims.play('begin')
          this.emotions.on('animationcomplete',()=> this.emotions.anims.play('exclamation'))
          break;
        case 'sleep':
          this.emotions.anims.play('begin')
          this.emotions.on('animationcomplete',()=> this.emotions.anims.play('sleep'))
          break;
        case 'happy':
          this.emotions.anims.play('begin')
          this.emotions.on('animationcomplete',()=> this.emotions.anims.play('happy'))
          break;

        default: 
        this.emotions.anims.play('begin')
          this.emotions.on('animationcomplete',()=> this.emotions.anims.play('talk'))
          break;
      }
    }
  }


}
//para crear el sprite necesitamos llamar a super, es decir, el constructor de sprite

//gridengine funciona por tiles así que para saber el tile calculamos la x del spawn / el tamaño de la casilla

