const SupplyStates = {
    INACTIVE : 0,
    FALLING : 1,
    LANDED : 2
};

class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);
        this.posicao = {x: 0, y: 0, z: 0};
        this.box = new MyUnitCubeQuad2(this.scene);
        this.state = SupplyStates.INACTIVE;
        this.initMaterials();
        this.tempodequeda = 0;
    }


    reset(){
        this.state = SupplyStates.INACTIVE;;
        this.y = 0;
        this.x = 0;
        this.z = 0;
    }


    drop(dropx, dropy, dropz) {
        this.state = SupplyStates.FALLING;
        this.posicao.x = dropx;
        this.posicao.y = dropy;
        this.posicao.z = dropz;
        //this.time_inicio = new Date();
    }

    initTexture(image, wrap1 = 'REPEAT', wrap2 = wrap1) {
        let t = new CGFappearance(this.scene);
        t.setAmbient(0.1, 0.1, 0.1, 1);
        t.setDiffuse(0.9, 0.9, 0.9, 1);
        t.setSpecular(0.1, 0.1, 0.1, 1);
        t.setShininess(10.0);
        t.loadTexture(image);
        t.setTextureWrap(wrap1, wrap2);
        return t;
    }

    initMaterials() {
        this.cratematerial = this.initTexture("images/woodbox.jpg");
    }

    update(time) {
        if (this.state == SupplyStates.FALLING) {
            this.tempoCaindo += time;
            this.posicao.y -= 1;
            //this.y = this.fallingPoint - (this.tempoCaindo * 0.0027);

            if (this.posicao.y <= -20){
                this.posicao.y = -20;
                this.state = SupplyStates.LANDED;
            }


        }
        if (this.state == SupplyStates.INACTIVE) {
            this.fallingPoint = this.scene.vehicle.y - 1.0;
        }


    }

    display() {
        if (this.state != SupplyStates.INACTIVE) {
            this.cratematerial.apply();
            this.scene.pushMatrix();
            this.scene.translate(this.posicao.x, this.posicao.y, this.posicao.z);
            //this.scene.scale(0.05,0.05,0.05);
            this.box.display(this.state);
            this.scene.popMatrix();

        }
    }
}