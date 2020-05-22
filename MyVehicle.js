/**
* MyVehicle
* @method constructor
* @param scene - Reference to MyScene object
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.gondola = new MyGondola(this.scene);
        this.helix = new MyHelix(this.scene);
        this.angle = 0;
        this.speed = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.x_centre = 0;
        this.z_centre = 0;

        this.autopilot = false;

    }

    update(t){}


    turn(val){
        this.angle += val;
    }

    accelerate(val){
        this.speed += val;
        if(this.speed < 0)
            this.speed = 0;
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.speed = 0;
        this.autopilot = false;

    }

    display(){}





}