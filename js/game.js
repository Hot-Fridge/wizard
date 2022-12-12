import Player from "./Player.js";        // не забыть добавить в html - type="module" для импорта этого js
import Controls from "./Controls.js";    // Кнопки управления игроком
import Landscape from "./Landscape.js";  // Дополнительный ландшафт - деревья, кусты и т.д.
import Platforms from "./Platforms.js";  // Специфические платформы - не из тайловой карты.
import Coin from "./Coin.js";            // монета

var button;
const createAligned = (scene, count, texture, scrollFactor) => {
  let x = 0;
  for(let i=0; i<count; ++i) {
     const m = scene.add.image(x, scene.scale.height, texture)
                 .setOrigin(0,1)
                 .setScrollFactor( scrollFactor );
     x += m.width;
  }
}

var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
     initialize:
 
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
        console.log('Phaser.VERSION = ' + Phaser.VERSION);
    },
 
    preload: function ()
    {

       //this.scale.scaleMode = Phaser.ScaleManager_SHOW_ALL;
       //this.scale.scaleMode = Phaser.ScaleModes.Linear;
       this.scale.scaleMode = Phaser.ScaleModes.Nearest;

       this.scale.pageAlignHorizontally = true;
       this.scale.pageAlignVertically = true;
                                                                                         
       // здесь будет загрузка ресурсов
       // работающий атлас можно сделать на сайте - gammafp.com  в разделе https://gammafp.com/tool/atlas-packer/
       this.load.atlas( 'player_i', 'assets/wizard_idle.png', 'assets/wizard_idle_atlas.json');          // атласы игрока
       //this.load.atlas( 'player_i', 'assets/wiz_idle.png', 'assets/wiz_idle_atlas.json');
       this.load.atlas( 'player_r', 'assets/wizard_run.png', 'assets/wizard_run_atlas.json');
       //this.load.atlas( 'player_r', 'assets/wiz_run.png', 'assets/wiz_run_atlas.json');
       this.load.atlas( 'player_j', 'assets/wizard_jump.png', 'assets/wizard_jump_atlas.json');
       this.load.atlas( 'player_a1', 'assets/wiz_attack1.png', 'assets/wiz_attack1_atlas.json');
       this.load.atlas( 'player_a2', 'assets/wiz_attack2.png', 'assets/wiz_attack2_atlas.json');


       this.load.atlas( 'coin', 'assets/coin/coin.png', 'assets/coin/coin_atlas.json');   // атлас монетки
       this.load.atlas( 'portal', 'assets/portal/portal3.png', 'assets/portal/portal3_atlas.json');   // атлас портала
       this.load.atlas( 'fb', 'assets/fireball/fireball.png', 'assets/fireball/fireball_atlas.json');   // атлас голубой шаровой молнии


       this.load.atlas( 'set0', 'assets/set0/set0.png', 'assets/set0/set0_atlas.json');  // атлас разных элементов
       this.load.atlas( 'set1', 'assets/set1/set1.png', 'assets/set1/set1_atlas.json');  // атлас кнопки и индикаторы жизни

       this.load.image( 'tiles', 'assets/RPG Nature Tileset.png');  // тайлсет для карты уровня  32 на 32 
       this.load.image( 'bg', 'assets/bg.png');                     // фон
  
       this.load.tilemapTiledJSON('map1','assets/map1.json');       // карта уровня на основании тайлсета RPG Nature Tileset
       this.load.image( 'bgtiles', 'assets/tiledbackground3.png');  // горы, как фон будет дублироваться методом createAligned
       this.load.image( 'pl1', 'assets/pl1.png');                   // картинка платформы, есть в атласе set0, просто для демонстрации работы с картинками




    },
 
    create: function ()
    {
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

    
    function WorldScene () {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function () {
 
    },

    create: function () {
        // здесь мы создадим сцену мира
        const width = this.scale.width;
        const height = this.scale.height;

        this.bg =  this.add.image(0, 550, 'bg')
                   .setOrigin(0,1)
                   .setScrollFactor(0);

        const map1 = this.make.tilemap({key: 'map1'});
        const tileset = map1.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0);         
        createAligned( this, 9, 'bgtiles', 1.2);   // делаем повторяющийся фон
       
        //var atlasSet0 = this.textures.get('set0');

      
        const layer1 = map1.createLayer('Tile Layer 1', tileset, 0, 0);
        const layer2 = map1.createLayer('Tile Layer 2', tileset, 0, 0);
        const layer3 = this.add.layer(); 


        layer1.setCollisionByProperty({collides:true});

        /*
        this.platformes = this.physics.add.group();
        this.platformes.enableBody = true
        this.platformes.immovable = true
        */

        this.platforms = new Platforms( {scene: this, layer: layer1, texture_landscape: 'set0'} );
        new Landscape({scene: this, layer: layer3, texture_landscape: 'set0'}); 

        this.coins = this.add.group();

        this.coins.add(  new Coin({scene:this, x:50, y:this.scale.height - 100, texture_coin:'coin', cost: 5})  ); 
        this.coins.add(  new Coin({scene:this, x:450, y:this.scale.height - 100, texture_coin:'coin', cost: 5})  ); 


        this.anims.create({
            key: 'aportal',
            frames: this.anims.generateFrameNames('portal', { prefix: '00', start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.portal =  this.add.sprite(3100, 70, 'portal', 0);
        this.portal.anims.play('aportal',true);




        this.p = new Player({ scene:this, x:200, y:100, 
                         texture_idle:'player_i', 
                         texture_run:'player_r', 
                         texture_jump:'player_j',
                         texture_attack1:'player_a1',
                         texture_attack2:'player_a2',
                         texture_shot: 'fb',
                         frame:'w_i_1'});

        this.controls = new Controls({ scene:this, texture_buttons: 'set1' });
        this.controls.attach( this.p );

        console.log('---------------------');


        //// пример таботы по таймеру
        //this.time.addEvent({delay:1000, callback: () => {this.p.body.setSize(55,70,true);  console.log("timer example");}, callbackScope: this, loop: false});
        //this.p.setOrigin(0.5,1);


        //this.p.setCollideWorldBounds(true); //не дает игроку выйти за пределы мира
        this.p.checkWorldBounds = true;   

        this.physics.add.collider( this.p, layer1);
        this.physics.add.collider( this.p, this.platforms.pl1);
        //this.physics.add.collider( this.p, this.coins, this.callback );
        //this.callback = () => {
        //   console.log("При добавлении коллайдера игрок не может пройти через монету");
        //}
               
        // ограничиваем камеру размерами карты
        this.cameras.main.setBounds(0, 0, 3200, 640);  
        // заставляем камеру следовать за игроком
        this.cameras.main.startFollow(this.p);
        //своего рода хак, чтобы предотвратить пояление полос в тайлах
        this.cameras.main.roundPixels = true;   

    },
    
    update: function() {
       
       this.coins.children.iterate((coin) => {
        if (coin != null ) {
          if ( Phaser.Geom.Rectangle.Overlaps(this.p.getBounds(), coin.getBounds()) ) {
            this.p.wizard_add_money(coin.cost);
            coin.destroy();
            coin = null;
            console.log("wizard have money " + this.p.money); 
          }
        }         
       });

       this.p.update();

    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 390,
    height: 640,
    input: {
      activePointers: 3, //для мультитача, одновременно нажать две кнопки, по умолчанию Phaser делает две - mousePointer и pointer1
    },
    zoom: 1,
    backgroundColor: "#88F",

    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }
        }
    },
    debug: true,
    scene: [
        BootScene,
        WorldScene
    ]
};



var game = new Phaser.Game(config);
