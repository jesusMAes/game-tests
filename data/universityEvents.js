//in this case we will use the same format of npc data

export const universityEvents = [
  {
    id: 'universityEntry',
    position: 0, //to localice the event
    currentDialog: 0,
    dialogs:[ 
      {
        currentPhrase: 0,
        content: [
          ['Jesús', `Even with the pandemic, the hard teachers,the incredible stress, the brutal anxiety`],
          ['Jesús',`The two hours in bus that took to get here, the high cost of the fees`],
          ['Jesús', `Some unpleasant colleagues, and the bureaucracy...`],
          ['Jesús', `My college years were some of the best of my life`],
        ],
      },
      {
        currentPhrase: 0,
        content: [
          ['Jesús', `But it's time to look forward, now I have two degrees and i have to get a job`]
        ]
      }
    ]
  },
  {
    id: 'journalismSign',
    position: 1,
    currentDialog: 0,
    dialogs: [
      {
        currentPhrase: 0,
        content: [
          ['Jesús', 'When it was time to choose what to study, I hesitated a lot'],
          ['Jesús', `It was a difficult choice but finally I choose Journalism`],
          ['Jesús', `I was an enthusiastic and idealistic young man `],
          ['Jesús', 'I love write so I want a job in which I could make a better world with my words'],
          ['Jesús', 'Maybe I should have checked for stage fright before enter in a Tv based proffesion']
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Jesús', `But communication is so interesting, there a lot of things to learn about it`],
          ['Jesús', `How investigate news, how talk with people in order to get information, the best ways to interview someone `],
          ['Jesús', `How write interesting pieces, the best ways to order information to make a history, a lot of things about social communication and history...`]
        ]
      },
      {
        currentPhrase: 0,
        content: [
          ['Jesús', `Communication industry is tough. You have to work everyday in every situation, with low wages and a lot of pressure.`],
          ['Jesús', `In Spain a normal journalist rarely earns more than 1200€`]
        ]
      },
      {
        currentPhrase:0,
        content: [
          ['Jesús', `That wasn't the life I want, but i was studying two degrees at the same time so I turn myself to Information Sciences`]
        ]
      }
    ]
  },//journalismSign

  {
    id: 'informationSign',
    position:2,
    currentDialog:0,
    dialogs: [
      {
        currentPhrase: 0,
        content: [
          ['Jesús', `Information sciences was my plan B. My university has a intensive program to obtain both journalism and information degrees in five years`],
          ['Jesús', `I know that it'll be hard but I've always been a good student `],
          ['Jesús', `Also as I love reading and the book world and I associated this degree with libraries I think that I've found it interesting`]
        ]
      },
      {
        currentPhrase:0,
        content: [
          ['Jesús', `I learned a lot about books but I was wrong with this degree, Information Sciences its much more than libraries`],
          ['Jesús', `We live in the information age, all the world depends on information, this game its just information`],
          ['Jesús','Software development its information, lot of ways of manipulate information, obtain it, store it, display it...']
        ]
      },
      {
        currentPhrase:0,
        content: [
          [`Jesús`, 'Most people find this boring but for me it was exciting, I learned about ancient ways of manage information, but also about the modern'],
          ['Jesús', `Yes, I still want work as a librarian because I believe in the power of libraries to create a better world`],
          ['Jesús', `But now I know that information is in the very center of each company, and know how to manages it to be more profficient`],
          ['Jesús', 'Also in this degree I begin to learn about programming. Most information are stored in databases, and we study best ways to improve it']
        ]
      },
      {
        currentPhrase:0,
        content: [
          ['Jesús', 'So finally I set out to learn as much as I could about Information Sciences, eventually this would lead me to learn programming']
        ]
      }
    ]
  },//information sign

  {
    id: 'teacherSign',
    position:3,
    currentDialog:0,
    dialogs: [
      {
        currentPhrase:0,
        content: [
          ['Sign', 'On this campus there are several teachers that will tell you things about journalism and information sciences'],
          [`Sign`, `Let's talk with they, we may test you later...`]
        ]
      }
    ]
  }

]//end of data