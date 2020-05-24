class MyBillboard extends CGFobject {
    constructor(scene) {
        super(scene);
  
        this.board = new MyPlane(this.scene, 20);
        this.bar = new MyPlane(this.scene,20);
        this.legs = new MyPlane(this.scene, 20);

        this.nSuppliesDelivered = 0;

        this.shader = new CGFshader(this.scene.gl, "shaders/bar.vert", "shaders/bar.frag");
        this.shader.setUniformsValues({nSuppliesDelivered: 0});

        this.initMaterials();
    
    }

    initMaterials()
    {
        this.boardTexture = new CGFappearance(this.scene);
        this.boardTexture.setAmbient(1, 1, 1, 1);
        this.boardTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.boardTexture.setSpecular(0.9, 0.9, 0.9, 1);
        this.boardTexture.setShininess(10.0);
        this.boardTexture.loadTexture('images/billboard.png');
        this.boardTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.boardback = new CGFappearance(this.scene);
        this.boardback.setAmbient(1, 1, 1, 1);
        this.boardback.setDiffuse(0.9, 0.9, 0.9, 1);
        this.boardback.setSpecular(0.9, 0.9, 0.9, 1);
        this.boardback.setShininess(10.0);
        this.boardback.loadTexture('images/billboardback.png');
        this.boardback.setTextureWrap('REPEAT', 'REPEAT');
        
        this.legsTexture = new CGFappearance(this.scene);
        this.legsTexture.setAmbient(0.7,0.7,0.7,1);
        this.legsTexture.setDiffuse(0.9,0.9,0.9,1);
        this.legsTexture.setSpecular(0.2,0.2,0.2,1);
        this.legsTexture.setShininess(10.0);
        this.legsTexture.loadTexture('images/billboardback.png');
        this.legsTexture.setTextureWrap('REPEAT', 'REPEAT');
    }

    reset()
    {
        this.nSuppliesDelivered = 0;
        this.shader.setUniformsValues({nSuppliesDelivered: 0});
    }

    update(){
        this.shader.setUniformsValues({nSuppliesDelivered: ++this.nSuppliesDelivered});
    }

    display()
    {

        this.scene.pushMatrix();
        this.scene.translate(-18, -18, 17);
        this.scene.rotate(Math.PI/5.0,0,1,0);
        
        this.scene.setActiveShader(this.scene.defaultShader);
        //Left Beam
        this.scene.pushMatrix();
        this.legsTexture.apply();
        this.scene.translate(0,-1,-0.946);
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.scale(0.10,1,1);
        this.legs.display();
        this.scene.popMatrix();
        
        //Right Beam
        this.scene.pushMatrix();
        this.legsTexture.apply();
        this.scene.translate(0,-1,0.946);
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.scale(0.10,1,1);
        this.legs.display();
        this.scene.popMatrix();
        
        //Front Base
        this.scene.pushMatrix();
        this.boardTexture.apply();
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.scale(2,1,1);
        this.board.display();
        this.scene.popMatrix();

        //Back Base
        this.scene.pushMatrix(); 
        this.legsTexture.apply();
        this.scene.rotate(-Math.PI/2.0,0,1,0);
        this.scene.scale(2,1,1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.scene.scale(1.5,0.2,1);    
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.translate(0,-1,0.01);
        this.bar.display();
        this.scene.popMatrix(); 
        this.scene.popMatrix();
        
        this.scene.popMatrix();
    }
}