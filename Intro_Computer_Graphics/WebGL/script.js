var mMatrix = mat4.create();
var vMatrix = mat4.create();
var pMatrix = mat4.create();
var mMatrixPilha = [];

var cuboVertexPositionBuffer;
var cuboVertexColorBuffer;
var rotCubo = 0;
var cuboVertexIndexBuffer;


var shaderProgram;
var gl;
var ultimo = 0;


//Controles
var xRot = 0;
var xVel = 20;
var yRot = 0;
var yVel = 20;
var zRot = 0;
var zVel = 0;
var zoom = -10.0;

var filtro = 0;

var teclasPressionadas = {};

$( function() {
    iniciarWebGL();
});

function iniciarWebGL() {
    var canvasWebGL1 = document.getElementById("canvasWebGL1"); //$('#canvasWebGL1')[0];
    iniciarGL(canvasWebGL1);
    iniciarShaders();
    iniciarBuffers();
    iniciarAmbiente();
    document.onkeydown = eventoTeclaPress;
    document.onkeyup = eventoTeclaSolta;
    tick();
};

function iniciarGL(canvas) {
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;     
    } catch(e) {
        if (!gl) {
          alert("O WebGL não conseguiu ser inicializado.");
        };
    };
};

function iniciarShaders() {
    var vertexShader = getShader(gl,"shader-vs");
    var fragmentShader = getShader(gl, "shader-fs");
    
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Shaders não conseguiram ser reinicilalizados.");
    };

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    

    shaderProgram.pMatrixUniform = gl.getUniformLocation (shaderProgram, "uPMatrix");
    shaderProgram.vMatrixUniform = gl.getUniformLocation (shaderProgram, "uVMatrix");
    shaderProgram.mMatrixUniform = gl.getUniformLocation (shaderProgram, "uMMatrix");
};


function getShader(gl,id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    };
    
    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        };    
        k = k.nextSibling;
    };

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
        
    } else {
        return null;
    };
    
    gl.shaderSource(shader, str);
    
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    };
    
    return shader;
};

