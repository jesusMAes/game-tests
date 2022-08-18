export const universityNpcs = [
  {
    id: 'Archival Teacher',
    sprite: 'teacher1',
    spriteSrc: './Assets/Sprites/teacher1.png',
    frameWidth: 32,
    frameHeight:34,
    animationMapping:{ //moves
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
    randomMove: 0,
    currentDialog: 0, 
    canTalk: true,
    dialogs:[
      {
        currentPhrase:0,
        content: [
          ['Archival teacher', 'First archives emerged in mesopotamia,scribes wrote important information and stored it in safe places'],
          ['Archival teacher', 'This information was vital to govern a civilization and only important people has access to it'],
          ['Archival teacher', `The word 'Archive' derives from 'Archeion', a greek word that means: origin `]
        ]
      },
      {
        currentPhrase: 0,
        content: [
          ['Archival Teacher', 'Several archival techniques were developed with the passage of time, as more information your archive has more difficult was store it and retrieve it'],
          ['Archival teacher', `In the middle ages the archive was used to sustains legal right. The catolic church was the principal responsable of preserve the documents`],
          ['Archival teacher', 'It was in 18th century that the archives open his door to most people, at the same time Archival science get its modern basis ']
        ]
      },
      {
        currentPhrase:0,
        content: [
          ['Archival teacher', 'But what we call Archive?'],
          ['Archival teacher', 'An Archive its the union of three components: the archive as a building, the group of documents that stores, and the information of the documents'],
          ['Archival teacher', `Not every document its an archival document, to be kept in an archive a document must be the result of the work of a person or entity`],
          ['Archival teacher', `So a copy of don quixote isn't an archival document, but it's registry in the patents oficine it is`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Archival teacher', `The very first rule of archival science its the rule of origin`],
          ['Archival teacher', `Each document must be in the colection from which it comes, and this collection in his original place`],
          ['Archival teacher', 'As archival documents are derived from everyday work, people dont choose create archives, they work and the archive appears in a natural way'],
          ['Archival teacher', `But we can't let the archive to growth without a control`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Archival teacher', `There are a lot of ways to organize an archive but its crucial to remember that every document must be with its series, documents are produced in an order that must be preserved`],
          ['Archival teacher', `Each archive has one or more fund, an each fund must have it's own classification chart`],
          ['Archival teacher', `classification charts organizes the contents of the fund in a way that can be consulted to retrieve documents`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Archival teacher', `There are several types of archives`],
          ['Archival teacher', `The office archive is the first archive, documents are created in an office and stays here during a time until they are not used`],
          ['Archival teacher', `Central archive is where documentation goes when its not used, normally after 5 years`],
          ['Archival teacher', `When documentation has 15 years go to the intermediate archive, here some documents are destroyed because is impossible to store everithing `],
          ['Archival teacher', `At last the documents that survive go to the historic archive where are preserved forever`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Archival teacher', `One of the most horrible dangers to an archive is a fire or an inundation`],
          ['Archival teacher', `Both causes serious damage on the documents, water can damage documents in the same way that fire`],
          ['Archival teacher', `Thats why you don't use water to extinguish a fire in an archive, instead we use gases that moves oxygen to drown the fire`]
        ]
      }

    ],
  },//archival teacher
  {
    id: 'communication Teacher',
    sprite: 'teacher2',
    spriteSrc: './Assets/Sprites/teacher2.png',
    frameWidth: 32,
    frameHeight:32,
    animationMapping:{ //moves
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
    randomMove: 5,
    currentDialog: 0, 
    canTalk: true,
    dialogs:[
      {
        currentPhrase:0,
        content:[
          ['Communication teacher', 'Is normal to be nervous when you are in front of a camera'],
          ['Communication teacher', 'And is imposible to look natural when you are nervous'],
         ['Communication teacher', `So what's the secret to overcoming camera fear?`],
         ['Communication teacher', 'Boredom']
        ]
      },
      {
        currentPhrase:0,
        content: [
          ['Communication teacher', `The secrets is been in front of a camera until beeing there make you feel more bored than nervous `],
          ['Communication teacher','So everyday stay in front of a Camera, make ridiculous things in front of the camera, sing to the camera'],
          ['Communication teacher', `And eventually you will be able to talk naturally to a Camera`]
        ]
      },
      {
        currentPhrase:0,
        content:[
         ['Communication teacher', `When you are talking to an auditorium you must draw an imaginary square whith the borders of the auditorium` ],
         ['Communication teacher', `During your speech let your eyes move along the square and when you arrive at a limit look slowly a diagonal line `],
         ['Communication teacher', `In this way you create the illusion of looking each espectator to the eyes`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Communication teacher', `When communicating be careful with your movements, its not only your words what communicate, all your body sends a message`],
          ['Communication teacher',`If you have to walk over a scenary, make slow movements and change your direction often but stay quiet sometimes`]

        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Communication teacher',`When talking to radio broadcasting don't memorize the text, just fix the key ideas and let your mind do the rest`],
          ['Communication teacher', `A large knowledge of the subject is key to create an interesting communication`],
          ['Communication teacher', `Use annotation to highlight the text, underline the changes of rythm, put in bold strong words`],
          ['Communication teacher',`Voice come from your lungs, the first step to a good speach is learn to breathe with the diaphragm`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Communication teacher',`You can't write a speech in the same way than a text`],
          ['Communication teacher', `In broadcast you have to use small sentences, explain technical terms`],
          ['Communication teacher', `Use times that feels psychologically close to the present to increase the listener feelings `],
          ['Communication teacher', `Build your sentences with verbs, no with nouns`]
        ]
      }
    ],
  },//communication teacher
  {
    id: 'documental languages teacher',
    sprite: 'teacher3',
    spriteSrc: './Assets/Sprites/teacher3.png',
    frameWidth: 32,
    frameHeight:32,
    animationMapping:{ //moves
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
    randomMove: 5,
    currentDialog: 0, 
    canTalk: true,
    dialogs:[
      {
        currentPhrase:0,
        content:[
          ['Documental languages teacher','Organize the knowledges consist in simbolical representations of that knowledge'],
          ['Documental languages teacher', `Knowledge organization study the principles, norms, procedures and instruments to organize knowledge`],
          [`Documental languages teacher`, `We do this in a triple perspective: organizational, representative and communicative`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Documental languages teacher', 'Some basic ways in which we organize knowledges are abstracts, indization, and documental languages '],
          ['Documental languages teacher', `A documental language is a normalized system of signs that describes the content of a document`],
          ['Documental languages teacher',`There a several kind of documental languages but the most used are Thesaurus and classification systems`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Documental languages teacher', `A thesaurus is a instrument for control, that avoid inconsistencies when describing the content of a document `],
          ['Documental languages teacher', `A classificatory documentary language like dewey systemn are group of labels that indicates the subject of a book`],
          ['Documental language teacher', `Using CDU we can store books in a logical way that indicates the user the content of the books`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Documental languages teacher', `When working on computerized environments we have to worry about retrieval`],
          ['Documental languages teacher', `Using thesaurus and keywords we can save a lot of search to the user just by choosing the correct terms to represent the content of a book`]
        ]
      }

    ],
  },//documental languages teacher
  {
    id: 'mass comunication teacher',
    sprite: 'teacher4',
    spriteSrc: './Assets/Sprites/teacher4.png',
    frameWidth: 32,
    frameHeight:32,
    animationMapping:{ //moves
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
    randomMove: 5,
    currentDialog: 0, 
    canTalk: true,
    dialogs:[
     {
      currentPhrase:0,
      content:[
        ['Mass communication teacher', `To be a journalist you must know how massive communication affects people`],
        ['Mass communication teacher', `Communication is a complex proccess, and when the emisor is an authority or have massive audience its effects are differents`],
        ['Mass communication teacher', `The levels of communication are: interpersonal, groupal, organizational, mediatic, and public opinion`],
        ['Mass communication teacher', `As journalist we have to care about the effect of our messages`],
      ]
     },
     {
      currentPhrase:0,
      content:[
        ['Mass communication teacher', `First researchs about the effect of communication where simple and based in an immeadiate effect`],
        ['Mass communication teacher', `Theories like the magic bullet theory says that communication impacts directly on the behavious of the receiver `],
        ['Mass communication teacher', `Posterior theories says that the effects of communication are perceived by creating dominating ideas`],
        ['Mass communication teacher', `In that way is possible to repeat an idea until it makes effects in the society`],
      ]
     },
     {
      currentPhrase:0,
      content:[
        ['Mass communication teacher', `This theories where critized for its strong leftist component and where based on cultural domination`],
        ['Mass communication teacher', `One of the most accepted theories is the cultive theory that affirms that the messages of the media have an impact in long term`],
        ['Mass communication teacher', `By exposing us to certains contents we normalice those contents and assimilated its discourses`],
        ['Mass communication teacher', `Communication theories frecuently are taken as dogmas but the fact that communication affect us doesn't inhibe our capacity to analyze the message `],
      ]
     },
     {
      currentPhrase:0,
      content:[
        ['Mass communication teacher', ` You don't become a violent person just to seeing violent videos, as long as you can criticize those contents and they provoke you a reaction`],
        ['Mass communication teacher', `So the influence is limited by several factors, but that doesn't means that not exist`],
        ['Mass communication teacher', `The spiral of silence affirms that more accepted messages are able to reproduce, while messages that minorities emit tend to dissapear `],
      ]
     }

    ],
  },//mass comunication teacher
  {
    id: 'retrieval information teacher',
    sprite: 'teacher5',
    spriteSrc: './Assets/Sprites/teacher5.png',
    frameWidth: 32,
    frameHeight:32,
    animationMapping:{ //moves
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
    randomMove: 5,
    currentDialog: 0, 
    canTalk: true,
    dialogs:[
      {
        currentPhrase:0,
        content:[
          ['Information retrieval teacher', `Information is useless if you can't access to it`],
          ['Information retrieval teacher', `In modern world most information are stored in databases, we access to its content using SQL`],
          ['Information retrieval teacher', `SQL is a language that allows to consult databases in different ways`],
          ['Information retrieval teacher', `One common use of SQL is to retrieve information about one user in a web`],
          ['Information retrieval teacher', `Traditional way to design databases its the entity-relationship model`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Information retrieval teacher', `Most retrieval information model are strongly based in boolean algebra`],
          ['Inner me', `But if you are reading this in your work I assume you aren't in the mood for maths`],
          ['Information retrieval teacher', `When a user types what he want we use operations in order to discard irrelevant documents and find relevants document`],
          ['Information retrieval teacher', `There are several ways to do this`],
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Information retrieval teacher', `Actually we have huges amounts of documents, is impossible to look one by one`],
          ['Information retrieval teacher', `Information retrieval works by finding efficients ways to retrieve the desired document in a collection`],
          ['Information retrieval teacher', `We distinguish between data retrieval and information retrieval`],
          ['Information retrieval teacher', `Data retrieval is when you have a high definited consult and structured data, for example: tell me the name of that person `],
          ['Information retrieval teacher', `Information retrieval is when there is no just one correct answer o you have unstructured documents for example: What happens in Borges novels `],
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Information retrieval teacher', `So even if we have to learn data retrieval in order to make information retrieval, information retrieval is a more complex and abstract ramification`],
          ['Information retrieval teacher', `As we have the information in documents this add an extra layer of challenge`],
          ['Information retrieval teacher', `If you want to get the core subjects of a document you have to delete all the words that doesn't add information, like "the", "he"...`],
          ['Information retrieval teacher', `Then you have to collect all the documents that have the terms the user ask`],
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Information retrieval teacher', `But now you have around 10000 documents that have those words. Which you give to the user?`],
          ['Information retrieval teacher', `Here is where the maths comes into play`],
          ['Information retrieval teacher', `Google uses several algorithms of information retrieval, one of the most known is Pagerank`],
          ['Information retrieval teacher', `In his earlier stages Google used pagerank to decide which of the retrieved pages show to the users`],
          ['Information retrieval teacher', `So the user types what is searching, google get all pages that contains similar words and display using pagerank`],
          ['Information retrieval teacher', `Of course this was in initial stages, the current search algorith of google are extremely complex`]
        ]
      },
      {
        currentPhrase:0,
        content:[
          ['Information retrieval teacher', `There are several ways to make this algorithms`],
          ['Inner me', `I don't want to bore you so let's say there is one based in vectors, one based in probabilities and one based in boolean algebra`],
          ['Inner me', `Now hire me`]
        ]
      }
    ],
  },//information retrieval teacher
]