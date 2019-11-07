var svg1 = document.getElementById("svg1");
var button_animacao_svg1 = document.getElementById("animacao_svg1");                        
var button_detalhes_svg1 = document.getElementById("detalhes_svg1");
var button_control_points_svg1 = document.getElementById("control_svg1");
var button_move_svg1 = document.getElementById("move_svg1");
var button_clear_svg1= document.getElementById("clear_svg1");
var button_aplicar_svg1= document.getElementById("aplicar_svg1");
var button_definition_svg1 = document.getElementById("definition_svg1");
var flag_definition_svg1 = true;
var flag_animacao_svg1 = true;
var flag_detalhes_svg1 = true;
var flag_control_points_svg1 = true;
var flag_move_svg1 = false;
var pontos1 = [];
var t=0;
var passo=0.01;
var control_point=0;
var id_points=[];
var id_lines=[];
var moveData = {
	element: null,
	initialX: 0,
	initialY: 0,
	originalX: 0,
	originalY: 0
};
var proximo_ponto1 = [];
var quantidade_pontos1 = 101;
button_definition_svg1.style.backgroundColor = "rgb(200,255,210)";
button_animacao_svg1.style.backgroundColor = "rgb(200,255,210)";
button_detalhes_svg1.style.backgroundColor = "rgb(200,255,210)";
button_control_points_svg1.style.backgroundColor = "rgb(200,255,210)";

/////////////		Botões-begin		/////////////

button_aplicar_svg1.addEventListener("click", function () {
	quantidade_pontos1 = document.getElementById("pontos1_input").value;
	if(quantidade_pontos1>1){
		passo = 1/(quantidade_pontos1-1);
		for (let i=0;i<id_points.length;i++){
			let element = document.getElementById(id_points[i]);
			if (element){
				remove_object(id_points[i]);
			};
		};
		t=0;
	};
});

button_definition_svg1.addEventListener("click", function () {
	if(flag_definition_svg1==true){
		flag_definition_svg1=false;
		button_definition_svg1.style.backgroundColor = null;
	} else{
		flag_definition_svg1=true;		
		button_definition_svg1.style.backgroundColor = "rgb(200,255,210)";
	};
	for (let i=0;i<id_points.length;i++) {
		let element = document.getElementById(id_points[i]);
		if (element){
			remove_object(id_points[i]);
		};
	};
	t=0;
});

button_animacao_svg1.addEventListener("click", function () {
	if(flag_animacao_svg1==true){
		flag_animacao_svg1=false;
		button_animacao_svg1.style.backgroundColor = null;
	} else{
		flag_animacao_svg1=true;
		button_animacao_svg1.style.backgroundColor = "rgb(200,255,210)";
	};
});

button_detalhes_svg1.addEventListener("click", function () {
	if(flag_detalhes_svg1==true){
		flag_detalhes_svg1=false;
		button_detalhes_svg1.style.backgroundColor = null;
		if(t>1){
			t=1;
			calculate_points(pontos1);
			t+=passo;
		} else {
			calculate_points(pontos1);
		};
	} else{
		flag_detalhes_svg1=true;
		button_detalhes_svg1.style.backgroundColor = "rgb(200,255,210)";
		if(t>1){
			t=1;
			calculate_points(pontos1);
			t+=passo;
		} else {
			calculate_points(pontos1);
		};
	};
});

button_control_points_svg1.addEventListener("click", function () {
	
	if(flag_control_points_svg1==true){
		flag_control_points_svg1=false;
		button_control_points_svg1.style.backgroundColor = null;
		//Control_points
		for (let i=0;i<pontos1.length;i++){
			let element = document.getElementById("svg1"+pontos1[i][2].toString());
			if (element){
				remove_object("svg1"+pontos1[i][2].toString());
			};
		};
	} else{
		flag_control_points_svg1=true;
		button_control_points_svg1.style.backgroundColor = "rgb(200,255,210)";
		//Control_points
		for (let i=0;i<pontos1.length;i++){
			draw_point("svg1"+pontos1[i][2].toString(),"draggable",4,pontos1[i][0],pontos1[i][1],"Red",svg1);
		};
	};
});

