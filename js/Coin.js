export default class Coin extends  Phaser.Physics.Arcade.Sprite {  

   constructor ( data ) { 
        let {scene, x, y, texture_coin, cost } = data;

        super( scene, x, y, texture_coin, 0);

        this.cost = cost;

        this.scene.add.existing( this );      
        this.scene.physics.add.existing(this);

        this.body.immovable = true
        this.body.allowGravity = false;



        this.anims.create({
            key: 'acoin',
            frames: this.anims.generateFrameNames(texture_coin, { prefix: 'c', start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.play('acoin',true);

   }

}