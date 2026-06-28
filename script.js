function updateTime(){
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime
}
updateTime();
setInterval(updateTime, 1000);


// Make the DIV element draggable:
dragElement(document.getElementById("outer-border"));
dragElement(document.getElementById("spacewindow"));
dragElement(document.getElementById("notelauncher"));
dragElement(document.getElementById("docwindow"));
dragElement(document.getElementById("calcwindow"));
dragElement(document.getElementById("convertwindow"));
dragElement(document.getElementById("gamewindow"));
    
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var header = elmnt.querySelector(".window-header");
  if (header) {
    // if present, the header is where you move the DIV from:
    header.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// functions to close and open windows
var welcomeScreen = document.querySelector("#outer-border");
var welcomeScreenClose = document.querySelector("#closewelcome");
var welcomeScreenOpen = document.querySelector("#welcomebutton");


function closeWelcome(element){
  element.classList.add('fade');
  welcomeScreenClose.addEventListener('transitionend', function() {
    element.style.display = 'none';
  }, {once: true});

}
function openWelcome(element){
  element.style.display = "flex";
  element.classList.remove('fade');

}

welcomeScreenOpen.addEventListener('click', function() {
  openWelcome(welcomeScreen);
});
welcomeScreenClose.addEventListener('click', function() {
  closeWelcome(welcomeScreen);
});

var noteScreen = document.querySelector("#notelauncher");
var noteClose = document.querySelector("#closnote");
var noteOpen = document.querySelector("#notebookapp");

function screenClose (element){
  element.classList.add('fade');
  element.addEventListener('transitionend', function() {
    element.style.display = 'none';
    if (element.id === "docwindow") {
      const notesInput = document.querySelector("#notesenter");
      notesInput.innerText="type here";
    }
  }, {once: true});

}
function screenOpen(element){
  element.style.display = "flex";
  element.classList.remove('fade');

}
noteOpen.addEventListener('click', function() {
  screenOpen(noteScreen);
});
noteClose.addEventListener('click', function() {
  screenClose(noteScreen);
});

var docScreen = document.querySelector("#docwindow");
var docClose = document.querySelector("#closdoc");
var docOpen = document.querySelector("#docnewbutton");

docOpen.addEventListener('click', function() {
  screenOpen(docScreen);
});
docClose.addEventListener('click', function() {
  screenClose(docScreen);
});

var calcScreen = document.querySelector("#calcwindow");
var calcClose = document.querySelector("#closcalc");
var calcOpen = document.querySelector("#calcapp");

calcOpen.addEventListener('click', function(){
  screenOpen(calcScreen);
  mode="standard";
  display.placeholder="";

});
calcClose.addEventListener('click', function(){
  screenClose(calcScreen);
  mode = "standard";
  screenClose(convertScreen);
  km.style.backgroundColor="rgb(8, 127, 255)";
  mk.style.backgroundColor="rgb(8, 127, 255)";
  fc.style.backgroundColor ="rgb(8, 127, 255)";
  cf.style.backgroundColor="rgb(8, 127, 255)";
});

var convertScreen = document.querySelector("#convertwindow");
var convertClose = document.querySelector("#closconvert");
var convertOpen = document.querySelector("#convert");

convertOpen.addEventListener('click', function(){
  screenOpen(convertScreen);
});
convertClose.addEventListener('click', function(){
  screenClose(convertScreen);
  mode="standard";
  display.placeholder="";
  km.style.backgroundColor="rgb(8, 127, 255)";
  mk.style.backgroundColor="rgb(8, 127, 255)";
  fc.style.backgroundColor ="rgb(8, 127, 255)";
  cf.style.backgroundColor="rgb(8, 127, 255)";
});

const save = document.querySelector("#savebutton");
const notesInput = document.querySelector("#notesenter");
const loadButton = document.querySelector("#loadbutton");
// if (localStorage.getItem("userNotes")){
//   notesInput.innerText = localStorage.getItem("userNotes");
// }
// function saveDoc(element){
//   localStorage.setItem("userNotes", notesInput.innerText);

// }
if (sessionStorage.getItem("userNotes")){
  notesInput.innerText = sessionStorage.getItem("userNotes");
}
function saveDoc(element){
  sessionStorage.setItem("userNotes", notesInput.innerText);

}

function loadDoc() {
  if (sessionStorage.getItem("userNotes")) {
    notesInput.innerText = sessionStorage.getItem("userNotes");
    screenOpen(docScreen);
}}

save.addEventListener('click', saveDoc);
loadButton.addEventListener('click', loadDoc);

var gameScreen = document.querySelector("#gamewindow");
var gameClose = document.querySelector("#closgame");
var gameOpen = document.querySelector("#gameapp");

gameOpen.addEventListener('click', function(){
  screenOpen(gameScreen);
  gameLoop();
});
gameClose.addEventListener('click', function(){
  screenClose(gameScreen);
});

var spaceScreen = document.querySelector("#spacewindow");
var spaceClose = document.querySelector("#closspace");
var spaceOpen = document.querySelector("#allspace");

function spaceScreenClose (element){
  element.classList.add('fade');
  element.addEventListener('transitionend', function() {
    element.style.display = 'none';
  }, {once: true});

}
function spaceScreenOpen(element){
  element.style.display = "flex";
  element.classList.remove('fade');

  // render();

}


spaceOpen.addEventListener('click', function() {
  spaceScreenOpen(spaceScreen);
});
spaceClose.addEventListener('click', function() {
  spaceScreenClose(spaceScreen);
});

function converter(){
  mk.addEventListener('click', function(){
    display.placeholder="Enter Miles:"
    mode = "mik";
    display.value="";
    mk.style.backgroundColor = "rgb(11, 30, 92)";
    fc.style.backgroundColor ="rgb(8, 127, 255)";
    km.style.backgroundColor ="rgb(8, 127, 255)";
    cf.style.backgroundColor="rgb(8, 127, 255)";
  })
  fc.addEventListener('click', function(){
    display.placeholder="Enter °F:"
    mode="fcel";
    display.value="";
    fc.style.backgroundColor="rgb(11, 30, 92)";
    mk.style.backgroundColor="rgb(8, 127, 255)";
    km.style.backgroundColor ="rgb(8, 127, 255)";
    cf.style.backgroundColor="rgb(8, 127, 255)";
  })
  km.addEventListener('click', function(){
    display.placeholder="Enter Km:"
    mode="kim";
    display.value="";
    km.style.backgroundColor="rgb(11, 30, 92)";
    mk.style.backgroundColor="rgb(8, 127, 255)";
    fc.style.backgroundColor ="rgb(8, 127, 255)";
    cf.style.backgroundColor="rgb(8, 127, 255)";
  })
  cf.addEventListener('click', function(){
    display.placeholder="Enter °C:"
    mode="celf";
    display.value="";
    km.style.backgroundColor="rgb(8, 127, 255)";
    mk.style.backgroundColor="rgb(8, 127, 255)";
    fc.style.backgroundColor ="rgb(8, 127, 255)";
    cf.style.backgroundColor="rgb(11, 30, 92)";
  })

}

const display = document.querySelector("#calcdisplay");
const numButtons = document.querySelectorAll(".nums"); 
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const equalButton = document.querySelector("#equal");
const decimal = document.querySelector("#dot");
const convert = document.querySelector("#convert");
let mode = "standard";
const mk = document.querySelector("#m-k");
const fc = document.querySelector("#f-c");
const km = document.querySelector("#k-m");
const cf = document.querySelector("#c-f");

numButtons.forEach(function(button){
  button.addEventListener('click', function(){
    display.value += button.innerText;
  });
});

document.querySelector("#add").addEventListener("click", () => display.value += "+");
document.querySelector("#sub").addEventListener("click", () => display.value += "-");
document.querySelector("#mult").addEventListener("click", () => display.value += "*"); 
document.querySelector("#div").addEventListener("click", () => display.value += "/");

converter();

clearButton.addEventListener('click', function(){
    display.value = "";
});
deleteButton.addEventListener('click', function(){
    display.value = display.value.slice(0, -1);
});
equalButton.addEventListener('click', function(){
  if (mode==="mik"){
    display.value=(display.value*1.60934).toFixed(2) + "Km";
  }
  else if (mode==="fcel"){
    display.value=((display.value-32)*(5/9)).toFixed(2) + "°C";
  }
  else if (mode === "kim"){
    display.value=(display.value/1.60934).toFixed(2) + "Mi";
  }
  else if(mode === "celf"){
    display.value=((display.value*(9/5))+32).toFixed(2) + "°F";
  }
  else if(mode==="standard"){
    display.placeholder="";
    display.value = eval(display.value).toFixed(3);

  }
});



const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

const viewportTransform = {
    x: 0,
    y: 0,
    scale: 1
};


const drawPlanetBody = (planetId, name, color, radius, date) => {
    if (planetId === Astronomy.Body.Saturn) {
        const position = Astronomy.HelioVector(planetId, date);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const scaleX = 100;
        const scaleY = 100;

        //translating the vectors given from the library into coordinates on the canvas
        const canvasX = cx + position.x * scaleX;
        const canvasY = cy - position.y * scaleY;
        const orbr = Math.sqrt(position.x ** 2 + position.y ** 2);
        const textY = canvasY + 20;

        //drawing the planets orbit line
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbr * scaleX, orbr * scaleY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 0.5;
        // back rings
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(canvasX, canvasY, 15, 3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgb(122, 39, 3)";
        ctx.lineWidth = 2;
        ctx.stroke();

        //planet
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        //front rings
        ctx.beginPath();
        ctx.ellipse(canvasX, canvasY, 15, 3, 0, 0, Math.PI*1.3);
        ctx.strokeStyle = "rgb(122, 39, 3)";
        ctx.lineWidth = 2;
        ctx.stroke();

      
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(name, canvasX+5, textY);
    }
    else if (typeof Astronomy !== 'undefined') {
        const position = Astronomy.HelioVector(planetId, date);
        
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const scaleX = 100;
        const scaleY = 100;

        //translating the vectors given from the library into coordinates on the canvas
        const canvasX = cx + position.x * scaleX;
        const canvasY = cy - position.y * scaleY;
        const orbr = Math.sqrt(position.x ** 2 + position.y ** 2);

        //orbit line
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbr * scaleX, orbr * scaleY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // draw planet
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

       
        ctx.font = "5px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(name, canvasX -10, canvasY+10);
    }
};

const render = () => {
    //zoom and pan transformations
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(viewportTransform.scale, 0, 0, viewportTransform.scale, viewportTransform.x, viewportTransform.y);

    const date = new Date();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

  
    ctx.font = "20px Georgia";
    ctx.fillStyle = "white";
    ctx.fillText("Our Solar System", cx-75, 40);

    // draw the Sun in the center
    ctx.beginPath();
    ctx.arc(cx, cy, 15, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    
    ctx.font = "14px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Sun", cx - 12, cy - 22);

    //loops through each body and draws them by pulling the planet id from the library
    const bodies = [
        {id: Astronomy.Body.Mercury, color: "gray", radius: 4, name: "Mercury" },
        {id: Astronomy.Body.Venus, color: "orange", radius: 5, name: "Venus" },
        {id: Astronomy.Body.Earth, color: "rgb(8, 83, 245)", radius: 6, name: "Earth" },
        {id: Astronomy.Body.Mars, color: "rgb(252, 73, 8)", radius: 5, name: "Mars" },
        {id: Astronomy.Body.Jupiter, color: "rgb(207, 132, 1)", radius: 8, name: "Jupiter"},
        {id: Astronomy.Body.Saturn, color: "rgb(207, 132, 1)", radius: 8, name: "Saturn"},
        {id: Astronomy.Body.Uranus, color: "rgb(0, 191, 255)", radius: 7, name: "Uranus"},
        {id: Astronomy.Body.Neptune, color: "rgb(15, 9, 101)", radius: 7, name: "Neptune"},
        // {id: Astronomy.Body.Moon, color: "white", radius: 1, name: "Moon"}
    ];

    bodies.forEach(planet => {
        drawPlanetBody(planet.id, planet.name, planet.color, planet.radius, date);
    });
};

//zooming and panning code
let previousX = 0;
let previousY = 0;

const updatePanning = (e) => {
    const localX = e.clientX;
    const localY = e.clientY;

    viewportTransform.x += localX - previousX;
    viewportTransform.y += localY - previousY;

    previousX = localX;
    previousY = localY;
};

const updateZooming = (e) => {
    const oldScale = viewportTransform.scale;
    const oldX = viewportTransform.x;
    const oldY = viewportTransform.y;

    const localX = e.clientX;
    const localY = e.clientY;

    const previousScale = viewportTransform.scale;
    let newScale = viewportTransform.scale += e.deltaY * -0.001; // Made zooming sensitivity smoother
    const minZoom = 0.1;
    const maxZoom = 5.0;
    newScale = Math.max(minZoom, Math.min(maxZoom, newScale));
    viewportTransform.x = localX - (localX - oldX) * (newScale / previousScale);
    viewportTransform.y = localY - (localY - oldY) * (newScale / previousScale);
    viewportTransform.scale = newScale;
};

const onMouseMove = (e) => {
    updatePanning(e);
    render();
};

const onMouseWheel = (e) => {
    updateZooming(e);
    render();
    e.preventDefault(); 
};

canvas.addEventListener("wheel", onMouseWheel, { passive: false });

canvas.addEventListener("mousedown", (e) => {
    previousX = e.clientX;
    previousY = e.clientY;
    canvas.addEventListener("mousemove", onMouseMove);
});

canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", onMouseMove);
});


