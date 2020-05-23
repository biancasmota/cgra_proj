class MyUnitCubeQuad2 extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad2(this.scene);
        this.initMaterials(scene);
    }
    initMaterials(scene){
        //side material
        this.side = new CGFappearance(scene);
        this.side.setAmbient(0.1, 0.1, 0.1, 1);
        this.side.setDiffuse(0.9, 0.9, 0.9, 1);
        this.side.setSpecular(0.1, 0.1, 0.1, 1);
        this.side.setShininess(10.0);
        this.side.loadTexture('images/woodbox.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');

    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.05,0.05,0.05);

        this.side.apply();
        if(this.scene.nearestFilter)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        // Front
        this.scene.pushMatrix();
        this.scene.scale(1,1,1);
        this.scene.translate(0, 0, 25);
        this.quad.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.scene.scale(1,1,1);
        this.scene.translate(0, 0, -25);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix();
        this.scene.scale(1,1,1);
        this.scene.translate(25, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Left
        this.scene.scale(1,1,1);
        this.scene.pushMatrix();
        this.scene.translate(-25, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.side.apply();
        if(this.scene.nearestFilter)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        // Top
        this.scene.pushMatrix();

        this.scene.translate(0, 25, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.side.apply();
        if(this.scene.nearestFilter)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        // Bottom
        this.scene.pushMatrix();
        this.scene.scale(1,1,1);
        this.scene.translate(0, -25, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

    this.scene.popMatrix();

    }
}