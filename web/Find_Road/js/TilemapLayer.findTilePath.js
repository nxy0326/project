// *****************************
// Phaser.TilemapLayer.findTilePath
// 基于TilemapLayer的寻路函数,寻找两个Tile之间的路径
// *****************************
// 参数：
// x0 : 起点Tile的x
// y0 : 起点Tile的y
// x1 : 终点Tile的x
// y1 : 终点Tile的y
// collideIndexes : 检测碰撞的index数组（像tilemap中的collideIndexes）
// 返回数组 Array<Tile> 或 false
// 数组第一个元素为终点Tile，依次到起点Tile，但最后不包含起点Tile
// 走路时，可用Array.pop()读取下一步的Tile
Phaser.TilemapLayer.prototype.findTilePath = function (x0, y0, x1, y1, collideIndexes, limit) {
    if(limit === undefined){ limit = 100; }
    var _layer = this.layer;
    var excepts = [];
    var roundTilesAll = [];
    var isFound = false;
    if(_layer.data[y1] === undefined || _layer.data[y1][x1] === undefined){ // 目标不存在?
        return false;
    }
    var curTile = _layer.data[y0][x0];//起点
    var tarTile = _layer.data[y1][x1];//终点
    if(collideIndexes.indexOf(tarTile.index) > -1){ // 目标不可及?
        return false;
    }
    roundTilesAll.push([curTile]);//起点放到roundTilesAll数组里[[_layer.data[y0][x0]]]   roundTilesAll=[[_layer.data[y0][x0]]]
    excepts.push(curTile);//起点放到excepts中[_layer.data[y0][x0]]
    var step = 0;//步数
    // （获取外围的Tiles，返回 Array<Tile>
    var rounds = this._getRoundTiles(roundTilesAll[0], excepts, collideIndexes);//获取roundTilesAll中第一个点（起点）的外围Tiles放到rounds中
    //循环取外围tiles
    while(rounds.length > 0){//rounds所有点（起点的外围点）的长度大于0
        step ++;//步数增加
        if(step > limit){//如果步数大于100
            break;//跳出
        }
        if(rounds.indexOf(tarTile) > -1){//外围的tiles中是不是有终点
            isFound = true;//可以到达
            break;//跳出
        }
        excepts = roundTilesAll[roundTilesAll.length - 1].concat();//
        roundTilesAll.push(rounds);//rounds中的点放到roundTilesAll中
        rounds = this._getRoundTiles(rounds, excepts, collideIndexes);//找rounds的外围tiles放到rounds中
    }
    if(isFound){//如果找的到
        var tmpTile;//定义临时点
        var path=[];
         //var path = [[_layer.data[14][6]],[_layer.data[13][6]],[_layer.data[13][5]],[_layer.data[12][5]],[_layer.data[11][5]],[_layer.data[10][5]],[_layer.data[9][5]]];//定义path[]数组
        path.push(tarTile);//把终点放到path数组中
        while(roundTilesAll.length > 1){//roundTilesAll中有数组
            rounds = roundTilesAll.pop();//从roundTilesAll中取出的数组放到rounds中
            if(tarTile.x > 0){//如果终点的x坐标大于0
                tmpTile = _layer.data[tarTile.y][tarTile.x - 1];//x坐标-1，放到tmpTile中
                if(rounds.indexOf(tmpTile) != -1){//如果 rounds中有tmpTile这个点
                    path.push(tmpTile);//把tmpTile放到path数组中
                    tarTile = tmpTile;//把tmpTile当作终点
                    continue;
                }
            }
            if(tarTile.x < _layer.width-1){//如果终点的x小于地图宽度-1
                tmpTile = _layer.data[tarTile.y][tarTile.x + 1];//x坐标+1，放到tmpTile中
                if(rounds.indexOf(tmpTile) != -1){//如果rounds中有tmpTile这个点
                    path.push(tmpTile);//把tmpTile放到path数组中
                    tarTile = tmpTile;//把tmpTile当作终点
                    continue;
                }
            }
            if(tarTile.y > 0){
                tmpTile = _layer.data[tarTile.y - 1][tarTile.x];
                if(rounds.indexOf(tmpTile) != -1){
                    path.push(tmpTile);
                    tarTile = tmpTile;
                    continue;
                }
            }
            if(tarTile.y < _layer.height - 1){
                tmpTile = _layer.data[tarTile.y + 1][tarTile.x];
                if(rounds.indexOf(tmpTile) != -1){
                    path.push(tmpTile);
                    tarTile = tmpTile;
                    continue;
                }
            }
        }
        console.dir(path);
        return path;
    }else{
        return false;
    }
};

// *****************************
// getRoundTiles （获取外围的Tiles）
// *****************************
// 返回 Array<Tile>
Phaser.TilemapLayer.prototype._getRoundTiles = function(roundTiles, exceptTiles, collideIndexes){
    var _layer = this.layer;
    var newRoundArray = [];
    var x;
    var y;
    var tmpTile;
    for (var i = 0; i < roundTiles.length; i++){
        x = roundTiles[i].x;
        // console.log(x);
        y = roundTiles[i].y;
        if(x > 0){
            tmpTile = _layer.data[y][x - 1];
            if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
                newRoundArray.push(tmpTile);
                exceptTiles.push(tmpTile);
            }
        }
        if(x<_layer.width - 1){
            tmpTile = _layer.data[y][x + 1];
            if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
                newRoundArray.push(tmpTile);
                exceptTiles.push(tmpTile);
            }
        }
        if(y>0){
            tmpTile = _layer.data[y - 1][x];
            if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
                newRoundArray.push(tmpTile);
                exceptTiles.push(tmpTile);
            }
        }
        if(y<_layer.height - 1){
            tmpTile = _layer.data[y + 1][x];
            if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
                newRoundArray.push(tmpTile);
                exceptTiles.push(tmpTile);
            }
        }
    }
    // console.log(newRoundArray);
    return newRoundArray;
};
