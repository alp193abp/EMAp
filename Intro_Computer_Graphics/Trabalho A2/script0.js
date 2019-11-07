//Funções Gerais

function fatorial(n){
	if(n == 0){
		return 1;
	} else {
		let aux_fatorial = n;
		for(let k=1; k<n; k++){
			aux_fatorial*=(n-k);
		};
		return aux_fatorial;
	}; 
};


//Objetos SVG

function draw_point(id,classe,r,cx,cy,color,svg){
	let point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	point.setAttributeNS(null, "id", id);
	point.setAttributeNS(null, "class", classe);
	point.setAttributeNS(null, "r", r);
	point.setAttributeNS(null, "cx", cx);
	point.setAttributeNS(null, "cy", cy);
	point.setAttributeNS(null, "fill", color);
	svg.appendChild(point);
};

function update_point(id,cx,cy){
	let point = document.getElementById(id);
	point.setAttributeNS(null, "cx", cx);
	point.setAttributeNS(null, "cy", cy);
};

function remove_object(id){
	let child = document.getElementById(id);
	let father = child.parentNode; 
	father.removeChild(child);
};

function draw_line(id,classe,x1,y1,x2,y2,color,stroke_width,stroke_opacity,svg){
	let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
	line.setAttributeNS(null, "id", id);
	line.setAttributeNS(null, "class", classe);
	line.setAttributeNS(null, "x1", x1);
	line.setAttributeNS(null, "y1", y1);
	line.setAttributeNS(null, "x2", x2);
	line.setAttributeNS(null, "y2", y2);
	line.setAttributeNS(null, "stroke", color);
	line.setAttributeNS(null, "stroke-width", stroke_width);
	line.setAttributeNS(null, "stroke-opacity", stroke_opacity);
	svg.appendChild(line);
};

function update_line(id,x1,y1,x2,y2){
	let line = document.getElementById(id);
	line.setAttributeNS(null, "x1", x1);
	line.setAttributeNS(null, "y1", y1);
	line.setAttributeNS(null, "x2", x2);
	line.setAttributeNS(null, "y2", y2);
};