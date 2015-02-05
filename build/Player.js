
function Player(){
	THREE.Mesh.apply(this);
	this.rotation.order 		= 'YXZ';
	this._aggregateRotation 	= new THREE.Vector3();
	this.cameraHeight 			= 40;
	this.velocity 				= new THREE.Vector3();
	this.acceleration 			= new THREE.Vector3(0, -150, 0);
	this.ambientFriction 		= new THREE.Vector3(-10, 0, -10);
	this.SPEED 					= 1;
	this.moveDirection = {
		FORWARD: false,
		BACKWARD: false,
		LEFT 	: false,
		RIGHT 	: false
	};
	this.update = this.update.bind(this);
};


Player.prototype = Object.create( THREE.Mesh.prototype );
Player.prototype.constructor = Player;

Player.prototype.update = (function(){
	var halfAccel = new THREE.Vector3(),
	scaledVelocity = new THREE.Vector3(),
	oScope 			= this;
	return function(delta){
		var r = this._aggregateRotation.multiplyScalar(delta).add(this.rotation);
		r.x = Math.max(Math.PI * -0.5, Math.min(Math.PI * 0.5, r.x));
		this.rotation.x = 0;
		if(moveDirection.FORWARD) 	this.velocity.z -= oScope.SPEED;
		if(moveDirection.LEFT) 		this.velocity.x -= oScope.SPEED;
		if(moveDirection.BACKWARD) 	this.velocity.z += oScope.SPEED;
		if(moveDirection.RIGHT) 	this.velocity.x += oScope.SPEED;
		 
		 
		 halfAccel.copy(this.acceleration).multiplyScalar(delta * 0.5);
		 oScope.velocity.add(halfAccel);
		 var squaredVelocity = oScope.velocity.x * oScope.velocity.x + oScope.velocity.z * oScope.velocity.z;
		 
		 if(squaredVelocity > oScope.SPEED * oScope.SPEED )
		 {
		 	var scalar = oScope.SPEED / Math.sqrt(squaredVelocity);
		 	oScope.velocity.x *= scalar;
		 	oScope.velocity.z *= scalar;
		 }
		 
		 scaledVelocity.copy(oScope.velocity).multuplyScalar(delta);
		 oScope.translateX(oScope.velocity.x);
		 oScope.translateY(oScope.velocity.z);
		 oScope.translate.y += scaledVelocity.y;
		 oScope.add(halfAccel);
		 
		 oScope.velocity.add(scaledVelocity.multiply(oScope.ambientFriction));
		 
		 oScope.rotation.set(r.y, r.x, r.z);
		 oScope._aggrigateRotation.set(0,0,0);
		}
	
})();





