render();

const raceCanvas = document.getElementById('raceCanvas');
const rctx = raceCanvas.getContext('2d');
const hidCanvas = document.getElementById('hidCanvas');
const hctx = hidCanvas.getContext('2d');



// car poperties:
const car = {
  x: 590,
  y:-240,
  width: 40,
  height: 15,
  speed: 0,
  acceleration: 0.2,
  maxSpeed: 8,
  friction: 0.09,
  angle: -1.5708,
  steering: 0.04,
  
};

const finish = {
  x: 540,
  y: -300,
  width: 100,
  height: 30,
};
const check = {
  x: 780,
  y: -840,
  width: 20,
  height: 100,
};
const checkb={
  x: 940,
  y: -300,
  width: 100,
  height: 20,
}
const checkc={
  x: 200,
  y: 300,
  width: 20,
  height: 100,
}

let upClick = false;
let downClick = false;
let rightClick = false;
let leftClick = false;


document.addEventListener('keydown', function(event){
  switch(event.key){
    case 'ArrowUp':
      upClick = true;
      break;
    case 'ArrowDown':
      downClick = true;
      break;
    case 'ArrowRight':
      rightClick = true;
      break;
    case 'ArrowLeft':
      leftClick = true;
      break;
  }
})
document.addEventListener('keyup', function(event){
  switch(event.key){
    case 'ArrowUp':
      upClick = false;
      break;
    case 'ArrowDown':
      downClick = false;
      break;
    case 'ArrowRight':
      rightClick = false;
      break;
    case 'ArrowLeft':
      leftClick = false;
      break;
  }
})

