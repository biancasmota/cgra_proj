class MyVehicleBody extends CGFobject {

    constructor(scene) {
        super(scene);

        this.balao = new MyBody(this.scene, 16, 8);
        this.propeller = new MyPropeller(scene);
        this.gondola = new MyGondola(scene);
        this.turbine = new MyTurbine(scene);
        this.flag = new MyFlag(scene);
        this.string = new MyCylinder(this.scene,16);
        this.stabilizerDir = 0;
        this.helixAng = 0;
    }

    setHelixAng(angle){
        this.helixAng = angle * Math.PI /180.0;
    }
    setStabilizerDir(angle){
        this.stabilizerDir = angle * Math.PI /180.0;
    }


    display() {
        //Balao
        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5, 3);
        this.balao.display();
        this.scene.popMatrix();

        //Propellers
        //1 - cima
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(0, 2.5, -7);
        this.scene.rotate(this.stabilizerDir, 0,1,0);
        this.scene.rotate(Math.PI/2.0,0,0,1);
        this.propeller.display();
        this.scene.popMatrix();

        //2 - baixo
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(0,-2,-7);
        this.scene.rotate(this.stabilizerDir,0,1,0);
        this.scene.rotate(3*Math.PI/2.0,0,0,1);
        this.propeller.display();
        this.scene.popMatrix();

        //3
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(2,0,-7);
        this.scene.rotate(this.stabilizerDir,0,1,0);
        this.propeller.display();
        this.scene.popMatrix();

        //4
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(-2,0,-7);
        this.scene.rotate(Math.PI,0,0,1);
        this.propeller.display();
        this.scene.popMatrix();

        //Gondola
        this.scene.pushMatrix();
        this.scene.translate(0,-0.3,0);
        this.scene.scale(3,3,3);
        
        this.gondola.display();
        this.scene.popMatrix();

        //Turbine1
        this.scene.pushMatrix();
        this.scene.translate(0.35,-1.6,-1.2);
        this.turbine.display();
        this.scene.popMatrix();

        //Turbine2
        this.scene.pushMatrix();
        this.scene.translate(-0.3,-1.6,-1.2);
        this.turbine.display();
        this.scene.popMatrix();   

        this.scene.pushMatrix();
        //this.scene.translate(0,0,-5);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.7, 0.7, 2.1);
        this.scene.translate(0, 0, -3.5);
        this.flag.display();
        this.scene.translate(0, -0.1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.flag.display();
        /*
        this.scene.translate(0,0,-5);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.scale(0.65,0.65, 0.65);
        this.flag.display();
         */
        this.scene.popMatrix();
        
    }

}