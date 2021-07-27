var img_target,ctx,cnv,game;
var w,w_img,h,h_img;

onload=function(){

document.getElementById("to-screen-shose-img").onclick=function(){
  openScreen("screen-main", "screen-shose-img");
  draw_images();
};
document.getElementById("pause-btn").onclick=function(){
  if(game.state!=game.states.WIN){
    game.state=game.states.PAUSE;
  }
  openScreen("screen-game", "screen-pause-menu");
};

/*pause menu navigation*/
document.getElementById("continue").onclick=function(){
  openScreen("screen-pause-menu", "screen-game");
  if(game.state==game.states.PAUSE){
    game.state=game.states.PLAY;
  }
};

document.getElementById("restart").onclick=function(){
  openScreen("screen-pause-menu", "screen-game");
  clearInterval(game.interval);
  document.getElementById("time").innerHTML="Time: 00:00";
  document.getElementById("moves").innerHTML="Moves: 0";
  init_board();
  game.start();
}

document.getElementById("to-screen-game-mode").onclick = function() {
  openScreen("screen-pause-menu", "screen-game-mode");
  game.state = game.states.FINISHA;
  clearInterval(game.interval);
  game.time = 0;
  game.moves = 0;
  game.image.loaded = false;
  document.getElementById("time").innerHTML = "Time: 00:00";
  document.getElementById("moves").innerHTML = "Moves: 0";
}

document.getElementById("to-screen-main").onclick=function(){
  openScreen("screen-pause-menu", "screen-main");
  game.state=game.states.FINISHA;
  clearInterval(game.interval);
  game.time=0;
  game.moves=0;
  game.image.loaded=false;
  document.getElementById("time").innerHTML="Time: 00:00";
  document.getElementById("moves").innerHTML="Moves: 0";
}
/* end pause menu navigation */

/* draw game modes */
for(i=0;i<game.modes.length;i++){
  var btn=document.createElement("div");
  btn.append(game.modes[i].name);
  btn.setAttribute("class","btn");
  btn.setAttribute("i",i);
  btn.onclick=function(){
    game.mode=this.getAttribute("i");
    openScreen("screen-game-mode", "screen-game");
    document.getElementById("mode").innerText="Mode: "+game.modes[game.mode].name;
    game.start();
  }
  document.getElementById("screen-game-mode").getElementsByClassName("nav")[0].append(btn);
}
/* end draw game modes */

cnv=document.getElementById("cnv");
cnv.onclick=function(event){
  if(game.state==game.states.PLAY){
    move(event);
  }
};
ctx=cnv.getContext("2d");

};

function set_canvas_size(){
  cnv.width=cnv.offsetWidth;
  cnv.height=cnv.offsetWidth*(img_target.naturalHeight/img_target.naturalWidth);
}

function init_board(){
  set_canvas_size();
  ctx.clearRect(0, 0, cnv.offsetWidth, cnv.offsetHeight);
  game.grid.board=[];
  game.grid.x=game.modes[game.mode].grid[0];
  game.grid.y=game.modes[game.mode].grid[1];
  var length=game.grid.x*game.grid.y;
  var half_length=Math.floor(length/2);
  var rnum=Math.floor(Math.random()*(length-1));
  for(var i=0;i<length;i++){
    /*
    var n;
    do{
      n=1+Math.round(Math.random()*(game.grid.x*game.grid.y-1));
    }while(game.grid.board.indexOf(n)>=0);
    game.grid.board.push(n);
    */
    if(i<=half_length){
      game.grid.board.push(length-i);
    }else{
      game.grid.board.push(i-half_length);
    }
  }
  game.grid.board[rnum]*=-1;
  w=cnv.offsetWidth/game.grid.x;
  w_img=img_target.naturalWidth/game.grid.x;
  h=cnv.offsetHeight/game.grid.y;
  h_img=img_target.naturalHeight/game.grid.y;
  random_moves();
}