let cameraX = 0;
let cameraY = 0;
let sec=0;
let ms=0;
let min =0;
let timeString = "00:00.00";
let timerStarted = false;
let started = false;
let timerId = null;
let hittingCheck = false;
let hittingCheckB = false;
let hittingCheckC = false;
let lap =0;
let leftFinish = true;
let onTracka = false;

function onTrack(x,y){
  const screenX = Math.floor(x + cameraX);
  const screenY = Math.floor(y + cameraY);

  if (screenX < 0 || screenX >= hidCanvas.width || screenY < 0 || screenY >= hidCanvas.height) {
    return false; 
  }
  const pixel = hctx.getImageData(screenX, screenY, 1, 1).data;
  console.log(
    screenX,
    screenY,
    pixel[0],
    pixel[1],
    pixel[2]
  );

  const r = pixel[0];
  const g = pixel[1];
  const b = pixel[2];

  if ((r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255)){
    return true;
  }
  else{
    return false;
  }
}

function timer(){
  if (timerId !== null) {
    clearInterval(timerId);
  }
  timerId = setInterval(() => {
    ms ++;
    if (ms >= 100){
      ms = 0;
      sec ++;
    };
    if (sec >= 60){
      sec = 0;
      ms = 0;
      min ++;
    }

    let minf = String(min).padStart(2, '0');
    let secf = String(sec).padStart(2, '0');
    let msf = String(ms).padStart(2, '0');
    
    timeString = minf + ":" + secf + "." + msf;
  }, 10);
}



 


