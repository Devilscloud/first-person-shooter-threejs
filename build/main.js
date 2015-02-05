/**
 * @author Sachin Tumbre
 */
function FPS(){
	console.log('Constructor!!')
	this.map = "XXXXXXX   \n" +
			"X      X  \n" +
			"X   S  X  \n" +
			"X      X  \n" +
			"X   S  XXX\n" +
			"XXX S    X\n" +
			"  XX  S XX\n" +
			"   X     X\n" +
			"   XXXXXXXX";
		this.HORIZONTAL_UNIT = 100;
		this.VERTICAL_UNIT 	= 100;
		this.ZSIZE 			= null;
		this.XSIZE 			= null;
		this.scene 			= null;
		this.camera 		= null;
		this.renderer		= null;
		this.light 			= null;
		this.Player 		= null;
		this.spwanPoints  	= [];
		this.clock 			= null;
		
		this.onInstructionClick = this.onInstructionClick.bind(this);
		this.onMouseMove 		= this.onMouseMove.bind(this);
		this.onKeyDown 			= this.onKeyDown.bind(this);
		// this.init 				= this.init.bind(this);
		// this.animate 			= this.animate.bind(this);
}

	FPS.prototype.init 					= function(){
		this.map 		= this.map.split("\n");
		var ZSIZE 		= this.map.length * this.HORIZONTAL_UNIT,
		XSIZE 			= this.map[0].length * this.HORIZONTAL_UNITS,
		rows, cols;
		this.clock 		= new THREE.Clock();
		this.scene  	= new THREE.Scene();
		this.camera 	= new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000); 
		this.light 		= new THREE.DirectionalLight(0xf6e86d, 1);
		this.light.position.set(1, 3, 2);
		this.scene.add(this.light);
		this.camera.rotation.x = -45 * Math.PI / 180;
		this.scene.fog 	= new THREE.FogExp2(0x9db3b5, 0.002);
		this.renderer 	= new THREE.WebGLRenderer({antialias:true});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.Player 	= new Player();
		this.Player.velocity  		= new THREE.Vector3(0, 0, 0);
		this.Player.acceleration  	= new THREE.Vector3(0, 0, 0);
		this.Player.add(this.camera);
		this.scene.add(this.Player);
		
		for(var i = 0, rows  = this.map.length; i < rows; i++){
			for(var j = 0, cols = this.map[i].length; j < cols; j++){
				this.addVoxel(this.map[i].charAt(j), i , j);
			}
		}
		document.getElementById('start').addEventListener('click', this.onInstructionClick, false);	
		document.addEventListener('mousemove', this.onMouseMove, false);	
		document.addEventListener('keydown', this.onKeyDown, false);	
};

	FPS.prototype.onInstructionClick   	=  function(event){
		var oScope = this;
		if(BigScreen.enabled)
		{
			var instructions = event.target;
			this.BigScreen.request(document.body, 
				function()
				{
					PL.requestPointerLock(document.body, 
						function()
						{
				 			instructions.className = 'hidden';		
							oScope.startAnimating(); 		
			 			},
				 		function(){
				 			oScope.stopAnimating();
				 		});
			 		
			 }, function(){
			 		instructions.className = 'exited';
			 		oScope.stopAnimating();
			 });	
		}
		
	}

	FPS.prototype.onMouseMove  			=  function(event){
		var oScope = this;
		this.Player.rotate(event.movementY, event.movementX, 0);
	};
	
	FPS.prototype.addVoxel 				= function(type, row, col){
		var z = (row + 1) * this.HORIZONTAL_UNIT - this.ZSIZE * 0.5;
		var x = (col + 1) * this.HORIZONTAL_UNIT - this.XSIZE * 0.5;
		
		switch(type){
			case '  ' :break;
			case 'S'  :
				this.spwanPoints.push(new THREE.Vector3(x, 0, z));
			break;
			case 'X' :
				var go 			= new THREE.CubeGeometry(this.HORIZONTAL_UNIT, this.VERTICAL_UNIT, this.HORIZONTAL_UNIT);
				var material 	= new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff}); 
				var mesh 		= new THREE.Mesh(go, material);
				mesh.position.set(x, this.VERTICAL_UNIT * 0.5, z);
				this.scene.add(mesh);
				break;
		}
	}
	
	FPS.prototype.onKeyDown  			= function(event){
		var oScope = this;
		switch(event.keyCode){
			case 38 : //up
			case 87 : // w
				oScope.Player.moveDirection.FORWARD = true;
			break;
			case 37 : //left
			case 65 : //a
				oScope.Player.moveDirection.LEFT = true;
			break;
			case 40 : //down
			case 83 : // s	
				oScope.Player.moveDirection.DOWN = true;
			break;
			case 39 ://right
			case 68 :// d
				oScope.Player.moveDirection.RIGHT = true;
			break;
			case 32 ://space
				oScope.Player.jump();
			break;
		}
	};
			
	FPS.prototype.animate   				= function(){
	// Animate the scene
		  requestAnimationFrame(this.animate);
		  this.render();
		  this.update();
	};
	
	FPS.prototype.render   				= function(){
	    this.renderer.render(this.scene, this.camera);
	}
	FPS.prototype.update   				= function(){
		var delta = this.clock.getDelta();
		this.Player.velocity.add(this.Player.acceleration().clone().multiplyScalar(delta));
		this.Player.position.add(this.Player.velocity().clone().multiplyScalar(delta));
		
		var halfAccel = this.Player.acceleration.clone().multiplyScalar(delta * 0.5);// half acceleration ( first half of midpoint formula)
		this.Player.position.add(this.Player.velocity.clone().multiplyScalar(delta)); // half acceleration ( second half of midpoint formula)	
		this.velocity.add(halfAccel);
	}


