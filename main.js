var game = {
  states: {
    PAUSE: 0,
    PLAY: 1,
    FINISH: 2
  },
  modes: [
    { name: "Easy", grid: [3, 3] },
    { name: "Normal", grid: [5, 4] },
    { name: "Hard", grid: [6, 5] },
    { name: "Hard++", grid: [7, 6] }
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
    "https://1.bp.blogspot.com/-kYqDliX-TnU/YPSmTNOg7MI/AAAAAAAAAnA/SgZm4TX6bOw1AT0HB48mIXYbgcxn9o2RgCNcBGAsYHQ/$img_h/tropical_beach_by_tomprante_d9fynnw-pre.jpg"
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
    document.getElementById("time").innerHTML = "Time: "+timeFormat(Math.floor(game.time));
  }
};
var img_target,ctx,cnv;

onload=function(){

document.getElementById("to-screen-shose-img").onclick=function(){
  openScreen("screen-main", "screen-shose-img");
  draw_images();
};
document.getElementById("pause-btn").onclick=function(){
  game.state=game.states.PAUSE;
  openScreen("screen-game", "screen-pause-menu");
};

/*pause menu navigation*/
document.getElementById("continue").onclick=function(){
  openScreen("screen-pause-menu", "screen-game");
  game.state=game.states.PLAY;
};

document.getElementById("restart").onclick=function(){
  openScreen("screen-pause-menu", "screen-game");
  clearInterval(game.interval);
  document.getElementById("time").innerHTML="Time: 00:00";
  document.getElementById("moves").innerHTML="Moves: 0";
  init_board();
  game.start();
}

document.getElementById("to-screen-main").onclick=function(){
  openScreen("screen-pause-menu", "screen-main");
  game.state=game.states.FINISHA;
  clearInterval(game.interval);
  game.time=0;
  game.moves=0;
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
    game.start();
  }
  document.getElementById("screen-game-mode").getElementsByClassName("nav")[0].append(btn);
}
/* end draw game modes */

/* draw images */

/* end draw images */

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
  game.grid.board=[];
  game.grid.x=game.modes[game.mode].grid[0];
  game.grid.y=game.modes[game.mode].grid[1];
  var rnum=Math.floor(Math.random()*(game.grid.x*game.grid.y-1));
  for(var i=0;i<game.grid.x*game.grid.y;i++){
    var n;
    do{
      n=1+Math.round(Math.random()*(game.grid.x*game.grid.y-1));
    }while(game.grid.board.indexOf(n)>=0);
    game.grid.board.push(n);
  }
  game.grid.board[rnum]*=-1;
}

function draw_board(){
  ctx.strokeStyle="rgba(0,0,0,.6)";
  ctx.fillStyle="#fff";
  ctx.lineWidth="2";
  var w=cnv.offsetWidth/game.grid.x;
  var w_img=img_target.naturalWidth/game.grid.x;
  var h=cnv.offsetHeight/game.grid.y;
  var h_img=img_target.naturalHeight/game.grid.y;
  for(var i in game.grid.board){
    if(game.grid.board[i]<0){continue;}
    var n=game.grid.board[i];
    var x=w;
    var x_img=w_img*((n-1)%game.grid.x);
    x*=i%game.grid.x;
    var y=h;
    var y_img=h_img*Math.floor((n-1)/game.grid.x);
    y*=Math.floor(i/game.grid.x);
    ctx.drawImage(img_target,x_img,y_img,w_img,h_img,x,y,w,h);
    ctx.rect(x,y,w,h);
    if(game.time%20<3){draw_number(n,x,y,40*(1-(game.mode/10)),w,h);}
  }
  ctx.stroke();
}

function draw_number(num,x,y,size,w,h){
  ctx.save();
  ctx.font=""+size+"px Squada One";
  ctx.textAlign="center";
  ctx.fillStyle="rgba(0,0,0,.5)";
  ctx.fillRect(x,y,w,h);
  ctx.fillStyle="#fff";
  ctx.strokeStyle="#000";
  ctx.lineWidth="2";
  ctx.strokeText(num,x+w/2,y+h/2+size/2.5);
  ctx.fillText(num,x+w/2,y+h/2+size/2.5);
  ctx.restore();
}

function move(event){
  var x=event.offsetX;
  x=x>0 ? x : 0;
  var y=event.offsetY;
  y=y>0 ? y : 0;
  
  x/=cnv.offsetWidth/game.grid.x;
  y/=cnv.offsetHeight/game.grid.y;
  x=Math.floor(x);
  y=Math.floor(y);
  var to_i=-1;
  if(x<game.grid.x-1){
    var i=x+1+game.grid.x*y;
    if(game.grid.board[i]<0){to_i=i;}
  }
  if(x>0){
    var i=x-1+game.grid.x*y;
    if(game.grid.board[i]<0){to_i=i;}
  }
  if(y<game.grid.y-1){
    var i=x+game.grid.x*(y+1);
    if(game.grid.board[i]<0){to_i=i;}
  }
  if(y>0){
    var i=x+game.grid.x*(y-1);
    if(game.grid.board[i]<0){to_i=i;}
  }
  if(to_i>=0){
    var i=x+game.grid.x*y;
    var mem=game.grid.board[to_i];
    game.grid.board[to_i]=game.grid.board[i];
    game.grid.board[i]=mem;
    game.moves++;
    document.getElementById("moves").innerHTML="Moves: "+game.moves;
    if(chek_result()){
      game.grid.board[i]=-mem;
      ctx.clearRect(0,0,cnv.offsetWidth,cnv.offsetHeight);
      draw_board();
      game.state=game.states.FINISH;
      alert("you win!");
    }
  }
  ctx.clearRect(0,0,cnv.offsetWidth,cnv.offsetHeight);
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
  x+=imgs_w*arg+arg*imgs.offsetLeft/2;
  imgs.style="transform:translateX("+x+"px)";
  imgs.setAttribute("x",""+x);
}

function draw_images(){
  var imgs=document.getElementById("images");
  if(imgs.children.length>0){return;}
  for(x=0;x<=Math.floor(game.images.length/9);x++){
    var div=document.createElement("div");
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
        //img.src="#";
        //img.src="https://1.bp.blogspot.com/-uAdar-j-amE/YPBXu4GG9uI/AAAAAAAAAmI/K2Ff5KUKomcdKT7cIMpDEdgBoVnpqhEpQCNcBGAsYHQ/h100/earth-rock-africa-algeria-wallpaper-thumb.jpg";
        img.setAttribute("class","no-img");
        //img.style="display:inline-block;opacity:1;";
      }
      div.append(img);
    }
    imgs.append(div);
  }
  if(imgs.children.length==1){
    document.getElementById("controlls").setAttribute("class","hidden");
  }
}