function carMovement(){
  const turnDirection = car.speed > 0 ? 1 : -1;
  if (upClick === true){
    car.speed += car.acceleration;

  } 
  else if (downClick === true){
    car.speed -= car.acceleration;

  }
  else{
    if (car.speed > 0){
      car.speed -= car.friction;
    } 
    if (car.speed < 0){
      car.speed += car.friction;
    }
    if (Math.abs(car.speed) < car.friction){
      car.speed = 0; 
    } 
  }
  if (car.speed > car.maxSpeed){
    car.speed = car.maxSpeed;
  }
  if (car.speed < -car.maxSpeed / 2){
    car.speed = -car.maxSpeed / 2;
  }
  if (rightClick === true && Math.abs(car.speed) >= 0.2){
    car.angle += (car.steering * turnDirection);
  }
  else if (leftClick === true && Math.abs(car.speed) >= 0.2){
    car.angle -= (car.steering * turnDirection);
  }

  const nextX = car.x + Math.cos(car.angle) * car.speed;
  const nextY = car.y + Math.sin(car.angle) * car.speed;
  
  
  const track = onTrack(nextX, nextY);
  console.log(track);

  if (!track) {
      car.speed = -car.speed * 0.04;
  } else {
      car.x = nextX;
      car.y = nextY;
  }
  // if (onTrack(nextX, nextY)===false){
  //   car.speed = car.speed * 0;

  // } else{
  //   car.x = nextX;
  //   car.y = nextY;
  // }

  const hittingFinishLine = (car.x >= finish.x) && (car.x <= finish.x + finish.width) && (car.y >= finish.y) && (car.y <= finish.y + finish.height);
  if((car.x >= check.x) && (car.x <= check.x + check.width) && (car.y >= check.y) && (car.y <= check.y + check.height)){
    hittingCheck = true;
  }
  if((car.x >= checkb.x) && (car.x <= checkb.x + checkb.width) && (car.y >= checkb.y) && (car.y <= checkb.y + checkb.height)){
    hittingCheckB = true;
  }
  if((car.x >= checkc.x) && (car.x <= checkc.x + checkc.width) && (car.y >= checkc.y) && (car.y <= checkc.y + checkc.height)){
    hittingCheckC = true;
  }
  if (hittingFinishLine) {
    if (lap === 0) {
        timer(); 
        timerStarted = true; 
        // started = false;
        leftFinish =false;
        lap =1;
    }
    else if (lap === 1 && leftFinish === true  && hittingCheck && hittingCheckB && hittingCheckC) {
      clearInterval(timerId);
      lap ="Done";
    }
  }
  else {
    if (lap === 1) {
      leftFinish = true;
    }
  }

  // car.x += Math.cos(car.angle) * car.speed;
  // car.y += Math.sin(car.angle) * car.speed;

}

