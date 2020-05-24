class MyCylinder extends CGFobject {
	constructor(scene, slices) {
		super(scene);
		this.slices = slices;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		var theta = 0;
		var thetaInc = (2 * Math.PI) / this.slices;
		var max = this.slices * 2;


		for (var i = 0; i < max; i += 2) {
			this.indices.push(i + 1, i, i + 2);
			this.indices.push(i + 2, i + 3, i + 1);
		}
		for (var i = 0; i <= this.slices; i++) {
			this.vertices.push(Math.cos(theta), 0, -Math.sin(theta));
			this.vertices.push(Math.cos(theta), 1, -Math.sin(theta));

			this.normals.push(Math.cos(theta), 0, -Math.sin(theta));
			this.normals.push(Math.cos(theta), 0, -Math.sin(theta));
			theta += thetaInc;
		}


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}