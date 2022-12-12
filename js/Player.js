import HealthBar from "./HealthBar.js";

export default class Player extends  Phaser.Physics.Arcade.Sprite  {
//export default class player extends Phaser.GameObjects.Sprite  {
  health = 100;
  money = 0;

  constructor(data) {
     let {scene, x, y, texture_idle, texture_run, texture_jump, texture_attack1, texture_attack2, texture_shot, frame} = data;  
     super( scene, x, y, texture_idle, frame);     
     this.scene.add.existing( this );       // добавление на сцену, без этого персонажа просто не видно
     this.scene.physics.add.existing(this); // без этого не создается body и поэтому недьзя установить скорость
     this.texture_shot = texture_shot;
     this.body.setSize(55,70,true);

     this.hbar = new HealthBar(scene, this.x , this.y - 5);
     this.texture_shot = texture_shot;
     

     this.anims.create({
            key: 'wiz_idle',
            frames: this.anims.generateFrameNames(texture_idle, { prefix: 'w_i_', start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
     });


     this.anims.create({
            key: 'wiz_run_r',
            frames: this.anims.generateFrameNames(texture_run, { prefix: 'w_r_', start: 1, end: 8 }),
            frameRate: 10,
            repeat: -1
     });

     // добавить анимацию прыжка

     this.anims.create({
            key: 'wiz_attack1',
            frames: this.anims.generateFrameNames(texture_attack1, { prefix: 'w_a_', start: 3, end: 6 }),
            frameRate: 10,
            repeat: -1
     });

     this.anims.create({
            key: 'wiz_attack2',
            frames: this.anims.generateFrameNames(texture_attack2, { prefix: 'w2_a_', start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
     });

     /*
     this.afb = this.anims.create({
            key: 'afb',
            frames: this.anims.generateFrameNames(texture_shot, { prefix: 'fb', start: 1, end: 4 }),
            frameRate: 10,
            repeat: -1
     });
     */

     this.bfire1Pressed = false;
     this.bleftPressed = false;
     this.brightPressed = false;
     this.bjumpPressed = false;

     this.enableBody = true;

     this.inputKeys = scene.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          right: Phaser.Input.Keyboard.KeyCodes.D, 
          space: Phaser.Input.Keyboard.KeyCodes.SPACE
     });


  }

  wizard_add_money( value ) {
     this.money += value;
  }

  wizard_press_virtual(virtual_key, state) {
     if ( virtual_key == 'up') {
        this.bjumpPressed = state;
     } else if ( virtual_key == 'left') {
        this.bleftPressed = state; 
     } else if ( virtual_key == 'right') {
        this.brightPressed = state;
     } else if ( virtual_key == 'space') {
        if (state) this.wizard_fire1();  
        //this.bfire1Pressed = state;
     } 
  }

  wizard_move_left() {
     this.body.velocity.x = -200;
     this.setFlipX(true);
     this.anims.play('wiz_run_r', true); 
  };

  wizard_move_right = () => {
     this.body.velocity.x = 200;
     this.setFlipX(false);
     this.anims.play('wiz_run_r', true);
  };

  wizard_jump = () => {
     this.body.velocity.y = -400;
  };

  wizard_fb_shot = () => {
     var x,y,v,delta,shot;
     delta = this.body.width + 4;
     v = 300;
     if ( this.flipX )  {
        v = -v; delta = 0;
     }           
     x = this.body.x + delta;
     y = this.body.y + 23;
     shot = this.scene.physics.add.sprite(x, y, this.texture_shot, 0);
     shot.body.setAllowGravity(false);
     shot.anims.create({
            key: 'aFireball',
            frames: this.anims.generateFrameNames(this.texture_shot, { prefix: 'fb', start: 1, end: 4 }),
            frameRate: 10,
            repeat: -1
     });

     shot.anims.play('aFireball', true);      
     shot.enableBody = true;
     shot.body.velocity.x = v; 
     shot.setFlipX(this.flipX);
  }


  wizard_fire1 = () => {
     this.anims.stop();
     this.anims.play('wiz_attack2', false)
     // попытка выполнения чего-либо по завершению анимации
     // (Нужно стрельнуть молнией, разрешить остановленную анимацию) 
     // 'animationcomplete' не работает, а событие повтора анимации означает что анимация ЗАКОНЧИЛАСЬ и начинается снова
     // Вот такое решение :(
     this.wizard_fb_shot();
     this.on('animationrepeat',()=>{ /*console.log("repeat");*/ this.bfire1Pressed = false;});                                                                     
     this.bfire1Pressed = true;             
  };




  get velocity() {
     return this.body.velocity;
  }

  update() {
     this.body.velocity.x = 0;

      if ( !this.bfire1Pressed) {
          if (this.inputKeys.left.isDown) {
             this.wizard_move_left()
          } 

          if (this.inputKeys.right.isDown) {
             this.wizard_move_right()
          }

          //if ( this.body.onFloor() && this.inputKeys.up.isDown) {   // && Phaser.Input.Keyboard.JustDown(this.inputKeys.up) ) {
          if ( this.body.onFloor() && Phaser.Input.Keyboard.JustDown(this.inputKeys.up) ) {
             console.log('op');
             this.wizard_jump();
          } 

         if ( this.bleftPressed ) {
            this.wizard_move_left()
         }

         if ( this.brightPressed ) {
            this.wizard_move_right()
         }

         if ( this.bjumpPressed ) {
           if ( this.body.onFloor() ) {  
              this.wizard_jump();
           }
         }


         if ( (this.body.velocity.x == 0) && ( this.body.velocity.y == 0) ) {
              this.anims.play('wiz_idle', false);
         }  

      } 

      if ( Phaser.Input.Keyboard.JustDown(this.inputKeys.space) ) {
      //if ( this.inputKeys.space.isDown ) {

         if ( !this.bfire1Pressed ) {
            this.wizard_fire1();
         }
      }
      
      this.hbar.x = this.body.x;
      this.hbar.y = this.body.y - 9;
      this.hbar.value = this.health;
      this.hbar.draw();

  }


}