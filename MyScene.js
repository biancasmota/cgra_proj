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
        this.cylinder = new MyCylinder(this,30);

        
        //Materials
        this.Material = new CGFappearance(this);
        this.Material.setAmbient(0.1, 0.1, 0.1, 1);
        this.Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Material.setSpecular(0.1, 0.1, 0.1, 1);
        this.Material.setShininess(10.0);
        this.Material.loadTexture('images/earth.png');
        this.Material.setTextureWrap('REPEAT', 'REPEAT');
        
        //textures
        this.texture1 = new CGFtexture(this, 'images/earth.jpg');

        this.objects=[this.sphere,this.cyclinder];
        this.textures = [this.texture1];
        this.objectID = {
            'Sphere': 0,
            'Cylinder': 1
        };
        this.textureId = {
            'Earth': 0

        };


        //Objects connected to MyInterface
        this.selectedTexture = 0;
        this.selectedObject = 0;
        this.wireframe = false;
        this.displayAxis = true;
        this.displayCylinder = true;
        this.displayNormals = false;
        this.displaySphere = true;
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

    onWireframeChanged(option) {
        if (option)
            this.objects[this.selectedObject].setLineMode();
        else
            this.objects[this.selectedObject].setFillMode();
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
           

        
        // ---- BEGIN Primitive drawing section

         if (this.displayCylinder)
            this.cylinder.display();
    
        this.Material.setTexture(this.texture1);
        this.Material.apply();

        if (this.displaySphere)
            this.sphere.display();

        this.setDefaultAppearance();

        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();
    
        this.objects[this.selectedObject].display();




        // ---- END Primitive drawing section
    }
}