/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject
 {
    constructor(scene) 
    {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.initTextures(scene);
    }

    initTextures(scene) 
    {

        this.top = new CGFappearance(this.scene);
        this.top.setAmbient(0.9, 0.9, 0.9, 1);
        this.top.setDiffuse(0.0, 0.0, 0.0, 1);
        this.top.setSpecular(0.0, 0.0, 0.0, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/split_cubemap/top.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.bottom = new CGFappearance(this.scene);
        this.bottom.setAmbient(0.9,0.9, 0.9, 1);
        this.bottom.setDiffuse(0.0, 0.0, 0.0, 1);
        this.bottom.setSpecular(0.0, 0.0, 0.0, 1);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture('images/split_cubemap/bottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');

        this.right = new CGFappearance(this.scene);
        this.right.setAmbient(0.9, 0.9, 0.9, 1);
        this.right.setDiffuse(0.0, 0.0, 0.0, 1);
        this.right.setSpecular(0.0, 0.0, 0.0, 1);
        this.right.setShininess(10.0);
        this.right.loadTexture('images/split_cubemap/right.png');
        this.right.setTextureWrap('REPEAT', 'REPEAT');

        this.left = new CGFappearance(this.scene);
        this.left.setAmbient(0.9, 0.9, 0.9, 1);
        this.left.setDiffuse(0.0, 0.0, 0.0, 1);
        this.left.setSpecular(0.0, 0.0, 0.0, 1);
        this.left.setShininess(10.0);
        this.left.loadTexture('images/split_cubemap/left.png');
        this.left.setTextureWrap('REPEAT', 'REPEAT');

        this.back = new CGFappearance(this.scene);
        this.back.setAmbient(0.9, 0.9, 0.9, 1);
        this.back.setDiffuse(0.0, 0.0, 0.0, 1);
        this.back.setSpecular(0.0, 0.0, 0.0, 1);
        this.back.setShininess(10.0);
        this.back.loadTexture('images/split_cubemap/back.png');
        this.back.setTextureWrap('REPEAT', 'REPEAT');

        this.front = new CGFappearance(this.scene);
        this.front.setAmbient(0.9, 0.9, 0.9, 1);
        this.front.setDiffuse(0.0, 0.0, 0.0, 1);
        this.front.setSpecular(0.0, 0.0, 0.0, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture('images/split_cubemap/front.png');
        this.front.setTextureWrap('REPEAT', 'REPEAT');        
    }




    display() 
    {
        this.scene.backgroundMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(50, 50, 50);

        this.top.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.right.apply();	
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.left.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.back.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.front.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
		this.scene.popMatrix();
    
        this.scene.popMatrix();
    }

    updateTexture()
    {

        if(this.scene.selectedBackground==0){
            this.top.loadTexture('images/split_cubemap/top.png');
            this.bottom.loadTexture('images/split_cubemap/bottom.png');
            this.right.loadTexture('images/split_cubemap/right.png');
            this.left.loadTexture('images/split_cubemap/left.png');
            this.back.loadTexture('images/split_cubemap/back.png');
            this.front.loadTexture('images/split_cubemap/front.png');
        }
        else if(this.scene.selectedBackground==1){
            this.top.loadTexture('images/split_cubemap/top2.png');
            this.bottom.loadTexture('images/split_cubemap/bottom2.png');
            this.right.loadTexture('images/split_cubemap/right2.png');
            this.left.loadTexture('images/split_cubemap/left2.png');
            this.back.loadTexture('images/split_cubemap/back2.png');
            this.front.loadTexture('images/split_cubemap/front2.png');
        }
    }




}