function random_moves(){
  var state=game.state;
  game.state=game.states.PAUSE;
  for (a = 0; a < game.grid.board.length*2; a++) {
    move({ offsetX: Math.random() * cnv.offsetWidth, offsetY: Math.random() * cnv.offsetHeight });
  }
  game.state=state;
}

function draw_board(){
  ctx.strokeStyle="rgba(0,0,0,.6)";
  ctx.fillStyle="#fff";
  ctx.lineWidth="2";
  for(i=0;i<game.grid.board.length;i++){
    var n=game.grid.board[i];
    if(n<0){continue;}
    var x=w*(i%game.grid.x);
    var x_img=w_img*((n-1)%game.grid.x);
    var y=h*Math.floor(i/game.grid.x);
    var y_img=h_img*Math.floor((n-1)/game.grid.x);
    ctx.drawImage(img_target,x_img,y_img,w_img,h_img,x,y,w,h);
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    if(game.time%20<3 && game.state!=game.states.WIN){draw_number(n,x,y,40*(1-(game.mode/10)),w,h);}
    ctx.stroke();
  }
}

function draw_number(num,x,y,size,w,h){
    var i_x=Math.floor((x+w/2)/(cnv.offsetWidth/game.grid.x));
    var i_y=Math.floor((y+h/2)/(cnv.offsetHeight/game.grid.y));
    var i=i_x+i_y*game.grid.x+1;
  ctx.save();
  ctx.font=""+size+"px Squada One";
  ctx.textAlign="center";
    if(num==i){
        ctx.fillStyle="rgba(0,150,0,.5)";
    }else{
      ctx.fillStyle="rgba(150,0,0,.5)";
    }
  ctx.fillRect(x,y,w,h);
  ctx.fillStyle="#fff";
  ctx.strokeStyle="#000";
  ctx.lineWidth="2";
  ctx.strokeText(num,x+w/2,y+h/2+size/2.5);
  ctx.fillText(num,x+w/2,y+h/2+size/2.5);
  ctx.restore();
}

