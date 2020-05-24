class MyPlane2 extends CGFobject{
	constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene);
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];

		var yCoord = 0.5;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}

		this.indices = [];
		var indi=0;
		var indj=0;
		for (var i = 0; i < this.nrDivs; i++) {
			for (var j = 0; j <this.nrDivs; j++) {
				this.indices.push(indi+indj+(this.nrDivs+1));
				this.indices.push(indi+indj+(this.nrDivs+2));
				this.indices.push(indi+indj);
				this.indices.push(indi+indj+(this.nrDivs+2));
				this.indices.push(indi+indj+1);
				this.indices.push(indi+indj);
				
				this.indices.push(indi+indj+(this.nrDivs+2));
				this.indices.push(indi+indj+(this.nrDivs+1));
				this.indices.push(indi+indj);
				this.indices.push(indi+indj);
				this.indices.push(indi+indj+1);
				this.indices.push(indi+indj+(this.nrDivs+2));

				indj++;
			}
			indi++;
		}
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
