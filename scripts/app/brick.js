define(['canvas'],function(canvas){
    var context = canvas.canvas.getContext('2d');
    var color = '#EC493B';
    function Brick(){
        if(!(this instanceof Brick)){
            throw new Error('calling a class as function');
        }
        this.width = 0;
        this.height = 0;
        this.x=0;
        this.y=0;
        this.color = color;
    }
    Brick.prototype.draw = function(){
        context.fillStyle = color;
        context.fillRect(this.x,this.y,this.width,this.height);
    }
    return Brick;
});