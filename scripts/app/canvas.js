define(function() {
    console.log('canvas run');
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.backgroundColor = '#234';
    document.body.appendChild(canvas);
    var res = {
        'width': width,
        'height': height,
        'canvas': canvas,
        'context': canvas.getContext('2d'),
        '_sonObj': [],
        'draw': function() {
            this.context.clearRect(0, 0, width, height);
            for (var i = 0; i < this._sonObj.length; i++) {
                this._sonObj[i].draw();
            }
        },
        'addSon': function(obj) {
            this._sonObj.push(obj);
        },
        'click': function(x, y) {

        },
        'removeSon': function(obj) {
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            this._sonObj.remove(obj);
            delete Array.prototype.remove;
        }
    };
    canvas.addEventListener('click', function(e) {
        res.click(e.offsetX, e.offsetY);
    });
    return res;
});