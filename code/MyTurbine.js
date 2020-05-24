class MyTurbine extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.sphere = new MyBody(this.scene, 10, 10);
        this.initBuffers();
    }

    initBuffers(){
        this.quad.initBuffers();
        this.sphere.initBuffers();
    }

    display(){
        //Base
        this.scene.pushMatrix();
        this.scene.scale(0.15, 0.1, 0.3);
        this.scene.translate(0,0,1)
        this.sphere.display();
        this.scene.popMatrix();


        //helice1
        this.scene.pushMatrix();
        this.scene.translate(0, Math.SQRT1_2/2 -0.25 , 0);
        this.scene.scale(0.005, 0.01, 0.01);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.4, 0.4, 0.8);
        this.quad.display();
        this.scene.popMatrix();

        //hecile2
        this.scene.pushMatrix();
        this.scene.translate(0, -Math.SQRT1_2/2 + 0.25,0 );
        this.scene.scale(0.005, 0.01, 0.01);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.4, 0.4, 0.8);
        this.quad.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        //bolinha de tras
        this.scene.scale(0.05, 0.05, 0.03);
        this.scene.translate(0,0,-1)
        this.sphere.display();
        this.scene.popMatrix();

    }
}