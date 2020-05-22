/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cylinder = new MyCylinder(this,16);
        this.cubeMap = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this, 16, 8);

        
        //Materials
        this.Material = new CGFappearance(this);
        this.Material.setAmbient(0.7, 0.7, 0.7, 1);
        this.Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Material.setSpecular(0.2, 0.2, 0.2, 1);
        this.Material.setShininess(10.0);
        this.Material.loadTexture('images/earth.png');
        this.Material.setTextureWrap('REPEAT', 'REPEAT');

        this.backgroundMaterial = new CGFappearance(this);
        this.backgroundMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.backgroundMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backgroundMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.backgroundMaterial.setShininess(10.0);
        this.backgroundMaterial.loadTexture('images/cubemap.png');
        this.backgroundMaterial.setTextureWrap('REPEAT', 'REPEAT');
        
        
        //textures
        this.texturesphere = new CGFtexture(this, 'images/earth.jpg');
        this.textures = [this.texturesphere];
        this.textureID = {
            'Earth' : 0,
            
        };

        this.background1 =  new CGFtexture(this, 'images/cubemap.png');
        this.backgrounds = [this.background1];
        this.backgroundID = {
            'Default': 0,
        };

        this.objects=[this.sphere,this.cylinder, this.cubeMap];
        this.objectID = {
            'Sphere': 0,
            'Cylinder': 1,
            'Cube': 2,
            'Vehicle': 3,
        };


        //Objects connected to MyInterface
        this.selectedTexture = 0;
        this.selectedBackground = 0;
        this.selectedObject = 0;
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = true;
        this.displayCubeMap = true;
        this.displayVehicle = true;
        this.scaleFactor = 1;        
        this.speedFactor = 0.5;

    }
    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.5, 0.5, 500, vec3.fromValues(80, 80, 80), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    checkKeys(t) {
        var text = "Keys pressed: ";
        var keysPressed = false;
        if(this.vehicle.autopilot == false) 
        {
            if (this.gui.isKeyPressed("KeyW")) {
                text += " W ";
                this.vehicle.accelerate(0.1*this.speedFactor);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyS")) {
                text += " S ";
                this.vehicle.accelerate(-0.1*this.speedFactor);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                text += " A ";
                this.vehicle.turn(5);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyD")) {
                text += " D ";
                this.vehicle.turn(-5);
                keysPressed = true;
            }
        }
        if(this.gui.isKeyPressed("KeyR")){
            text +="R";
            this.resetVehicle();
            keysPressed = true;
        }
    }

    resetVehicle(){
        this.vehicle.reset();
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys(t);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();
           
        this.setDefaultAppearance();
        this.pushMatrix();
        
        // ---- BEGIN Primitive drawing section

         if (this.displayCylinder)
            this.cylinder.display();
    

        if (this.displaySphere)
        {
            this.Material.setTexture(this.texturesphere);
            this.Material.apply();
            this.sphere.display();
        }

        if(this.displayCubeMap){
            this.backgroundMaterial.setTexture(this.background1);
            this.backgroundMaterial.apply();
            this.cubeMap.display();
        }

        

    
        
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}