button_move_svg1.addEventListener("click", function () {
	if(flag_move_svg1==true){
		flag_move_svg1=false;
		button_move_svg1.style.backgroundColor = null;
	} else {
		flag_move_svg1=true;
		button_move_svg1.style.backgroundColor = "rgb(200,255,210)";
	};
});

button_clear_svg1.addEventListener("click", function () {
	//Removendo pontos de controle
	for (let i=0;i<pontos1.length;i++){
		let element = document.getElementById("svg1"+pontos1[i][2].toString());
		if (element){
			remove_object("svg1"+pontos1[i][2].toString());
		};
	};
	//Removendo "curva"
	for (let i=0;i<id_points.length;i++){
		let element = document.getElementById(id_points[i]);
		if (element){
			remove_object(id_points[i]);
		};
	};
	//Removendo retas
	for (let i=0;i<id_lines.length;i++){
		let element = document.getElementById(id_lines[i]);
		if (element){
			remove_object(id_lines[i]);
		};
	};
	//Reinicializando as variáveis	
	flag_animacao_svg1 = true;
	flag_detalhes_svg1 = true;
	flag_control_points_svg1 = true;
	flag_move_svg1 = false;
	pontos1 = [];
	t=0;
	passo=0.01;
	control_point=0;
	id_points=[];
	id_lines=[];
	moveData = {
		element: null,
		initialX: 0,
		initialY: 0,
		originalX: 0,
		originalY: 0
	};
	flag_definition_svg1 = true;
	proximo_ponto1 = [];
	quantidade_pontos1 = 101;
	button_definition_svg1.style.backgroundColor = "rgb(200,255,210)";
	button_animacao_svg1.style.backgroundColor = "rgb(200,255,210)";
	button_detalhes_svg1.style.backgroundColor = "rgb(200,255,210)";
	button_control_points_svg1.style.backgroundColor = "rgb(200,255,210)";
});

/////////////		Botões-end		/////////////

svg1.addEventListener("click", function () {
	if(flag_move_svg1==false){
		t=0;
		for (i=0;i<id_points.length;i++){
			let element = document.getElementById(id_points[i]);
			if (element){
				remove_object(id_points[i]);
			};
		};
		svg1_left = svg1.getBoundingClientRect().x + window.scrollX;
		svg1_top = svg1.getBoundingClientRect().y + window.scrollY;
		pontos1.push([event.pageX-svg1_left,event.pageY-svg1_top,control_point]);
		if(flag_control_points_svg1 ==true){
			draw_point("svg1"+control_point.toString(),"draggable",4,event.pageX-svg1_left,event.pageY-svg1_top,"Red",svg1);
		};
		control_point+=1;
	};
});

//////////////////////
svg1.onmousedown = function (evt){ 
	if(flag_move_svg1==true){
		var evt = evt || window.event;
		moveData.element = evt.target || evt.srcElement;
    	if (!evt.target.classList.contains('draggable')) return moveData.element = null;
    	moveData.initialX = evt.clientX;
    	moveData.initialY = evt.clientY;
    	moveData.originalX = parseFloat(moveData.element.getAttributeNS(null, "cx"));
    	moveData.originalY = parseFloat(moveData.element.getAttributeNS(null, "cy"));
	};
};

svg1.onmousemove = function (evt) {
	if(flag_move_svg1==true){
		var evt = evt || window.event;
    	if (moveData.element) {
        	var posX = moveData.originalX + evt.clientX - moveData.initialX;
    	    var posY = moveData.originalY + evt.clientY - moveData.initialY;
	        moveData.element.setAttributeNS(null, "cx", posX);
        	moveData.element.setAttributeNS(null, "cy", posY);
		};
	};
};

svg1.onmouseup = function (evt) {
	if(flag_move_svg1==true){
  	  	var evt = evt || window.event;
		if(moveData.element.id){
			let id = moveData.element.id;
			id = id.substring(4,id.length);
			pontos1[id]=[parseFloat(moveData.element.getAttributeNS(null, "cx")),parseFloat(moveData.element.getAttributeNS(null, "cy")),parseInt(id)];
			t=0;
			for (let i=0;i<id_points.length;i++){
				let element = document.getElementById(id_points[i]);
				if (element){
					remove_object(id_points[i]);
				};
			};
		};
    	moveData.element = null;
	};
};
////////////////////////////

