 var DialogModalPlugin = function (scene){
  //recibimos la scene
  this.scene = scene;
  this.systems = scene.sys 

  if(!scene.sys.settings.isBooted){
    scene.sys.events.once('boot', this.boot, this);
    //activamos la escena ?
  }
};

//registrar el plugin con el plugin manager
DialogModalPlugin.register = function (PluginManager){
  PluginManager.register('DialogModalPlugin', DialogModalPlugin, 'dialogModal')
  //usamos el plugin manager y le damos un nombre
};

//funciones del plugin
DialogModalPlugin.prototype = {
  //se llama cuando el plugin manager carga el plugin
  boot: function(){
    var eventEmitter = this.systems.events; 
    //funcionalidad para que lance eventos
    eventEmitter.on('shutdown', this.shutdown, this)
    eventEmitter.on('destroy', this.destroy, this)
    //encender y apagar el plugin
  },

  //de momento vacio
  shutdown: function(){

  },

  destroy: function(){
    this.shutdown();
    this.scene = undefined
  },

  //metodo para crear la ventana
  init: function(opts){
    //revisa si le has pasado parametros
    if(!opts) opts = {};

    //todos los this son propiedades de este objeto
    //con los parametros personalizas la ventana si no hay es por defecto así
    this.borderThickness = opts.borderThickness || 3;
    this.borderColor = opts.borderColor || 0x907748;
    this.borderAlpha = opts.borderAlpha || 1;
    this.windowAlpha = opts.windowAlpha || 0.8;
    this.windowColor = opts.windowColor || 0x303030;
    this.windowHeight = opts.windowHeight || 150;
    this.padding = opts.padding || 32;
    this.closeBtnColor = opts.closeBtnColor ||'darkgoldenrod'
    this.dialogSpeed = opts.dialogSpeed || 3;

    //para animar el texto
    this.eventCounter = 0

    //para si está visible o no
    this.visible = true

    //el texto del interior
    this.text;
    //el texto que se mostrará
    this.dialog;
    this.graphics;
    this.closeBtn;

    //AÑADIDO POR MI, recibimos el canvas y lo usamos para las posiciones
    this.canvas = opts

    //llamamos al metodo para crear la ventana
    this._createWindow();
  },

  //metodos para obtener las dimensiones del dialogo, multiplicamos por el zoom
  _getGameWidth: function(){
    
    return this.scene.sys.game.config.width/2 ;
  },

  _getGameHeight: function (){
    
    return this.scene.sys.game.config.height  ;
  },


  //IMPORTANTE JUGAR CON ESTAS DIMENSIONES
  //calcular donde va el dialogo en base al tamaño del juego, esto hay que trastearlo
  _calculateWindowDimensions: function(width, height){
    var x = this.padding ;
    var y = height-this.windowHeight - this.padding;
    var rectWidth = width - (this.padding * 2);
    var rectHeight = this.windowHeight/2;

    return {
      x,
      y,
      rectWidth,
      rectHeight
    }
  },

  //El dialogo tiene dos ventanas, una para el borde y otra para el interior

  //ventana interior
  _createInnerWindow: function(x, y, rectWidth ,rectHeight){
    this.graphics.fillStyle(this.windowColor, this.windowAlpha);
    this.graphics.fillRect(x+1, y+1, rectWidth-1, rectHeight-1);
  },

  //ventana exterior
  _createOuterWindow: function(x, y, rectWidth, rectHeight){

    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);

    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  },

  //metodo que crea la ventana
  _createWindow: function (){
    
    var gameHeight = this._getGameHeight();
    var gameWidth = this._getGameWidth();
    var dimensions = this._calculateWindowDimensions(gameWidth, gameHeight);
    this.graphics = this.scene.add.graphics();
    this.graphics.depth=4
    this._createOuterWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);

    this._createInnerWindow(dimensions.x, dimensions.y, dimensions.rectWidth, dimensions.rectHeight);

    this._createCloseModalButton();
    this._createCloseModalButtonBorder();
  
  },

  //botón de cierre
  _createCloseModalButton: function(){
    var self = this;
    this.closeBtn = this.scene.make.text({
      x: this._getGameWidth() - this.padding -14,
      y: this._getGameHeight() - this.windowHeight - this.padding +3,
      text: 'X',
      style:{
        font: 'bold 12px Arial',
        fill: this.closeBtnColor
      }
    });
    this.closeBtn.depth =5

    this.closeBtn.setInteractive();
    this.closeBtn.on('pointerover', function(){
      this.setTint(0xff0000)
    });
    this.closeBtn.on('pointerout', function(){
      this.clearTint();
    });
    this.closeBtn.on('pointerdown', function(){
      self.toggleWindow()
    })
  },

  //borde del boton
  _createCloseModalButtonBorder: function(){
    var x = this._getGameWidth()- this.padding - 20;
    var y = this._getGameHeight()- this.windowHeight - this.padding;
    this.graphics.strokeRect(x,y,20,20)
  },

  //enseñar/ocultar el dialogo
  toggleWindow: function(){
    this.visible = !this.visible;
    if(this.text) this.text.visible = this.visible;
    if(this.graphics) this.graphics.visible = this.visible;
    if(this.closeBtn) this.closeBtn.visible = this.visible
  },

  //poner el texto, es el que llamamos desde la escena
  setText: function(text){
    this._setText(text);
  },

  //calcular en que parte de la ventana va el texto
  _setText: function (text){
    //resetea el dialogo
    if(this.text) this.text.destroy();

    var x = this.padding +10;
    var y = this._getGameHeight() -this.windowHeight - this.padding +10;

    //crea el objeto texto de phaser
    this.text = this.scene.make.text({
      x,
      y,
      text,
      style:{
        wordWrap: {
          width: this._getGameWidth() - (this.padding*2) -25
        }
      }
    })

  }
}

export default DialogModalPlugin