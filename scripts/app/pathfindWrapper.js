define(['pathfinding-browser','canvas'],function(PF,canvas){
    var map = [];
    var GRIDSize = 20;
    function rectcontains(ax,ay,awidth,aheight,bx,by,bwidth,bheight){
        var nMaxLeft = ax >= bx ? ax : bx;  
        var nMaxTop = ay >= by ? ay : by;  
        var nMinRight = (ax + awidth) <= (bx + bwidth) ? (ax + awidth) : (bx + bwidth);  
        var nMinBottom = (ay + aheight) <= (by + bheight) ? (ay + aheight) : (by + bheight);  
        if (nMaxLeft > nMinRight || nMaxTop > nMinBottom){  
            return 0;  
        }else{  
            return 1; 
        }  
    }
    
    function initMap(brickArr){
        
        var xLength = Math.ceil(canvas.width/GRIDSize);
        var yLength = Math.ceil(canvas.height/GRIDSize); 
        map = new Array(xLength);
        for(var i=0;i<xLength;i++){
            var temp = new Array(yLength);
            temp.fill(0);
            map[i] = temp; 
        }
        
        for(var i=0;i<xLength;i++){
            for(var j=0;j<yLength;j++){
                for(var k in brickArr){
                    var temp = parseInt(rectcontains(brickArr[k].x,brickArr[k].y,brickArr[k].width,brickArr[k].height,i*GRIDSize,j*GRIDSize,GRIDSize,GRIDSize));
                    map[j][i] = temp;
                }   
            }
        }
        return map;
    }
    function findPathwarpper(startX,startY,endX,endY){
        var x = map.length;
        var y = map[0].length;
        var grid = new PF.Grid(y,x,map);
        var finder = new PF.AStarFinder();
        startX/=GRIDSize;
        startY/=GRIDSize;
        endX/=GRIDSize;
        endY/=GRIDSize;
        startX = parseInt(startX);
        startY = parseInt(startY);
        endX = parseInt(endX);
        endY = parseInt(endY);
        var path = finder.findPath(startX,startY,endX,endY, grid);
        /**
         * 0 width 1 height
         *  */  
        var res = [];
        for(var i in path){
            res.push([path[i][0]*GRIDSize,path[i][1]*GRIDSize]);
        }
        return res;
    }
    return {
        'initMap':initMap,
        'fp':findPathwarpper
    }
});