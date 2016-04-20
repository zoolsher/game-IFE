define(['canvas'],function(canvas){
    var ctx = canvas.context;
    function Job(){
        if(!(this instanceof Job)){
            throw new Error('calling class as a function');
        }
        this.x = 0;
        this.y = 0;
        this.height = 10;
        this.width  = 10;
        this.color = 'green';
    }
    Job.prototype.draw = function(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+this.width/2,this.y+this.height);
        ctx.lineTo(this.x-this.width/2,this.y+this.height);
        ctx.lineTo(this.x,this.y);
        ctx.closePath();
        ctx.fill();
    }
    
    return Job;
})