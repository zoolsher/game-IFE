define(['canvas','brick','player'],function(canvas,brick,player) {
    'use strict';
    var width = canvas.width;
    var height = canvas.height;
    var dox = 1250*700/50;
    var brickTotalNum = width*height/dox;
    var max = 70;
    var min = 40;
    
    for(var index = 0;index<brickTotalNum;++index){
        var newB = new brick();
        newB.width = (max-min)*Math.random()+min;
        newB.height = (max-min)*Math.random()+min;
        newB.x = Math.random()*width;
        newB.y = Math.random()*height;
        canvas.addSon(newB);
    }
    
    var player = new player();
    canvas.addSon(player);
    
    
    
    /**
     * handle input
     */
    function goPath(x,y){
        
        player.startPath(x,y);
        
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