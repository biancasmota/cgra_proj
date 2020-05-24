class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene, 20);

        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.map = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.texture = new CGFtexture(this.scene, "images/terrain.jpg");

        this.shader.setUniformsValues({uSamplerV: 1});
        this.shader.setUniformsValues({uSamplerF: 2});
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.map.bind(1);
        this.texture.bind(2);

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI / 2 , 1, 0, 0);
        this.scene.scale(50, 50, 8);
        //this.scene.translate(0,0,)
        this.plane.display();

        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    updateTexture() {
        if (this.scene.selectedBackground == 0) {
            this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        } else if (this.scene.selectedBackground == 1) {
            this.texture = new CGFtexture(this.scene, "images/terrain_sand.jpg");
        }
    }
}