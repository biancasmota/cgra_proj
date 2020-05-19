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

        
        //Materials
        this.Material = new CGFappearance(this);
        this.Material.setAmbient(0.1, 0.1, 0.1, 1);
        this.Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Material.setSpecular(0.1, 0.1, 0.1, 1);
        this.Material.setShininess(10.0);
        this.Material.loadTexture('images/earth.png');
        this.Material.setTextureWrap('REPEAT', 'REPEAT');
        
        //textures
        this.texturesphere = new CGFtexture(this, 'images/earth.jpg');
        this.texturecubemap =  new CGFtexture(this, 'images/cubemap.png'),
        

        this.objects=[this.sphere,this.cylinder];
        this.textures = [this.texturesphere, this.texturecubemap];
        
        
        this.objectID = {
            'Sphere': 0,
            'Cylinder': 1,
            'Cube': 2
        };
        this.textureList = {
            'Earth' : 0,
            'CubeMap' : 1
        };


        //Objects connected to MyInterface
        this.selectedTexture = 0;
        this.selectedObject = 0;
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = true;
        this.displayCubeMap = true;
        this.scaleFactor = 1;

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
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
            this.Material.setTexture(this.texturecubemap);
            this.Material.apply();
            this.cubeMap.display();
        }
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}