function iniciarBuffers() {
    /*    Cubo    */
    cuboVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cuboVertexPositionBuffer);
    vertices = [-1.0,-1.0, 1.0,
                 1.0,-1.0, 1.0,
                 1.0, 1.0, 1.0,
                -1.0, 1.0, 1.0,
            
                -1.0,-1.0,-1.0,
                -1.0, 1.0,-1.0,
                 1.0, 1.0,-1.0,
                 1.0,-1.0,-1.0,
              
                -1.0, 1.0,-1.0,
                -1.0, 1.0, 1.0,
                 1.0, 1.0, 1.0,
                 1.0, 1.0,-1.0,
            
                -1.0,-1.0,-1.0,
                 1.0,-1.0,-1.0,
                 1.0,-1.0, 1.0,
                -1.0,-1.0, 1.0,
        
                 1.0,-1.0,-1.0,
                 1.0, 1.0,-1.0,
                 1.0, 1.0, 1.0,
                 1.0,-1.0, 1.0,
            
                -1.0,-1.0,-1.0,
                -1.0,-1.0, 1.0,
                -1.0, 1.0, 1.0,
                -1.0, 1.0,-1.0, //Até aqui são os lados do cubo 
                
                //Frente
                //Letra E
                
                -0.95, 0.35, 1.01,
                -0.95, -0.35, 1.01,
                -0.85, -0.35, 1.01,
                -0.85, 0.35, 1.01,
                
                -0.85, 0.35, 1.01,
                -0.85, 0.25, 1.01,
                -0.6, 0.25, 1.01,
                -0.6, 0.35, 1.01,
            
                -0.85, 0.05, 1.01,
                -0.85, -0.05, 1.01,
                -0.65, -0.05, 1.01,
                -0.65, 0.05, 1.01,
            
                -0.85, -0.25, 1.01,
                -0.85, -0.35, 1.01,
                -0.6, -0.35, 1.01,
                -0.6, -0.25, 1.01,

                //Letra M

                -0.45, 0.35, 1.01,
                -0.45, -0.35, 1.01,
                -0.35, -0.35, 1.01,
                -0.35, 0.35, 1.01,
            
                -0.35, 0.25, 1.01,
                -0.35, 0.05, 1.01,
                -0.25, 0.05, 1.01,
                -0.25, 0.25, 1.01,
            
                -0.25, 0.15, 1.01,
                -0.25, -0.05, 1.01,
                -0.15, -0.05, 1.01,
                -0.15, 0.15, 1.01,
            
                -0.15, 0.25, 1.01,
                -0.15, 0.05, 1.01,
                -0.05, 0.05, 1.01,
                -0.05, 0.25, 1.01,
            
                -0.05, 0.35, 1.01,
                -0.05, -0.35, 1.01,
                0.05, -0.35, 1.01,
                0.05, 0.35, 1.01,

                // Letra A

                0.15, 0.35, 1.01,
                0.15, -0.35, 1.01,
                0.25, -0.35, 1.01,
                0.25, 0.35, 1.01,
            
                0.25, 0.35, 1.01,
                0.25, 0.25, 1.01,
                0.45, 0.25, 1.01,
                0.45, 0.35, 1.01,
            
                0.25, 0.05, 1.01,
                0.25, -0.05, 1.01,
                0.45, -0.05, 1.01,
                0.45, 0.05, 1.01,
            
                0.45, 0.35, 1.01,
                0.45, -0.35, 1.01,
                0.55, -0.35, 1.01,
                0.55, 0.35, 1.01,
            
                // Letra p

                0.65, 0.05, 1.01,
                0.65, -0.55, 1.01,
                0.75, -0.55, 1.01,
                0.75, 0.05, 1.01,
            
                0.75, 0.05, 1.01,
                0.75, -0.05, 1.01,
                0.95, -0.05, 1.01,
                0.95, 0.05, 1.01,
            
                0.75, -0.15, 1.01,
                0.75, -0.25, 1.01,
                0.95, -0.25, 1.01,
                0.95, -0.15, 1.01,
            
                0.85, -0.05, 1.01,
                0.85, -0.15, 1.01,
                0.95, -0.15, 1.01,
                0.95, -0.05, 1.01,


                //Trás
                //Letra E
                
                0.95, 0.35, -1.01,
                0.95, -0.35, -1.01,
                0.85, -0.35, -1.01,
                0.85, 0.35, -1.01,
                
                0.85, 0.35, -1.01,
                0.85, 0.25, -1.01,
                0.6, 0.25, -1.01,
                0.6, 0.35, -1.01,
            
                0.85, 0.05, -1.01,
                0.85, -0.05, -1.01,
                0.65, -0.05, -1.01,
                0.65, 0.05, -1.01,
            
                0.85, -0.25, -1.01,
                0.85, -0.35, -1.01,
                0.6, -0.35, -1.01,
                0.6, -0.25, -1.01,

                //Letra M

                0.45, 0.35, -1.01,
                0.45, -0.35, -1.01,
                0.35, -0.35, -1.01,
                0.35, 0.35, -1.01,
            
                0.35, 0.25, -1.01,
                0.35, 0.05, -1.01,
                0.25, 0.05, -1.01,
                0.25, 0.25, -1.01,
            
                0.25, 0.15, -1.01,
                0.25, -0.05, -1.01,
                0.15, -0.05, -1.01,
                0.15, 0.15, -1.01,
            
                0.15, 0.25, -1.01,
                0.15, 0.05, -1.01,
                0.05, 0.05, -1.01,
                0.05, 0.25, -1.01,
            
                0.05, 0.35, -1.001,
                0.05, -0.35, -1.001,
                -0.05, -0.35, -1.001,
                -0.05, 0.35, -1.001,

                // Letra A

                -0.15, 0.35, -1.01,
                -0.15, -0.35, -1.01,
                -0.25, -0.35, -1.01,
                -0.25, 0.35, -1.01,
            
                -0.25, 0.35, -1.01,
                -0.25, 0.25, -1.01,
                -0.45, 0.25, -1.01,
                -0.45, 0.35, -1.01,
            
                -0.25, 0.05, -1.01,
                -0.25, -0.05, -1.01,
                -0.45, -0.05, -1.01,
                -0.45, 0.05, -1.01,
            
                -0.45, 0.35, -1.01,
                -0.45, -0.35, -1.01,
                -0.55, -0.35, -1.01,
                -0.55, 0.35, -1.01,
            
                // Letra p

                -0.65, 0.05, -1.01,
                -0.65, -0.55, -1.01,
                -0.75, -0.55, -1.01,
                -0.75, 0.05, -1.01,
            
                -0.75, 0.05, -1.01,
                -0.75, -0.05, -1.01,
                -0.95, -0.05, -1.01,
                -0.95, 0.05, -1.01,
            
                -0.75, -0.15, -1.01,
                -0.75, -0.25, -1.01,
                -0.95, -0.25, -1.01,
                -0.95, -0.15, -1.01,
            
                -0.85, -0.05, -1.01,
                -0.85, -0.15, -1.01,
                -0.95, -0.15, -1.01,
                -0.95, -0.05, -1.01];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cuboVertexPositionBuffer.itemSize = 3;
    cuboVertexPositionBuffer.numItems = 160; //24+68

    cuboVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cuboVertexColorBuffer);
    cores = [ [0.3, 0.6, 0.95, 1.0], // Frente
              [0.3, 0.6, 0.95, 1.0], // Trás
              [0.95, 0.85, 0.5, 1.0], // Topo
              [0.95, 0.85, 0.5, 1.0], // Base
              [0.9, 0.4, 0.4, 1.0], // Direita
              [0.9, 0.4, 0.4, 1.0], ]; //Esquerda
    var coresReplicadas = [];
    for (let i in cores){
        let cor = cores[i];
        for (let j=0; j<4; j++){
            coresReplicadas = coresReplicadas.concat(cor);
        };        
    };

    for (let j=0; j<136; j++){
        coresReplicadas = coresReplicadas.concat([0.9,0.9,0.9,1.0]);
    };

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coresReplicadas), gl.STATIC_DRAW);
    cuboVertexColorBuffer.itemSize = 4;
    cuboVertexColorBuffer.numItems = 160;

    cuboVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cuboVertexIndexBuffer);
    var indices = [ 0,  1,  2,    0,  2,  3,     // Frente
                    4,  5,  6,    4,  6,  7,     // Trás
                    8,  9, 10,    8, 10, 11,     // Topo
                   12, 13, 14,   12, 14, 15,     // Base
                   16, 17, 18,   16, 18, 19,     // Direita
                   20, 21, 22,   20, 22, 23,      // Esquerda
                   //Frente
                    //Letra E
                   24, 25, 26,   24, 26, 27, 
                   28, 29, 30,   28, 30, 31, 
                   32, 33, 34,   32, 34, 35, 
                   36, 37, 38,   36, 38, 39, 
                    //Letra M
                   40, 41, 42,   40, 42, 43,
                   44, 45, 46,   44, 46, 47,
                   48, 49, 50,   48, 50, 51, 
                   52, 53, 54,   52, 54, 55, 
                   56, 57, 58,   56, 58, 59, 
                    //Letra A
                   60, 61, 62,   60, 62, 63, 
                   64, 65, 66,   64, 66, 67, 
                   68, 69, 70,   68, 70, 71,
                   72, 73, 74,   72, 74, 75,                    
                    //Letra p
                   76, 77, 78,   76, 78, 79, 
                   80, 81, 82,   80, 82, 83, 
                   84, 85, 86,   84, 86, 87, 
                   88, 89, 90,   88, 90, 91,
                   //Trás
                    //Letra E
                   92, 93, 94,   92, 94, 95, 
                   96, 97, 98,   96, 98, 99, 
                   100, 101, 102, 100, 102, 103,
                   104, 105, 106,    104, 106, 107, 
                    //Letra M
                   108, 109, 110,    108, 110, 111, 
                   112, 113, 114,    112, 114, 115, 
                   116, 117, 118,    116, 118, 119, 
                   120, 121, 122,    120, 122, 123, 
                   //Letra A       
                   124, 125, 126,    124, 126, 127, 
                   128, 129, 130,    128, 130, 131, 
                   132, 133, 134,    132, 134, 135, 
                   136, 137, 138,    136, 138, 139,  
                    //Letra p 
                   140, 141, 142,    140, 142, 143, 
                   144, 145, 146,    144, 146, 147, 
                   148, 149, 150,    148, 150, 151, 
                   152, 153, 154,    152, 154, 155, 
                   156, 157, 158,    156, 158, 159];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    cuboVertexIndexBuffer.itemSize = 1;
    cuboVertexIndexBuffer.numItems = 240;
};

