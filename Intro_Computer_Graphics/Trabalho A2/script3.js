var svg3 = document.getElementById("svg3");
var button_control_points_svg3 = document.getElementById("control_svg3");
var button_move_svg3 = document.getElementById("move_svg3");
var button_clear_svg3 = document.getElementById("clear_svg3");
var button_aplicar_svg3 = document.getElementById("aplicar_svg3");
var flag_definition_svg3 = true;
var flag_animacao_svg3 = true;
var flag_detalhes_svg3 = true;
var flag_control_points_svg3 = true;
var flag_move_svg3 = false;
var pontos3 = [];
var t3=1/2;
var vezes=5;
var passo3=0.01;
var control_point3=0;
var id_points3=[];
var id_lines3=[];
var moveData3 = {
	element: null,
	initialX: 0,
	initialY: 0,
	originalX: 0,
	originalY: 0

};
var points3_new =[];
var proximo_ponto3 = [];
var quantidade_pontos3 = 101;
button_control_points_svg3.style.backgroundColor = "rgb(200,255,210)";

/////////////		Botões-begin		/////////////

button_aplicar_svg3.addEventListener("click", function () {
	vezes = document.getElementById("pontos3_input").value;
		for (let i=0;i<id_points3.length;i++){
			let element = document.getElementById(id_points3[i]);
			if (element){
				remove_object(id_points3[i]);
			};
		};
		for (let i=0;i<id_lines3.length;i++){
			let element = document.getElementById(id_lines3[i]);
			if (element){
				remove_object(id_lines3[i]);
			};
		};
		points3_new=[];
		if(control_point3>1){
			calculate_points3(pontos3,vezes);
			
			lista_auxiliar_definitiva = [];
			let aux11 = pontos3[0];
			let aux21 = points3_new.slice();
			let candidato = [];
			let aux44 = 0;
			while (lista_auxiliar_definitiva.length<points3_new.length){
				let aux33 = 10000;
				for(let j=0; j < aux21.length; j++){
					distancia=Math.pow(aux11[0]-aux21[j][0],2)+Math.pow(aux11[1]-aux21[j][1],2);
					if (distancia<aux33){
						candidato=aux21[j];
						aux33=distancia;
						aux44 = j;
					};
				};
				lista_auxiliar_definitiva.push(candidato);
				aux21.splice(aux44,1);
				aux11=candidato;
			};
	
			for(let i=1; i < points3_new.length;i++){
				draw_line("auxiliar","static",lista_auxiliar_definitiva[i-1][0],lista_auxiliar_definitiva[i-1][1],lista_auxiliar_definitiva[i][0],lista_auxiliar_definitiva[i][1],"Black",5,1,svg3);
				id_lines3.push("auxiliar");
			};
			draw_line("auxiliar","static",pontos3[0][0],pontos3[0][1],lista_auxiliar_definitiva[0][0],lista_auxiliar_definitiva[0][1],"Black",5,1,svg3);
			id_lines3.push("auxiliar");
			draw_line("auxiliar","static",pontos3[pontos3.length-1][0],pontos3[pontos3.length-1][1],lista_auxiliar_definitiva[lista_auxiliar_definitiva.length-1][0],lista_auxiliar_definitiva[lista_auxiliar_definitiva.length-1][1],"Black",5,1,svg3);
			id_lines3.push("auxiliar");
		};
});

button_control_points_svg3.addEventListener("click", function () {
	
	if(flag_control_points_svg3==true){
		flag_control_points_svg3=false;
		button_control_points_svg3.style.backgroundColor = null;
		//Control_points
		for (let i=0;i<pontos3.length;i++){
			let element = document.getElementById("svg3"+pontos3[i][2].toString());
			if (element){
				remove_object("svg3"+pontos3[i][2].toString());
			};
		};
	} else{
		flag_control_points_svg3=true;
		button_control_points_svg3.style.backgroundColor = "rgb(200,255,210)";
		//Control_points
		for (let i=0;i<pontos3.length;i++){
			draw_point("svg3"+pontos3[i][2].toString(),"draggable",4,pontos3[i][0],pontos3[i][1],"Red",svg3);
		};
	};
});

