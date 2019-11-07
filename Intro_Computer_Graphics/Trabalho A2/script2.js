var svg2 = document.getElementById("svg2");
var button_animacao_svg2 = document.getElementById("animacao_svg2");                        
var button_control_points_svg2 = document.getElementById("control_svg2");
var button_move_svg2 = document.getElementById("move_svg2");
var button_clear_svg2= document.getElementById("clear_svg2");
var button_aplicar_svg2= document.getElementById("aplicar_svg2");
var button_definition_svg2 = document.getElementById("definition_svg2");
var flag_definition_svg2 = true;
var flag_animacao_svg2 = true;                       
var flag_control_points_svg2 = true;
var flag_move_svg2 = false;
var pontos2 = [];
var t2=0;
var passo2=0.01;
var control_point2=0;
var id_points2=[];
var binomio2 = [];
var moveData2 = {
	element: null,
	initialX: 0,
	initialY: 0,
	originalX: 0,
	originalY: 0
};
var proximo_ponto2 = [];
var quantidade_pontos2 = 101;
button_definition_svg2.style.backgroundColor = "rgb(200,255,210)";
button_animacao_svg2.style.backgroundColor = "rgb(200,255,210)";
button_control_points_svg2.style.backgroundColor = "rgb(200,255,210)";

/////////////		Botões-begin		/////////////

button_aplicar_svg2.addEventListener("click", function () {
	quantidade_pontos2 = document.getElementById("pontos2_input").value;
	if(quantidade_pontos2>1){
		passo2 = 1/(quantidade_pontos2-1);
		for (let i=0;i<id_points2.length;i++){
			let element = document.getElementById(id_points2[i]);
			if (element){
				remove_object(id_points2[i]);
			};
		};
		t2=0;
	};
});

button_definition_svg2.addEventListener("click", function () {
	if(flag_definition_svg2==true){
		flag_definition_svg2=false;
		button_definition_svg2.style.backgroundColor = null;
	} else{
		flag_definition_svg2=true;		
		button_definition_svg2.style.backgroundColor = "rgb(200,255,210)";
	};
	for (let i=0;i<id_points2.length;i++) {
		let element = document.getElementById(id_points2[i]);
		if (element){
			remove_object(id_points2[i]);
		};
	};
	t2=0;
});

button_animacao_svg2.addEventListener("click", function () {
	if(flag_animacao_svg2==true){
		flag_animacao_svg2=false;
		button_animacao_svg2.style.backgroundColor = null;
	} else{
		flag_animacao_svg2=true;		
		button_animacao_svg2.style.backgroundColor = "rgb(200,255,210)";
	};
});

button_control_points_svg2.addEventListener("click", function () {
	if(flag_control_points_svg2==true){
		flag_control_points_svg2=false;
		button_control_points_svg2.style.backgroundColor = null;
		//Control_points
		for (i=0;i<pontos2.length;i++){
			let element = document.getElementById("svg2"+pontos2[i][2].toString());
			if (element){
				remove_object("svg2"+pontos2[i][2].toString());
			};
		};
	} else{
		flag_control_points_svg2 = true;
		button_control_points_svg2.style.backgroundColor = "rgb(200,255,210)";
		//Control_points
		for (i=0;i<pontos2.length;i++){
			draw_point("svg2"+pontos2[i][2].toString(),"draggable",4,pontos2[i][0],pontos2[i][1],"Red",svg2);
		};
	};
});

button_move_svg2.addEventListener("click", function () {
	if(flag_move_svg2==true){
		flag_move_svg2=false;
		button_move_svg2.style.backgroundColor = null;
	} else{
		flag_move_svg2=true;
		button_move_svg2.style.backgroundColor = "rgb(200,255,210)";
	};
});

button_clear_svg2.addEventListener("click", function () {
	//Removendo pontos de controle
	for (let i=0;i<pontos2.length;i++){
		let element = document.getElementById("svg2"+pontos2[i][2].toString());
		if (element){
			remove_object("svg2"+pontos2[i][2].toString());
		};
	};
	//Removendo "curva"
	for (let i=0;i<id_points2.length;i++){
		let element = document.getElementById(id_points2[i]);
		if (element){
			remove_object(id_points2[i]);
		};
	};
	//Reinicializando as variáveis	
	flag_animacao_svg2 = true;                       
	flag_control_points_svg2 = true;
	flag_move_svg2 = false;
	pontos2 = [];
	t2=0;
	passo2=0.01;
	control_point2=0;
	id_points2=[];
	binomio2 = [];
	moveData2 = {
		element: null,
		initialX: 0,
		initialY: 0,
		originalX: 0,
		originalY: 0
	};
	proximo_ponto2 = [];
	flag_definition_svg2 = true;
	quantidade_pontos2 = 101;
	button_definition_svg2.style.backgroundColor = "rgb(200,255,210)";
	button_animacao_svg2.style.backgroundColor = "rgb(200,255,210)";
	button_control_points_svg2.style.backgroundColor = "rgb(200,255,210)";
});

/////////////		Botões-end		/////////////

