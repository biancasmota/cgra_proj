class MyFlag extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyQuad(this.scene);
        this.initTexture();

    }


    initTexture()
    {
        this.shaderFront =new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shaderBack = new CGFshader(this.scene.gl, "shaders/backFlag.vert", "shaders/backFlag.frag");
        this.flagTexture = new CGFtexture(this.scene,'images/flag.png');

        this.stringTexture = new CGFappearance(this.scene);
        this.stringTexture.setAmbient(0.7,0.7,0.7,1);
        this.stringTexture.setDiffuse(0.9,0.9,0.9,1);
        this.stringTexture.setSpecular(0.2,0.2,0.2,1);
        this.stringTexture.setShininess(10.0);
        this.stringTexture.loadTexture('images/redrope.png');
        this.stringTexture.setTextureWrap('REPEAT', 'REPEAT');


        this.shaderFront.setUniformsValues({ uSampler1: 1});
        this.shaderFront.setUniformsValues({ phase: 0});


        this.shaderBack.setUniformsValues({ uSampler1: 1 });
        this.shaderBack.setUniformsValues({ phase: 0});
    }

    display() {
        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI / 2 , 1, 0, 0);
        this.scene.scale(0.04, 0.04, 0.4);
        this.plane.display();
        this.scene.popMatrix();
    
    }
}