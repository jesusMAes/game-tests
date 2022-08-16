

export const npcData = [
  {
    id:'BussinessMan',
    sprite:'BussinessMan',
    spriteSrc:'./Assets/Sprites/bussines_man.png',
    frameWidth: 30.66,
    frameHeight:31.5,
    animationMapping:{
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
    canTalk: true,
    dialogs:["hola don pepito", "hola don josé", "paso usted ayer por casa"]
  },
  {
    id: 'BussinesMan1',
    sprite: 'BussinessMan',
    spriteSrc:'./Assets/Sprites/bussines_man.png',
    frameWidth: 30.66,
    frameHeight:31.5,
    animationMapping:{
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
    canTalk: true,
    dialogs:["Holdea esas acciones malnacido", "me voy a una importante cena de negocios", "Mi esposa no me soporta"]
  },
  {
    id: 'oldWoman1',
    sprite: 'oldWoman1',
    spriteSrc: './Assets/Sprites/oldWoman1.png',
    frameWidth: 32,
    frameHeight:32,
    animationMapping:{
      up:{
        leftFoot:2,
        standing: 0,
        rightFoot:1
      },
      down:{
        leftFoot:5,
        standing:3,
        rightFoot:4
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
    canTalk:true,
    dialogs:["Hola, que buen día hace", "está el tiempo loco ultimamente", 'pareces un joven muy simpático']
  }
]