button_move_svg3.addEventListener("click", function () {
	if(flag_move_svg3==true){
		flag_move_svg3=false;
		button_move_svg3.style.backgroundColor = null;
	} else {
		flag_move_svg3=true;
		button_move_svg3.style.backgroundColor = "rgb(200,255,210)";
	};
});

button_clear_svg3.addEventListener("click", function () {
	//Removendo pontos de controle
	for (let i=0;i<pontos3.length;i++){
		let element = document.getElementById("svg3"+pontos3[i][2].toString());
		if (element){
			remove_object("svg3"+pontos3[i][2].toString());
		};
	};
	//Removendo "curva"
	for (let i=0;i<id_points3.length;i++){
		let element = document.getElementById(id_points3[i]);
		if (element){
			remove_object(id_points3[i]);
		};
	};
	//Removendo retas
	for (let i=0;i<id_lines3.length;i++){
		let element = document.getElementById(id_lines3[i]);
		if (element){
			remove_object(id_lines3[i]);
		};
	};
	//Reinicializando as variáveis	
	svg3 = document.getElementById("svg3");
	button_control_points_svg3 = document.getElementById("control_svg3");
	button_move_svg3 = document.getElementById("move_svg3");
	button_clear_svg3 = document.getElementById("clear_svg3");
	button_aplicar_svg3 = document.getElementById("aplicar_svg3");
	flag_definition_svg3 = true;
	flag_animacao_svg3 = true;
	flag_detalhes_svg3 = true;
	flag_control_points_svg3 = true;
	flag_move_svg3 = false;
	pontos3 = [];
	t3=1/2;
	vezes=5;
	passo3=0.01;
	control_point3=0;
	id_points3=[];
	id_lines3=[];
	moveData3 = {
		element: null,
		initialX: 0,
		initialY: 0,
		originalX: 0,
		originalY: 0
	
	};
	points3_new =[];
	proximo_ponto3 = [];
	quantidade_pontos3 = 101;
	button_control_points_svg3.style.backgroundColor = "rgb(200,255,210)";
});

/////////////		Botões-end		/////////////

svg3.addEventListener("click", function () {
	if(flag_move_svg3==false){
		for (let i=0;i<id_points3.length;i++){
			let element = document.getElementById(id_points3[i]);
			if (element){
				remove_object(id_points3[i]);
			};
		};
		for (let i=0;i<id_lines3.length;i++){
			let element = document.getElementById(id_lines3[i]);
			if (element){
				remove_object(id_lines3[i]);
			};
		};
		svg3_left = svg3.getBoundingClientRect().x + window.scrollX;
		svg3_top = svg3.getBoundingClientRect().y + window.scrollY;
		pontos3.push([event.pageX-svg3_left,event.pageY-svg3_top,control_point3]);
		if(flag_control_points_svg3 ==true){
			draw_point("svg3"+control_point3.toString(),"draggable",4,event.pageX-svg3_left,event.pageY-svg3_top,"Red",svg3);
		};
		control_point3+=1;
	};
	for (let i=0;i<id_points3.length;i++){
		let element = document.getElementById(id_points3[i]);
		if (element){
			remove_object(id_points3[i]);
		};
	};
	for (let i=0;i<id_lines3.length;i++){
		let element = document.getElementById(id_lines3[i]);
		if (element){
			remove_object(id_lines3[i]);
		};
	};
	points3_new=[];
	if(control_point3>1){
		calculate_points3(pontos3,vezes);
		
		lista_auxiliar_definitiva = [];
		let aux11 = pontos3[0];
		let aux21 = points3_new.slice();
		let candidato = [];
		let aux44 = 0;
		while (lista_auxiliar_definitiva.length<points3_new.length){
			let aux33 = 10000;
			for(let j=0; j < aux21.length; j++){
				distancia=Math.pow(aux11[0]-aux21[j][0],2)+Math.pow(aux11[1]-aux21[j][1],2);
				if (distancia<aux33){
					candidato=aux21[j];
					aux33=distancia;
					aux44 = j;
				};
			};
			lista_auxiliar_definitiva.push(candidato);
			aux21.splice(aux44,1);
			aux11=candidato;
		};

		for(let i=1; i < points3_new.length;i++){
			draw_line("auxiliar","static",lista_auxiliar_definitiva[i-1][0],lista_auxiliar_definitiva[i-1][1],lista_auxiliar_definitiva[i][0],lista_auxiliar_definitiva[i][1],"Black",5,1,svg3);
			id_lines3.push("auxiliar");
		};
		draw_line("auxiliar","static",pontos3[0][0],pontos3[0][1],lista_auxiliar_definitiva[0][0],lista_auxiliar_definitiva[0][1],"Black",5,1,svg3);
		id_lines3.push("auxiliar");
		draw_line("auxiliar","static",pontos3[pontos3.length-1][0],pontos3[pontos3.length-1][1],lista_auxiliar_definitiva[lista_auxiliar_definitiva.length-1][0],lista_auxiliar_definitiva[lista_auxiliar_definitiva.length-1][1],"Black",5,1,svg3);
		id_lines3.push("auxiliar");
	};
});