function drawTrack(ctx) {

   
  ctx.clearRect(0, 0, raceCanvas.width, raceCanvas.height);
  ctx.fillStyle = "rgb(76,179,92)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();
  ctx.translate(cameraX, cameraY);
  
  // track
  ctx.beginPath();
  ctx.ellipse(200, 150, 400, 200, 0, 0, Math.PI);
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = "100";
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(200, 155, 400, 205, Math.PI, 0, Math.PI/2);
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = "100";
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(190, -250, 400, 200, 0, 0, Math.PI/2);
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = "100";
  ctx.stroke();

  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(540,-545, 100, 300);

  ctx.beginPath();
  ctx.ellipse(790, -540, 200, 250, Math.PI, 0, Math.PI);
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = "100";
  ctx.stroke();

  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(940,-545, 100, 400);

  ctx.beginPath();
  ctx.ellipse(815, -150, 175, 175, 0, 0, Math.PI/2);
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = "100";
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(820, 155, 220, 130, Math.PI, 0, Math.PI/2);
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = "100";
  ctx.stroke();

  //finish line
  ctx.fillStyle = "white";
  ctx.fillRect(finish.x,finish.y, finish.width, finish.height);

  ctx.fillStyle = "black";
  ctx.fillRect(check.x, check.y, check.width, check.height);
  
  ctx.fillStyle = "black";
  ctx.fillRect(checkb.x, checkb.y, checkb.width, checkb.height);

  ctx.fillStyle = "black";
  ctx.fillRect(checkc.x, checkc.y, checkc.width, checkc.height);
  ctx.restore();
  
  // ctx.save();
  // ctx.translate(car.x, car.y);
  // ctx.rotate(car.angle);
  
}
function drawCar(){
  rctx.save();

  rctx.translate(cameraX + car.x, cameraY + car.y);
  rctx.rotate(car.angle);
  //Car rectangle
  rctx.fillStyle = "rgb(255, 50, 50)"; 
  rctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);


  rctx.fillStyle = "white";
  rctx.fillRect(-car.width / 2 + 2, car.height / 2, 10, 5); // back right
  rctx.fillRect(car.width / 2 - 12, -car.height / 2 -5, 10, 5); //front left
  rctx.fillRect(-car.width / 2 +2, -car.height / 2 -5, 10, 5); // backleft
  rctx.fillRect(car.width / 2 - 12, car.height / 2, 10, 5); // front right
  // rctx.fillRect(car.width / 2 -5 , -car.height / 2, 2, car.height);
  rctx.fillStyle ="black";
  rctx.fillRect(car.width / 2 - car.width, car.height / 2 - 11, car.width, 2);
  rctx.fillRect(car.width / 2 - car.width, car.height / 2 - 5, car.width, 2);
  
  rctx.fillStyle = "yellow";
  rctx.fillRect(car.width / 2 - 5, -car.height / 2, 5, car.height);
  // rctx.fillStyle = "black";
  // rctx.fillRect(car.width / 2, car.heigth / 2, 5, car.height)


  rctx.restore();




  rctx.fillStyle = "white";
  rctx.font = "20px Arial"; 
  rctx.fillText(timeString, 50, 50);




}


function gameLoop() {
  carMovement();
  cameraX = (raceCanvas.width / 2) - car.x;
  cameraY = (raceCanvas.height / 2)-car.y;

  drawTrack(hctx);
  drawTrack(rctx);
  drawCar();
  requestAnimationFrame(gameLoop); 
}