function iniciarAmbiente(){
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
};

function desenharCena(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl. DEPTH_BUFFER_BIT);
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.01, 80.0, pMatrix);
    mat4.identity(mMatrix);
    mat4.identity(vMatrix);

    //Desenhando o Cubo
    mat4.translate(mMatrix,[0.0, 0.0, zoom]);
    
    mPushMatrix();
    mat4.rotate(mMatrix, degToRad(xRot), [1,0,0]);
    mat4.rotate(mMatrix, degToRad(yRot), [0,1,0]);
    mat4.rotate(mMatrix, degToRad(zRot), [0,0,1]);

    gl.bindBuffer(gl.ARRAY_BUFFER, cuboVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cuboVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, cuboVertexColorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, cuboVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cuboVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, cuboVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
     
    mPopMatrix();
};

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, vMatrix);
    gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, mMatrix);
};

function tick() {
    requestAnimFrame(tick);
    tratarTeclado();
    desenharCena();
    animar();
};

function animar() {
    var agora = new Date().getTime();
    if (ultimo != 0) {
        var diferenca = agora - ultimo;
        xRot +=((xVel*diferenca)/1000.0) % 360.0;
        yRot +=((yVel*diferenca)/1000.0) % 360.0;
        zRot +=((zVel*diferenca)/1000.0) % 360.0;
    };
    ultimo=agora;
};

