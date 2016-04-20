define(function(){
    console.log('canvas run');
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height; 
    canvas.style.backgroundColor = '#234';
    document.body.appendChild(canvas);
    var res = {
      'width':width,
      'height':height,
      'canvas':canvas,
      'context':canvas.getContext('2d'),
      '_sonObj':[],
      'draw':function(){
          this.context.clearRect(0,0,width,height);
          for(var i in this._sonObj){
              this._sonObj[i].draw();
          }
      },
      'addSon':function(obj){
          this._sonObj.push(obj);
      },
      'click':function(x,y){
          
      }
    };
    canvas.addEventListener('click',function(e){
        res.click(e.offsetX,e.offsetY);
    });
    return res;
});