export default class Platforms {  

   constructor ( data ) {
        let {scene, layer, texture_landscape } = data;

        this.pl1 = scene.physics.add.sprite(390, scene.scale.height - 200, texture_landscape, 'platform1', 1000);
        this.pl1.enableBody = true;
        scene.physics.add.collider( this.pl1, layer);
        this.pl1.body.immovable = true
        this.pl1.body.allowGravity = false;

   }

}
