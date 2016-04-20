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
            if(left<up&&left<down){
                return 1;
            }
            if(right<up&&right<down){
                return 1;
            }
            return 2;
        }else{
            return 0;
        }
    }
    
    var formerX;
    var formerY;
    function playerGo(x,y){
        for(var i in brickArr){
            switch(dotInRect(player.x,player.y,brickArr[i].x,brickArr[i].y,brickArr[i].width,brickArr[i].height)){
            case 1:
                
                break;
            case 2:
                break;
            default:
            }
        }
    }
    
    /**
     * handle input
     */
    function goPath(x,y){
        playerGo(x,y);
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