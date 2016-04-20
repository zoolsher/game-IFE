define(['canvas'],function(canvas){
    var ctx = canvas.canvas.getContext('2d');
    var color = '#FEF935';
    var step = 10;
    function Player(){
        if(!(this instanceof Player)){
            throw new Error('calling a class as function');
        }
        this.inMoving = false;
        this.x = 10;
        this.y = 10;
        this.radius = 10;
        this.destionX = 0;
        this.destionY = 0;
    }
    Player.prototype.draw=function (){
        if(this.inMoving){
            this.moveby(this.destionX-this.x,this.destionY-this.y);
            if(Math.abs(this.x-this.destionX)+Math.abs(this.y-this.destionY)<step){
                this.inMoving =false;
            }
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }
    Player.prototype.moveby = function(x,y){
        var length = Math.sqrt(x*x+y*y);
        length/=step;
        x = x/length;
        y = y/length;
        this.x += isNaN(parseInt(x))?0:parseInt(x);
        this.y += isNaN(parseInt(y))?0:parseInt(y);
    }
    Player.prototype.startPath = function(x,y){
        this.destionX = x;
        this.destionY = y;
        this.inMoving = true;
    }
    Player.prototype.clearMove = function(){
        this.inMoving = false;
    }
    return Player;
})