function move(event) {
  var xx=-1;
  var yy=-1;
  var x = event.offsetX;
  x = x > 0 ? x : 0;
  var y = event.offsetY;
  y = y > 0 ? y : 0;

  x /= cnv.offsetWidth / game.grid.x;
  y /= cnv.offsetHeight / game.grid.y;
  x = Math.floor(x);
  y = Math.floor(y);
  if(game.grid.board[x+y*game.grid.x]<0){
    return;
  }
  
  /*++++++++++++++++++++++++++++++++++++++*/
  /*++++++++++++++++++++++++++++++++++++++*/
  
  if(x<game.grid.x){
    for(xpos=x+1;xpos<game.grid.x;xpos++){
      var i=xpos+y*game.grid.x;
      if(game.grid.board[i]<0){
        xx=xpos;
        break;
      }
    }
  }
  if(xx<0 && x>0){
    for (xpos = x - 1; xpos >= 0; xpos--) {
      var i = xpos + y * game.grid.x;
      if (game.grid.board[i] < 0) {
        xx = xpos;
        break;
      }
    }
  }
  if(xx!=-1){
    if(xx>x){
      for(xpos=x+y*game.grid.x;xpos<xx+y*game.grid.x;xpos++){
        var mem=game.grid.board[xpos+1];
        game.grid.board[xpos+1]=game.grid.board[x+y*game.grid.x];
        game.grid.board[x+y*game.grid.x]=mem;
      }
    }else{
      for (xpos = x + y * game.grid.x; xpos > xx + y * game.grid.x; xpos--) {
        var mem = game.grid.board[xpos - 1];
        game.grid.board[xpos - 1] = game.grid.board[x + y * game.grid.x];
        game.grid.board[x + y * game.grid.x] = mem;
      }
    }
  }

  /*++++++++++++++++++++++++++++++++++++++*/
  /*++++++++++++++++++++++++++++++++++++++*/

  if(xx<0){
    if (y < game.grid.y) {
      for (ypos = y + 1; ypos < game.grid.y; ypos++) {
        var i = x + ypos * game.grid.x;
        if (game.grid.board[i] < 0) {
          yy = ypos;
          break;
        }
      }
    }
    if (yy < 0 && y > 0) {
      for (ypos = y - 1; ypos >= 0; ypos--) {
        var i = x + ypos * game.grid.x;
        if (game.grid.board[i] < 0) {
          yy = ypos;
          break;
        }
      }
    }
    if (yy != -1) {
      if (yy > y) {
        for (ypos = x + y * game.grid.x; ypos < x + yy * game.grid.x; ypos+=game.grid.x) {
          var mem = game.grid.board[ypos + game.grid.x];
          game.grid.board[ypos + game.grid.x] = game.grid.board[x + y * game.grid.x];
          game.grid.board[x + y * game.grid.x] = mem;
        }
      } else {
        for (ypos = x + y * game.grid.x; ypos > x + yy * game.grid.x; ypos-=game.grid.x) {
          var mem = game.grid.board[ypos - game.grid.x];
          game.grid.board[ypos - game.grid.x] = game.grid.board[x + y * game.grid.x];
          game.grid.board[x + y * game.grid.x] = mem;
        }
      }
    }
  }

  /*++++++++++++++++++++++++++++++++++++++
  ++++++++++++++++++++++++++++++++++++++*/

  ctx.clearRect(0, 0, cnv.offsetWidth, cnv.offsetHeight);
  draw_board();
  if((xx>=0 || yy>=0) && game.state==game.states.PLAY){
    game.moves++;
    document.getElementById("moves").innerHTML="Moves: "+game.moves;
    if(chek_result()){
      for(i=0;i<game.grid.board.length;i++){
        if(game.grid.board[i]<0){
          game.grid.board[i]*=-1;
          break;
        }
      }
      game.state=game.states.WIN;
      alert("you win!");
    }
  }
  ctx.clearRect(0, 0, cnv.offsetWidth, cnv.offsetHeight);
  draw_board();
}

function drawImage(){
  if(game.image.loaded){
    if(img_target.getAttribute("src")==game.image.src){
      game.state=game.states.PLAY;
      return;
    }else{
      game.image.loaded=false;
    }
  }
  var img=document.createElement("img");
  img.src=game.image.src;
  img.setAttribute("id","img-target");
  img.onload=function(){
    init_board();
    game.image.loaded=true;
    game.state=game.states.PLAY;
  };
  document.getElementById("img").innerHTML="";
  document.getElementById("img").append(img);
  img_target=document.getElementById("img-target");
}

function chek_result(){
  var n=0;
  for(i=0;i<game.grid.board.length-1;i++){
    if(Math.abs(game.grid.board[i])+1==Math.abs(game.grid.board[i+1])){
      n++;
    }
  }
  if(n==game.grid.board.length-1){
    return true;
  }
  return false;
}

function timeFormat(seconds){
  var s=seconds%60;
  var m=(seconds-s)/60%60;
  var h=(seconds-s-m*60)/60/60;
  s=s>9?s:"0"+s;m=m>9?m:"0"+m;
  return ""+h>0 ? ""+h+":"+m+":"+s : ""+m+":"+s;
}

function openScreen(from, to){
  document.getElementById(from).setAttribute("class","hidden");
  document.getElementById(to).removeAttribute("class");
}