//////////////////////
svg3.onmousedown = function (evt){ 
	if(flag_move_svg3==true){
		var evt = evt || window.event;
		moveData3.element = evt.target || evt.srcElement;
    	if (!evt.target.classList.contains('draggable')) return moveData3.element = null;
    	moveData3.initialX = evt.clientX;
    	moveData3.initialY = evt.clientY;
    	moveData3.originalX = parseFloat(moveData3.element.getAttributeNS(null, "cx"));
    	moveData3.originalY = parseFloat(moveData3.element.getAttributeNS(null, "cy"));
	};
};

svg3.onmousemove = function (evt) {
	if(flag_move_svg3==true){
		var evt = evt || window.event;
    	if (moveData3.element) {
        	var posX = moveData3.originalX + evt.clientX - moveData3.initialX;
    	    var posY = moveData3.originalY + evt.clientY - moveData3.initialY;
	        moveData3.element.setAttributeNS(null, "cx", posX);
        	moveData3.element.setAttributeNS(null, "cy", posY);
		};
	};
};

svg3.onmouseup = function (evt) {
	if(flag_move_svg3==true){
  	  	var evt = evt || window.event;
		if(moveData3.element.id){
			let id = moveData3.element.id;
			id = id.substring(4,id.length);
			pontos3[id]=[parseFloat(moveData3.element.getAttributeNS(null, "cx")),parseFloat(moveData3.element.getAttributeNS(null, "cy")),parseInt(id)];
			for (let i=0;i<id_points3.length;i++){
				let element = document.getElementById(id_points3[i]);
				if (element){
					remove_object(id_points3[i]);
				};
			};
		};
    	moveData3.element = null;
	};
};
////////////////////////////
var my_car=1;
function calculate_points3(lista10,vezes){
	let lista_aux = [];
	let lista = lista10;
	let Bezier_1 = [];
	let Bezier_2 = [];
	Bezier_1.push(lista[0]);
	Bezier_2.push(lista[lista.length-1]);
	while(lista.length>1){
		lista_aux = [];
		let i=0;
		while(i < lista.length-1){
			let ponto_aux_X = (1-t3)*lista[i][0]+t3*lista[i+1][0];
			let ponto_aux_Y = (1-t3)*lista[i][1]+t3*lista[i+1][1];
			let id_aux_name="svg3"+(lista[i][2]).toString()+(lista[i+1][2]).toString();
			lista_aux.push([ponto_aux_X,ponto_aux_Y,id_aux_name]);
			
			//"Auxiliars"_Points
			if(lista.length<=2){
						draw_point(id_aux_name,"static",2.4,ponto_aux_X,ponto_aux_Y,"Black",svg3);
						id_points3.push(id_aux_name);
						points3_new.push([ponto_aux_X,ponto_aux_Y,id_aux_name]);
			} ;
			i+=1;
		};
		lista=lista_aux;
		Bezier_1.push(lista[0]);
		Bezier_2.push(lista[lista.length-1]);
	};
	vezes-=1;
	if(vezes<=0){
		return;
	};
	calculate_points3(Bezier_1,vezes);
	calculate_points3(Bezier_2,vezes);
};