function calculate_points(lista){
	let lista_aux = [];
	let i=0;
	while(i < lista.length-1){
		let ponto_aux_X = (1-t)*lista[i][0]+t*lista[i+1][0];
		let ponto_aux_Y = (1-t)*lista[i][1]+t*lista[i+1][1];
		let id_aux_name="svg1"+(lista[i][2]).toString()+(lista[i+1][2]).toString();
		let id_aux_name_line="svg1"+"line"+id_aux_name;
		lista_aux.push([ponto_aux_X,ponto_aux_Y,id_aux_name]);
		
		//"Auxiliars"_Points
		let element_aux = document.getElementById(id_aux_name)
		if (element_aux && lista.length!=2){
			if(flag_detalhes_svg1==false){
				for (let i=0;i<id_points.length;i++){
					if(id_points[i]!=id_points[id_points.length-1]){
						let element = document.getElementById(id_points[i]);
						if (element){
							remove_object(id_points[i]);
						};
					};
				};
			} else {
				update_point(id_aux_name,ponto_aux_X,ponto_aux_Y);
			};
		} else{
			if(lista.length<=2){
				if(flag_definition_svg1==false){
					draw_point(id_aux_name,"static",3,ponto_aux_X,ponto_aux_Y,"Black",svg1);
					id_points.push(id_aux_name);
				} else if (t==0){
					proximo_ponto1 = [ponto_aux_X,ponto_aux_Y];
					draw_point(id_aux_name,"static",2.4,ponto_aux_X,ponto_aux_Y,"Black",svg1);
					id_points.push(id_aux_name);
				} else{
					id_points.push(id_aux_name);
					draw_point(id_aux_name,"static",2.4,ponto_aux_X,ponto_aux_Y,"Black",svg1);
					id_points.push(id_aux_name);
					draw_line(id_aux_name,"static",proximo_ponto1[0],proximo_ponto1[1],ponto_aux_X,ponto_aux_Y,"Black",5,1,svg1);
					proximo_ponto1 = [ponto_aux_X,ponto_aux_Y];
					
				};
			} else if (flag_detalhes_svg1==true){
				draw_point(id_aux_name,"static",3,ponto_aux_X,ponto_aux_Y,"Blue",svg1);
				id_points.push(id_aux_name);
			} else {
				id_points.push(id_aux_name);
			};
		};
		
		//Lines
		element_aux = document.getElementById(id_aux_name_line)
		if (element_aux){
			if(flag_detalhes_svg1==false){
				for (let i=0;i<id_points.length;i++){
					let element = document.getElementById(id_lines[i]);
					if (element){
						remove_object(id_lines[i]);
					};
				};
			} else {
				update_line(id_aux_name_line,lista[i][0],lista[i][1],lista[i+1][0],lista[i+1][1]);	
			};
		} else{
			if(flag_detalhes_svg1==true){
				draw_line(id_aux_name_line,"static",lista[i][0],lista[i][1],lista[i+1][0],lista[i+1][1],"Grey",3,0.2,svg1);
				id_lines.push(id_aux_name_line);
			} else {
				for (let i=0;i<id_points.length;i++){
					let element = document.getElementById(id_lines[i]);
					if (element){
						remove_object(id_lines[i]);
					};
				};
			};
		};
		i+=1;
	};
	if(lista.length>0){
		calculate_points(lista_aux);
	};
};

function animation(){
	if(flag_animacao_svg1==true){
		calculate_points(pontos1);
		t+=passo;
		if(t>1){

			if(Math.floor((t+passo)*(quantidade_pontos1-1))==quantidade_pontos1){
				t=1;
				calculate_points(pontos1);
				t+=passo;
			};
			t=0;
			for (let i=0;i<id_points.length;i++){
				let element = document.getElementById(id_points[i]);
				if (element){
					remove_object(id_points[i]);
				};
			};
		};
	} else {
		if(t<=1){
			calculate_points(pontos1);
			t+=passo;
			estabilidade1=true;
		} else if(Math.floor((t+passo)*(quantidade_pontos1-1))==quantidade_pontos1){
			t=1;
			calculate_points(pontos1);
			t+=passo;
		};
	};
	setTimeout(function (){
		animation(); 
	},25);
};

animation();