svg2.addEventListener("click", function () {
	if (flag_move_svg2==false){
		t2=0;
		for (let i=0;i<id_points2.length;i++) {
			let element = document.getElementById(id_points2[i]);
			if (element){
				remove_object(id_points2[i]);
			};
		};
		binomio2 = [];
		for (let i=0; i<=control_point2; i++) {
			binomio2.push(fatorial(control_point2)/(fatorial(control_point2-i)*fatorial(i)))
		};
		let svg2_left = svg2.getBoundingClientRect().x + window.scrollX;
		let svg2_top = svg2.getBoundingClientRect().y + window.scrollY;
		pontos2.push([event.pageX-svg2_left,event.pageY-svg2_top,control_point2]);
		if(flag_control_points_svg2 ==true){
			draw_point("svg2"+control_point2.toString(),"draggable",4,event.pageX-svg2_left,event.pageY-svg2_top,"Red",svg2);
		};
		control_point2+=1;
	};
});

//////////////////////
svg2.onmousedown = function (evt){ 
	if(flag_move_svg2==true){
		var evt = evt || window.event;
		moveData2.element = evt.target || evt.srcElement;
    	if (!evt.target.classList.contains('draggable')) return moveData2.element = null;
    	moveData2.initialX = evt.clientX;
    	moveData2.initialY = evt.clientY;
    	moveData2.originalX = parseFloat(moveData2.element.getAttributeNS(null, "cx"));
		moveData2.originalY = parseFloat(moveData2.element.getAttributeNS(null, "cy"));
		
	};
};

svg2.onmousemove = function (evt) {
	if(flag_move_svg2==true){
		var evt = evt || window.event;
    	if (moveData2.element) {
        	var posX = moveData2.originalX + evt.clientX - moveData2.initialX;
	        var posY = moveData2.originalY + evt.clientY - moveData2.initialY;
    	    moveData2.element.setAttributeNS(null, "cx", posX);
        	moveData2.element.setAttributeNS(null, "cy", posY);
		};
	};
};

svg2.onmouseup = function (evt) {
	if(flag_move_svg2==true){
   		var evt = evt || window.event;
		if(moveData2.element.id){
			let id = moveData2.element.id;
			id = id.substring(4,id.length);
			pontos2[id]=[parseFloat(moveData2.element.getAttributeNS(null, "cx")),parseFloat(moveData2.element.getAttributeNS(null, "cy")),parseInt(id)];
			t2=0;
			for (let i=0;i<id_points2.length;i++){
				let element = document.getElementById(id_points2[i]);
				if (element){
					remove_object(id_points2[i]);
				};
			};
		};
		moveData2.element = null;
	};
};
////////////////////////////


function calculate_points2(lista){
	let ponto_aux_X = 0;
	let ponto_aux_Y = 0;
	let lista_length = lista.length;
	let j = lista_length-1;
	let id_aux_name = "svg2";
	let bernstein = 0;

	if (lista_length>1){
		for (let i=0; i < lista_length; i++){
			bernstein = binomio2[i]*Math.pow(1-t2,j-i)*Math.pow(t2,i);
			ponto_aux_X += bernstein*lista[i][0];
			ponto_aux_Y += bernstein*lista[i][1];
			id_aux_name+=(lista[i][2]).toString();
		};
		if(flag_definition_svg2==false){
			draw_point(id_aux_name,"static",3,ponto_aux_X,ponto_aux_Y,"Black",svg2);
			id_points2.push(id_aux_name);
		} else if (t2==0){
			proximo_ponto2 = [ponto_aux_X,ponto_aux_Y];
			draw_point(id_aux_name,"static",2.4,ponto_aux_X,ponto_aux_Y,"Black",svg2);
			id_points2.push(id_aux_name);
		} else{
			id_points2.push(id_aux_name);
			draw_point(id_aux_name,"static",2.4,ponto_aux_X,ponto_aux_Y,"Black",svg2);
			id_points2.push(id_aux_name);
			draw_line(id_aux_name,"static",proximo_ponto2[0],proximo_ponto2[1],ponto_aux_X,ponto_aux_Y,"Black",5,1,svg2);
			proximo_ponto2 = [ponto_aux_X,ponto_aux_Y];
		};
	};
};

function animation2(){
	if(flag_animacao_svg2==true){
		calculate_points2(pontos2);
		t2+=passo2;
		if(t2>1){
			if(Math.floor((t2+passo2)*(quantidade_pontos2-1))==quantidade_pontos2){
				t2=1;
				calculate_points2(pontos2);
				t2+=passo2;
			};
			t2=0;
			for (let i=0;i<id_points2.length;i++){
				let element = document.getElementById(id_points2[i]);
				if (element){
					remove_object(id_points2[i]);
				};
			};
		};
	} else {
		if(t2<=1){ 
			calculate_points2(pontos2);
			t2+=passo2;
		} else if(Math.floor((t2+passo2)*(quantidade_pontos2-1))==quantidade_pontos2){
			t2=1;
			calculate_points2(pontos2);
			t2+=passo2;
		};
	};
	setTimeout(function (){
		animation2(); 
	},25);
};

animation2();