function scrollimages(arg){
  var imgs=document.getElementById("images");
  var imgs_w=imgs.offsetWidth;
  var n=imgs.children.length;
  var x=1*imgs.getAttribute("x");
  if(x==0 && arg>0) return;
  if(x==-imgs_w*(n-1)-(imgs.offsetLeft/2*(n-1)) && arg<0) return;
  var old_x=x;
  x+=imgs_w*arg+arg*imgs.offsetLeft/2;
  imgs.children[Math.floor(Math.abs(old_x/imgs_w))].setAttribute("class","h");
  imgs.children[Math.floor(Math.abs(x/imgs_w))].setAttribute("class","");
  imgs.style="transform:translateX("+x+"px)";
  imgs.setAttribute("x",""+x);
  if(x==0){
    document.getElementById("controlls").children[0].style="opacity:.4;pointer-events:none";
  }else if(x==-imgs_w-imgs.offsetLeft/2){
    document.getElementById("controlls").children[0].style="";
  }
  if(x==(-imgs_w*(n-1))-(imgs.offsetLeft/2)*(n-1)){
    document.getElementById("controlls").children[1].style="opacity:.4;pointer-events:none";
  }else if(x==(-imgs_w*(n-2))-(imgs.offsetLeft/2)*(n-2)){
    document.getElementById("controlls").children[1].style="";
  }
}

function draw_images(){
  var imgs=document.getElementById("images");
  if(imgs.children.length>0){return;}
  for(x=0;x<=Math.floor(game.images.length/9);x++){
    var div=document.createElement("div");
    if(x>0){
      div.setAttribute("class","h");
    }
    for(i=x*9;i<x*9+9;i++){
      if(game.images[i]){
        var src=game.images[i];
        var img=document.createElement("img");
        img.src=src.replace("/$img_h","/h100");
        img.onclick=function(){
          game.image.src=this.src.replace("/h100","");
          openScreen("screen-shose-img","screen-game-mode");
        }
      }else{
        var img=document.createElement("div");
        img.setAttribute("class","no-img");
      }
      div.append(img);
    }
    imgs.append(div);
  }
  if(imgs.children.length==1){
    document.getElementById("controlls").setAttribute("class","hidden");
  }
}

