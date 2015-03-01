/**
 * @author acer
 */
var MathUtils = {
		// this.targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		// this.targetPosition.y = position.y + 100 * Math.cos( this.phi );
		// this.targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );
		getSphericalCoordinates : function(radius, theta, phi){
			var x = (radius * Math.sin(phi)*Math.cos(theta));
			var y = (radius * Math.sin(phi)*Math.sin(theta));
			var z = (radius * Math.cos(phi));
			
			return new THREE.Vector3(x, y, z);
			
		}

}