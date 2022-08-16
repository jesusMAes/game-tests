
export const murcianpcs =[
  {
    id: 'Dolores', //name which correspond a Tiled object
    sprite: 'oldWoman1',
    spriteSrc: './Assets/Sprites/oldWoman1.png',
    frameWidth: 32,
    frameHeight:32,
    animationMapping:{ //moves
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
    randomMove: 5, //Controls grid engine movement
    currentDialog:0,
    canTalk: true,
    dialogs:[
      { //first interaction
        currentPhrase: 0,
        content: [
          ['Jesús', 'Hello, Dolores, how are you?'],
          ['Dolores', 'Oh, a nice day, taking a walk, at my age you have to stay active '],
          ['Jesus', `Thats important, I'm doing the same but to clear my mind`],
          ['Dolores', 'Again stucked with that thing of programming?'],
          ['Jesús', 'Yep...'],
          ['Dolores', 'Your mother told me you are doing a game. How its going?'],
          ['Jesús', `Ugh... Slow, but this things always go slow`],
          ['Dolores', `Well, you are a clever working boy, I'm sure you'll finish it`],
          ['Jesús', `Thanks, have a nice day, Dolores`]
        ]
      },
      {//second interaction
        currentPhrase:0,
        content:[
          ['Dolores', `Tell your mother that this afternoon I'll make cake`],
          ['Jesús', `Sure! she loves it!`]
        ]
      }
    ],


  },//dolores
  {
    id: 'Jose',
    sprite: 'normalGuy1',
    spriteSrc: './Assets/Sprites/normalGuy1.png',
    frameWidth: 31.333,
    frameHeight: 32,
    canTalk: true,
    animationMapping:{
      up:{
        leftFoot: 2,
        standing: 0,
        rightFoot:1
      },
      down:{
        leftFoot: 4,
        standing: 3,
        rightFoot:5
      },
      left:{
        leftFoot: 7,
        standing: 6,
        rightFoot:8
      },
      right:{
        leftFoot: 11,
        standing: 9,
        rightFoot:10
      }
    },
    randomMove: 7,
    currentDialog: 0,
    dialogs:[
      {
        currentPhrase:0,
        content: [
          ['Jose', 'EY JESUS WHAT ARE YOU DOING OUTSIDE!'],
          ['Inner me', 'Why Jose always scream?'],
          ['Jesús', 'Just walking around, talking to the people,taking a breath, you know'],
          ['Jose', 'YOU SHOULD GO OUT MORE OFTEN, LOOK AT YOU, HOW PALE YOU LOOK!'],
          ['Jesús', 'Eh...'],
          ['Jose', 'WELL SEE YOU LATER!'],
        ],
      },
      {
        currentPhrase:0,
        content:[
          ['Inner Me', `I'm not in the mood to talk with him`]
        ]
      }
    ]
  },//Jose
  {
    id: 'Mariano',
    sprite: 'oldMan1',
    spriteSrc: './Assets/Sprites/oldMan1.png',
    frameWidth:31.333,
    frameHeight: 33, 
    animationMapping:{
      up:{
        leftFoot:10,
        standing: 0,
        rightFoot:2
      },
      down:{
        leftFoot: 11,
        standing: 5,
        rightFoot:8
      },
      left:{
        leftFoot: 3,
        standing: 6,
        rightFoot:3
      },
      right:{
        leftFoot: 4,
        standing: 1,
        rightFoot:7
      },
    },
    randomMove: 0,
    canTalk: true,
    currentDialog: 0,
    dialogs:[
      {
        currentPhrase:0,
        content:[
          ['Inner Me', 'Oh, its Mariano, I wonder if he still talking like Rajoy'],
          ['Jesús', 'Hi Mariano!'],
          ['Mariano', `A glass is a glass and a plate is a plate`],
          ['Jesús', 'Yep, still with the joke']
        ]
      },
      {
        currentPhrase: 0,
        content:[
          ['Mariano', `I'll do everything I can and a little more than I can if that is possible`],
          ['Mariano',` and I'll do everything possible and even the impossible if the impossible is also possible.`]
        ]
      },
      {
        currentPhrase: 0,
        content:[
          ['Mariano', `It is necessary to manufacture machines that allow us to continue manufacturing machines`],
          ['Mariano',` because what the machine will never do is to manufacture machines.`],
          ['Mariano',` I said I would lower taxes and I am raising them.`]
        ]
      },
      {
        currentPhrase: 0,
        content:[
          ['Mariano', `It is not the same if one governs than the other, it is not the same, in other words, it is very different.`],
          ['Mariano',` It is one thing to be supportive and another thing to be supportive in exchange for nothing.`]
        ]
      },
      {
        currentPhrase: 0,
        content:[
          ['Mariano', `Talavera ceramics is not a minor thing, in other words, it is a major thing.`],
          ['Mariano',` We are feelings and we have human beings`],
          ['Mariano',` It's very difficult todo esto`]
        ]
      },
    ]
  },//Mariano
  {
    id: 'Gustavo',
    sprite: 'normalGuy2',
    spriteSrc: './Assets/Sprites/normalGuy2.png',
    frameWidth:31.333,
    frameHeight: 33,
    animationMapping:{
      up:{
        leftFoot:10,
        standing: 0,
        rightFoot:2
      },
      down:{
        leftFoot: 11,
        standing: 5,
        rightFoot:8
      },
      left:{
        leftFoot: 3,
        standing: 6,
        rightFoot:3
      },
      right:{
        leftFoot: 4,
        standing: 1,
        rightFoot:7
      },
    },
    randomMove: 0,
    currentDialog: 0,
    canTalk: true,
    dialogs:[
      {
        currentPhrase:0,
        content:[
          ['Jesús', 'Hey Gustavo, I see your baby is growing'],
          ['Gustavo', `It's a litle devil ins't it?`],
          ['baby', 'GAH'],
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Baby', 'GAH!']
        ]
      }
    ]
  },
  {
    id: 'GameBoyBoy',
    sprite: 'gameBoyBoy',
    spriteSrc: './Assets/Sprites/gameBoyBoy.png',
    frameWidth:31.333,
    frameHeight: 33,
    animationMapping:{
      up:{
        leftFoot:0,
        standing: 0,
        rightFoot:0
      },
      down:{
        leftFoot: 0,
        standing: 1,
        rightFoot:0
      },
      left:{
        leftFoot: 0,
        standing: 0,
        rightFoot:0
      },
      right:{
        leftFoot: 0,
        standing: 0,
        rightFoot:0
      },
    },
    randomMove: 0,
    currentDialog: 0,
    canTalk: false,
  },//gameboy boy
  {
    id: 'bikeWoman',
    sprite: 'bikeWoman',
    spriteSrc: './Assets/Sprites/bikeWoman.png',
    frameWidth:32.333,
    frameHeight: 33,
    animationMapping:{
      up:{
        leftFoot:10,
        standing: 0,
        rightFoot:2
      },
      down:{
        leftFoot: 11,
        standing: 5,
        rightFoot:8
      },
      left:{
        leftFoot: 3,
        standing: 6,
        rightFoot:3
      },
      right:{
        leftFoot: 4,
        standing: 1,
        rightFoot:7
      },
    },
    randomMove: 4,
    currentDialog: 0,
    canTalk: false,
    dialogs:[
      
    ]
  },
  {
    id: 'Alicia',
    sprite: 'friendWoman1',
    spriteSrc: './Assets/Sprites/friendWoman1.png',
    frameWidth:33,
    frameHeight: 34,
    animationMapping:{
      up:{
        leftFoot:0,
        standing: 0,
        rightFoot:0
      },
      down:{
        leftFoot: 0,
        standing: 5,
        rightFoot:0
      },
      left:{
        leftFoot: 0,
        standing: 0,
        rightFoot:0
      },
      right:{
        leftFoot: 0,
        standing: 0,
        rightFoot:0
      },
    },
    randomMove: 0,
    currentDialog: 0,
    canTalk: true,
    dialogs:[
      {
        currentPhrase:0,
        content:[
          ['Alicia', `It's been a long time, where have you been hiding? `],
          ['Jesús', `Hi Alicia, I've been in the same place as always`],
          ['Alicia', `You should go out more often`],
          ['Jesús', `Yep but you know, first university, then job search, so many work to done, so many things to learn...`],
          ['Alicia', `You take life too seriously`],
          ['Alicia', `Look around how lucky we are to be alive right now...`],
          ['Jesús', `GASP, Are you qouting Hamilton?, I see, you use my own weapons against me`],
          ['Alicia', `jejeje...`],
          ['Jesús', `Well it has been a pleasure to see you`],
          ['Alicia', `Come here more often, we miss you`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Alicia', `Call me this week and we'll play a few games of Magic `],
          ['Alicia', `I have a lot of new decks`],
          ['Jesús', `Sure!`]
        ]
      }
    ]
  },//Alicia
  {
    id: 'Emmanuel',
    sprite: 'friend1',
    spriteSrc: './Assets/Sprites/friend1.png',
    frameWidth:33,
    frameHeight: 34,
    animationMapping:{
      up:{
        leftFoot:10,
        standing: 0,
        rightFoot:2
      },
      down:{
        leftFoot: 11,
        standing: 1, //changed to face direction, corret is 5
        rightFoot:8
      },
      left:{
        leftFoot: 3,
        standing: 6,
        rightFoot:3
      },
      right:{
        leftFoot: 4,
        standing: 1,
        rightFoot:7
      },
    },
    randomMove: 0,
    currentDialog: 0,
    canTalk: false,
    dialogs:[]
  },//Emmanuel

]

//npcs is a array of objects, each object is a npc, with an Id, a name, its associated spritesheet, the mapping of that spritesheet, the hard part its the dialogs, in order to create several interactions each dialog its a object which stores the current dialog inside that "block of dialogs", this number will increase to display the next dialog, and at the end of each interaction we update the global property that manages the current block of dialogs to display