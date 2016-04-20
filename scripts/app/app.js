define(['canvas','brick','player','pathfindWrapper','job'],function(canvas,brick,player,pf,job) {
    console.log(pf);
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
    
    var job = new job();
    job.x = width-100;
    job.y = height-100;
    canvas.addSon(job);
    
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
    
    
    
    /**
     * handle input
     */

       
        
    
    
    var path;
    var curIndex=0;
    function gogo(){
        if(!player.inMoving){
            player.startPath(path[curIndex][0],path[curIndex][1]);
            curIndex++;
        }
        if(curIndex<path.length){
            requestAnimationFrame(gogo);
        }else{
            curIndex = 0;
        }
    }
    
    canvas.click = function(x,y){
        var map = pf.initMap(brickArr);
        path = pf.fp(player.x,player.y,x,y);
        requestAnimationFrame(gogo);
    }
    
    
    
    /**
     * handle frame update
     */
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    
    function step(){
        canvas.draw();
        if(Math.abs(player.x-job.x+player.y+job.y)<10){
            canvas.removeSon(job);
        }
        requestAnimationFrame(step);
    }
    
    requestAnimationFrame(step);

    
});