game = {
  states: {
    PAUSE: 0,
    PLAY: 1,
    FINISH: 2,
    WIN: 3
  },
  modes: [
    { name: "Easy", grid: [3, 3] },
    { name: "Normal", grid: [4, 4] },
    { name: "Hard", grid: [5, 5] },
    { name: "Hard++", grid: [6, 6] }
  ],
  images:[
    "https://1.bp.blogspot.com/-7YEga-YmQ5o/YPBSGkOR27I/AAAAAAAAAl4/TauUifEfGDILEJYQxbabMjOUJgb_vSwbgCNcBGAsYHQ/$img_h/2%2B%2528www.cute-pictures.blogspot.com%2529.jpg",
    "https://1.bp.blogspot.com/-WSZlOaR6_-M/YPBVs_zclCI/AAAAAAAAAmA/jdi9wnfMgxkjGnwy2mcY15KK_UCGk0SDgCNcBGAsYHQ/$img_h/baby-animals-kittens-cat-wallpaper-thumb.jpg",
    "https://1.bp.blogspot.com/-uAdar-j-amE/YPBXu4GG9uI/AAAAAAAAAmI/K2Ff5KUKomcdKT7cIMpDEdgBoVnpqhEpQCNcBGAsYHQ/$img_h/earth-rock-africa-algeria-wallpaper-thumb.jpg",
    "https://1.bp.blogspot.com/-w2uMKe4COdo/YPC4CK-WlMI/AAAAAAAAAmg/UOxs0fMMn1kdEnVK0-3SmubXkwAFD_NrwCNcBGAsYHQ/$img_h/Eagle_Owl.jpg",
    "https://1.bp.blogspot.com/-id-TyB4jNTo/YPC4B6bDj-I/AAAAAAAAAmc/8UHb-7xVgNs4igQ096YM_Dr-Lgw5M0XhACNcBGAsYHQ/$img_h/8526271172_06780037cc_b.jpg",
    "https://1.bp.blogspot.com/-6MPD9zsJ6cM/YPC4AIYtB7I/AAAAAAAAAmQ/4Dir0FqfwlsHIPjZA_Zc5or2WfJNlcW9gCNcBGAsYHQ/$img_h/1280px-Koppelpoort_Amersfoort_2008%25281%2529.jpg",
    "https://1.bp.blogspot.com/-_7L3oQvaOzY/YPC4BZ1RDcI/AAAAAAAAAmY/ylUIlcg_HswYFlUDDNmrOtU78nbfvLvOgCNcBGAsYHQ/$img_h/26%2Bowls%2B%2528www.cute-pictures.blogspot.com%2529.jpg",
    "https://1.bp.blogspot.com/-sTaJ0qmAoCE/YPC4BQqIoXI/AAAAAAAAAmU/fm68rUtIVng7OxC-oi4_ig5FaxYC5oRLQCNcBGAsYHQ/$img_h/2%2Btigers%2B%2528www.cute-pictures.blogspot.com%2529.jpg",
    "https://1.bp.blogspot.com/-z93LmZ-1TOQ/YPSmRtV0WlI/AAAAAAAAAm0/t5s-ZcZgpkAgY-fxSbio5x9huEGUeG1VQCNcBGAsYHQ/$img_h/31%2Bsea%2Banimal%2B%2528www.cute-pictures.blogspot.com%2529.jpg",
    "https://1.bp.blogspot.com/-RxVWpJrgE_U/YPSmS4X3toI/AAAAAAAAAm4/V1KmFSywk7kK_UkfbnvSr7z-LzP0FBxoQCNcBGAsYHQ/$img_h/20130725_01_001.jpg",
     "https://1.bp.blogspot.com/-IlbW5LKw7bw/YPSmTFVhAxI/AAAAAAAAAm8/NefYksCB6s4G3Zmr8d2CQy2B4B6HttYZQCNcBGAsYHQ/$img_h/Pictures%2Bof%2BTruly%2BAdorable%2BAnimals%2Bin%2BSnow%2B18.jpg",
    "https://1.bp.blogspot.com/-kYqDliX-TnU/YPSmTNOg7MI/AAAAAAAAAnA/SgZm4TX6bOw1AT0HB48mIXYbgcxn9o2RgCNcBGAsYHQ/$img_h/tropical_beach_by_tomprante_d9fynnw-pre.jpg",
    "https://1.bp.blogspot.com/-abekc-xNyqE/YPxdef1m7VI/AAAAAAAAAng/ccaEK3o5wB8spT4LL-fs4lEBmkbrkQTNACNcBGAsYHQ/$img_h/1200px-Cervus_elaphus_Luc_Viatour_6.jpg",
    "https://1.bp.blogspot.com/-BJm7LbYLUsw/YPxdostB2aI/AAAAAAAAAnk/j91U4Om4ePMrqf3KfHlvM736bSOGBYu2QCNcBGAsYHQ/$img_h/passerines.jpg",
    "https://1.bp.blogspot.com/-nBCfn7MMx7k/YPxdtwHRjSI/AAAAAAAAAns/cX_ATwiNYcIq59kmLwN1Fvy3nXr1miQagCNcBGAsYHQ/$img_h/Halloween-Wallpaper.jpg"
  ],
  state: 2,
  mode:0,
  image:{
    loaded:false,
    src:"https://1.bp.blogspot.com/-7YEga-YmQ5o/YPBSGkOR27I/AAAAAAAAAl4/TauUifEfGDILEJYQxbabMjOUJgb_vSwbgCNcBGAsYHQ/2%2B%2528www.cute-pictures.blogspot.com%2529.jpg"
  },
  grid: {
    x: 0,
    y: 0,
    board: []
  },
  time: 0,
  moves:0,
  imterval: null,
  start: function() {
    game.moves=0;
    game.time=0;
    drawImage();
    game.interval = setInterval(function() {
      if(game.state==game.states.PLAY && game.image.loaded){
        game.update();
      }
    }, 1000);
  },
  update: function() {
    draw_board();
    game.time+=1;
    document.getElementById("time").innerText = "Time: "+timeFormat(game.time);
  }
};
