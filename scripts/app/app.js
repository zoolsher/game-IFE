define(['canvas','brick','player'],function(canvas,brick,player) {
    'use strict';
    var width = canvas.width;
    var height = canvas.height;
    var dox = 1250*700/50;
    var brickTotalNum = width*height/dox;
    var max = 70;
    var min = 40;
    var brickArr = [];
    
    for(var index = 0;index<brickTotalNum;++index){
        var newB = new brick();
        newB.width = (max-min)*Math.random()+min;
        newB.height = (max-min)*Math.random()+min;
        newB.x = Math.random()*width;
        newB.y = Math.random()*height;
        canvas.addSon(newB);
        brickArr.push(newB);
    }
    
    var player = new player();
    canvas.addSon(player);
    
    function dotInRect(dotX,dotY,x,y,width,height){
        if(dotX>x&&dotX<x+width&&dotY>y&&dotY<y+height){
            var up = Math.abs(dotY-y);
            var down = Math.abs(dotY-y-height);
            var left = Math.abs(dotX-x);
            var right = Math.abs(dotX-x-width);
            if(left<up&&left<down&&left<right){
                return 1;
            }
            if(right<up&&right<down&&right<left){
                return 1;
            }
            return 2;
        }else{
            return 0;
        }
    }
    
    var formerX;
    var formerY;
    var cx;
    var cy;
    function playerGo(x,y){
        player.inMoving = false;
        
        if(arguments.length == 2){
            cx = x;
            cy = y;
        }
        formerX = player.x;
        formerY = player.y;
        console.log(player.x);
        console.log(player.y);
        for(var i in brickArr){
            switch(dotInRect(player.x,player.y,brickArr[i].x-10,brickArr[i].y-10,brickArr[i].width+20,brickArr[i].height+20)){
            case 1:
            console.log(1);
                if(Math.abs(brickArr[i].y-player.y)<brickArr[i].height/2){
                    player.startPath(player.x,player.y-10);
                }else{
                    player.startPath(player.x,player.y+10);
                }
                requestAnimationFrame(playerGo);
                return;
                break;
            case 2:
            console.log(2);
                if(Math.abs(brickArr[i].x-player.x)<brickArr[i].width/2){
                    player.startPath(player.x-10,player.y);
                }else{
                    player.startPath(player.x+10,player.y);
                }
                
                requestAnimationFrame(playerGo);
                return;
                break;
            default:
                player.startPath(parseInt(cx),parseInt(cy));
            }
        }
        if(Math.abs(player.x-cx+player.y-cy)>10){
            requestAnimationFrame(playerGo);
        }
    }
    
    /**
     * handle input
     */
    function goPath(x,y){
        cx= x;
        cy=y;
        playerGo();
    }
    
    
    canvas.click = function(x,y){
        goPath(x,y);
    }
    
    
    
    /**
     * handle frame update
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    function step(){
        canvas.draw();
        requestAnimationFrame(step);
    }
    
    requestAnimationFrame(step);

    
});