function mPushMatrix() {
    var copy = mat4.create();
    mat4.set(mMatrix, copy);
    mMatrixPilha.push(copy);
};

function mPopMatrix() {
    if (mMatrixPilha.length == 0) {
        throw "Execução de mPopMatrix inválida!"
    };
    mMatrix = mMatrixPilha.pop();
};

function degToRad(graus){
    return graus*Math.PI/180;
};

function eventoTeclaPress(evento){
    teclasPressionadas[evento.keyCode] = true;

    if (String.fromCharCode(evento.keyCode) == "F") {
        filtro = (filtro+1) % 3;
    };
    return false;
};

function eventoTeclaSolta(evento){
    teclasPressionadas[evento.keyCode] = false;
    return false;
};

function tratarTeclado(){
    if (teclasPressionadas[109] || teclasPressionadas[83]) {
        // "-" ou "s"
        zoom -= 0.05;
    };
    if (teclasPressionadas[107] || teclasPressionadas[65]) {
       // "+" ou "a"
        zoom += 0.05;
    };
    if (teclasPressionadas[97] || teclasPressionadas[49]) {
        // "1"
        xVel+= 1;
    };
    if (teclasPressionadas[98] || teclasPressionadas[50]) {
        // "2"
        xVel -= 1;
    };
    if (teclasPressionadas[100] || teclasPressionadas[52]) {
        // "4"
        yVel += 1;
    };
    if (teclasPressionadas[101] || teclasPressionadas[53]) {
        // "5"
        yVel -= 1;
    };
    if (teclasPressionadas[103] || teclasPressionadas[55]) {
        // "7"
        zVel += 1;
    };
    if (teclasPressionadas[104] || teclasPressionadas[56]) {
        // "8"
        zVel -= 1;
    };
};