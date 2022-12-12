export default class Landscape {  

   constructor ( data ) {
        let {scene, layer, texture_landscape } = data;

        this.tree1 =  scene.add.sprite(1050, scene.scale.height - 130, texture_landscape, 'tree4');         
        layer.add([this.tree1]);
        this.tree1.setScrollFactor(1.1);

        this.tree2 =  scene.add.sprite(1350, scene.scale.height - 130, texture_landscape, 'tree5');        
        layer.add([this.tree2]);
        this.tree2.setScrollFactor(1.1);

        this.tree3 =  scene.add.sprite(1450, scene.scale.height - 130, texture_landscape, 'tree6');        
        layer.add([this.tree3]);
        this.tree3.setScrollFactor(1.1);

        this.tree4 =  scene.add.sprite(1750, scene.scale.height - 130, texture_landscape, 'tree4');        
        layer.add([this.tree4]);
        this.tree4.setScrollFactor(1.1);

        this.bush1 =  scene.add.sprite(1800, scene.scale.height - 85, texture_landscape, 'bush1');        
        layer.add([this.bush1]);
        this.bush1.setScrollFactor(1.1);

   }

}
