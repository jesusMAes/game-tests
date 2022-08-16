export const roomData = [
  {
    name: 'Computer',
    emotion: 'confused',
    currentDialog: 0,
    
    dialogues:[
      {
        id: 1,
        currentPhrase:0,
        portrait:'player',
        content:[`I'm stuck in that piece of code`, `Let's take a walk and back to work later`]
      },
      {
        id: 2,
        currentPhrase:0,
        portrait: 'player',
        content:['Nope, I need to clear my mind']
      }
    ]
  },
  {
    name: 'Bed',
    emotion: 'exclamation',
    currentDialog:0,
  
    dialogues:[
      {
        id:1,
        portrait: 'player',
        currentPhrase:0,
        content:[`Not the moment for a nap`, `Maybe later`]
      },
      {
        id:2,
        portrait: 'player',
        currentPhrase:0,
        content: [`Don't tempt me!`]
      }
    ]
  },
  {
    name: 'Shelve',
    emotion: 'exclamation',
    currentDialog:0,
  
    dialogues:[
      {
        id:1,
        portrait: 'player',
        currentPhrase:0,
        content:[`Fantasy literature is awesome`, `Here are some of my favourites books`]
      },
      {
        id:2,
        portrait: 'player',
        currentPhrase:0,
        content: [`I can't start a new read now`,`I've not finished the book on the table yet`]
      }
    ]
  }
]