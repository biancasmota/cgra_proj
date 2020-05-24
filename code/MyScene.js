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
        this.vehicle = new MyVehicle(this);
        this.terrain = new MyTerrain(this);
        this.supply = new MySupply(this);
        this.billboard = new MyBillboard(this);

        this.nSuppliesDelivered = 0;

        
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
        this.balloon = new CGFtexture(this, 'images/balloon2.jpg');
        this.flagtexture = new CGFtexture(this, 'images/flag.png');
        this.string = new CGFtexture(this, 'images/redrope.png');
        this.textures = [this.texturesphere, this.balloon, this.flagtexture, this.string];
        this.textureID = {
            'Earth' : 0,
            'Balloon' : 1,
            'Flag' :2,
            'String' : 3
            
        };

        this.background1 =  new CGFtexture(this, 'images/cubemap.png');
        this.backgrounds = [this.background1];
        this.backgroundID = {
            'Default': 0,
            'Desert': 1
        };

        this.objects=[this.sphere,this.cylinder, this.cubeMap, this.vehicle,this.flag];
        this.objectID = {
            'Sphere': 0,
            'Cylinder': 1,
            'Cube': 2,
            'Vehicle': 3,
            'Flag' : 4
        };


        this.supplies = [new MySupply(this), new MySupply(this), new MySupply(this), new MySupply(this), new MySupply(this)];
        this.selectedSupply = 0;
        this.lastTimeSupply = -1000;


        //Objects connected to MyInterface
        this.selectedBackground = 0;
        this.selectedObject = 0;
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayCubeMap = true;
        this.displayVehicle = true;
        this.displayTerrain = true;
        this.displaySupply = true;
        this.displayFlag = true;
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


    checkKeys() {
        let keysPressed = false;

            if (this.gui.isKeyPressed("KeyW")) {
                this.vehicle.accelerate(0.1*this.speedFactor);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyS")) {
                this.vehicle.accelerate(-0.1*this.speedFactor);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyA")) {
                this.vehicle.turn(Math.PI/30);
                keysPressed = true;
            }
            if (this.gui.isKeyPressed("KeyD")) {

                this.vehicle.turn(-Math.PI/30);
                keysPressed = true;
            }
        if(this.gui.isKeyPressed("KeyR"))
        {
            this.resetVehicle();
            this.resetSupplies();
            this.resetBillboard();
            keysPressed = true;
        }

        if  (this.gui.isKeyPressed("KeyL"))
        {
            if (this.selectedSupply < 5)
            {
                this.supplies[this.selectedSupply].drop(this.vehicle.x,this.vehicle.y, this.vehicle.z);
                this.selectedSupply++;
                this.supplies[this.selectedSupply].update();
                this.billboard.update();
            }
            keysPressed = true;
        }
            
        if (keysPressed)
        this.vehicle.update();
    }

    resetVehicle(){
        this.vehicle.reset();
        this.nSuppliesDelivered = 0;
    }

    resetBillboard()
    {
        this.billboard.reset();
        this.nSuppliesDelivered = 0;
    }

    resetSupplies(){
        for(var i = 0; i < this.selectedSupply; i++){
            this.supplies[i].reset();
        }
        this.selectedSupply = 0;
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update();
        for(let i = 0; i < this.supplies.length; i++){
            this.supplies[i].update(t);
        }
    }


    selectedTexture() {
            this.cubeMap.updateTexture();
            this.terrain.updateTexture();
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

         if(this.displayCubeMap)
         {
            this.cubeMap.display(); 
         }
        
        

        if(this.displayVehicle){
            for (let i = 0; i < this.supplies.length; i++) {
                this.supplies[i].display();
            }
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.Material.setTexture(this.balloon);
            this.Material.apply();
            this.vehicle.display();
            this.popMatrix();
            this.billboard.display();

        }

        if(this.displayTerrain){
            this.pushMatrix();
            this.translate(0,-25,0);
            this.terrain.display();
            this.popMatrix();
        }

        
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}