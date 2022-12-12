export default class Controls {
   
   

   constructor ( data ) {
        let {scene, texture_buttons } = data;
        var obj = null;

        this.bleft = scene.add.image(36, 608, texture_buttons , 'bleft0');
                 
        this.bleft
                     .setScrollFactor(0)
                     .setInteractive()
                     .on(Phaser.Input.TOUCH_START, () => {
                        this.obj.wizard_press_virtual('left',true);
                     })
                     .on(Phaser.Input.TOUCH_END, () => {
                        this.obj.wizard_press_virtual('left', false);
                     })
                     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                       this.obj.wizard_press_virtual('left',true);
                     })
                     .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                       this.obj.wizard_press_virtual('left',false); 
                     });
           
        this.bright = scene.add.image(360, 608, texture_buttons,'bright0')
                   .setScrollFactor(0)
                   .setInteractive()
                   .on(Phaser.Input.TOUCH_START, () => {
                       this.obj.wizard_press_virtual('right',true);
                   })
                   .on(Phaser.Input.TOUCH_END, () => {
                       this.obj.wizard_press_virtual('right',false);
                   }) 
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                       this.obj.wizard_press_virtual('right',true);
                   })
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                       this.obj.wizard_press_virtual('right',false);
                   });

        this.bjumpL = scene.add.image(100, 608, 'set1', 'bjump0')
                   .setScrollFactor(0)
                   .setInteractive()
                   .on(Phaser.Input.TOUCH_START, () => {
                       this.obj.wizard_press_virtual('up',true);
                   })
                   .on(Phaser.Input.TOUCH_END, () => {
                       this.obj.wizard_press_virtual('up',false);
                   })
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                       this.obj.wizard_press_virtual('up',true);
                   })
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                       this.obj.wizard_press_virtual('up',false);                      
                   });

        this.bjumpR = scene.add.image(295, 608, 'set1', 'bjump0')
                   .setScrollFactor(0)
                   .setInteractive()
                   .on(Phaser.Input.TOUCH_START, () => {
                       this.obj.wizard_press_virtual('up', true);
                   })
                   .on(Phaser.Input.TOUCH_END, () => {
                       this.obj.wizard_press_virtual('up',false);
                   }) 
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                       this.obj.wizard_press_virtual('up', true);
                   })
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                       this.obj.wizard_press_virtual('up',false);
                   });

        this.bfire0 = scene.add.image(230, 608, 'set1','bsun0')
                   .setScrollFactor(0)
                   .setInteractive()
                   .on(Phaser.Input.TOUCH_START, () => {
                       this.obj.wizard_press_virtual('space',true);
                   })
                   .on(Phaser.Input.TOUCH_END, () => {
                       this.obj.wizard_press_virtual('space',false);
                   })  
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                       this.obj.wizard_press_virtual('space',true);
                   })
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                       this.obj.wizard_press_virtual('space',false);
                   });


        this.bfire1 = scene.add.image(165, 607, 'set1','bfireball0')
                   .setScrollFactor(0)
                   .setInteractive()
                   .on(Phaser.Input.TOUCH_START, () => {
                       this.obj.wizard_press_virtual('space',true); 
                   })
                   .on(Phaser.Input.TOUCH_END, () => {
                       this.obj.wizard_press_virtual('space',false);  
                   }) 
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                       this.obj.wizard_press_virtual('space',true);
                   })
                   .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                       this.obj.wizard_press_virtual('space',false);
                   });




   }

   attach( obj ) {
     this.obj = obj;
   }

}
