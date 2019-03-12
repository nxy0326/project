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
    if(limit === undefined){ limit = 100; }//===严格相等，limit声明但未初始化定义与undefined严格相等
    var _layer = this.layer;
    var excepts = [];
    var roundTilesAll = [];
    var isFound = false;
    if(_layer.data[y1] === undefined || _layer.data[y1][x1] === undefined){ // 目标不存在?
        return false;
    }
    var curTile = _layer.data[y0][x0];//起始点
    var tarTile = _layer.data[y1][x1];//终点
    if(collideIndexes.indexOf(tarTile.index) > -1){ // 目标不可及?
        return false;
    }
    // roundTilesAll.push([curTile]);
    // excepts.push(curTile);
    // console.log(roundTilesAll);
    var step = 0;
    // var temp=[_layer.data[5][9],_layer.data[5][10],_layer.data[5][11],_layer.data[5][12],_layer.data[5][13],_layer.data[5][14],_layer.data[6][14]];
    var rounds =  [_layer.data[6][14],_layer.data[5][14],_layer.data[5][13],_layer.data[5][12],_layer.data[5][11],_layer.data[5][10],_layer.data[5][9]];
    while(rounds.length > 0){
        step ++;
        if(step > limit){
            break;
        }
        if(rounds.indexOf(tarTile) > -1){
            isFound = true;
            break;
        }
        // excepts = roundTilesAll[roundTilesAll.length - 1].concat();//连接数组
        roundTilesAll.push(rounds);
        //rounds = this._getRoundTiles(rounds, excepts, collideIndexes);
    }
    if(isFound){
        var tmpTile;
        var path = [];
        console.log(rounds.pop());
        path.push(_layer.data[5][10]);
        while(roundTilesAll.length > 1){
            rounds = roundTilesAll.pop();
            // if(tarTile.x > 0){
            //     tmpTile = _layer.data[tarTile.y][tarTile.x - 1];
            //     if(rounds.indexOf(tmpTile) != -1){
            //         path.push(tmpTile);
            //         tarTile = tmpTile;
            //         continue;
            //     }
            // }
            // if(tarTile.x < _layer.width-1){
            //     tmpTile = _layer.data[tarTile.y][tarTile.x + 1];
            //     if(rounds.indexOf(tmpTile) != -1){
            //         path.push(tmpTile);
            //         tarTile = tmpTile;
            //         continue;
            //     }
            // }
            // if(tarTile.y > 0){
            //     tmpTile = _layer.data[tarTile.y - 1][tarTile.x];
            //     if(rounds.indexOf(tmpTile) != -1){
            //         path.push(tmpTile);
            //         tarTile = tmpTile;
            //         continue;
            //     }
            // }
            // if(tarTile.y < _layer.height - 1){
            //     tmpTile = _layer.data[tarTile.y + 1][tarTile.x];
            //     if(rounds.indexOf(tmpTile) != -1){
            //         path.push(tmpTile);
            //         tarTile = tmpTile;
            //         continue;
            //     }
            // }

        }

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
    // var road= [_layer.data[5][9],_layer.data[5][10],_layer.data[5][11],_layer.data[5][12],_layer.data[5][13],_layer.data[5][14],_layer.data[6][14]];
    var road= [_layer.data[6][14],_layer.data[5][14],_layer.data[5][13],_layer.data[5][12],_layer.data[5][11],_layer.data[5][10],_layer.data[5][9]];
    var newRoundArray=[];

    var n=road.length;
for (var i=n;i>-1;i--){
    var a=road.pop();
    console.log(road.length);
    newRoundArray.push(a);
    // console.log(a)
    exceptTiles.push(a);

}
    // var newRoundArray=[_layer.data[6][9],_layer.data[7][9]];
    // var x;
    // var y;
    // var tmpTile;
    // for (var i = 0; i < roundTiles.length; i++){
    //     x = roundTiles[i].x;
    //     y = roundTiles[i].y;
    //     if(x > 0){
    //         tmpTile = _layer.data[y][x - 1];
    //         if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
    //             newRoundArray.push(tmpTile);
    //             exceptTiles.push(tmpTile);
    //         }
    //     }
    //     if(x<_layer.width - 1){
    //         tmpTile = _layer.data[y][x + 1];
    //         if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
    //             newRoundArray.push(tmpTile);
    //             exceptTiles.push(tmpTile);
    //         }
    //     }
    //     if(y>0){
    //         tmpTile = _layer.data[y - 1][x];
    //         if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
    //             newRoundArray.push(tmpTile);
    //             exceptTiles.push(tmpTile);
    //         }
    //     }
    //     if(y<_layer.height - 1){
    //         tmpTile = _layer.data[y + 1][x];
    //         if(collideIndexes.indexOf(tmpTile.index) == -1 && exceptTiles.indexOf(tmpTile) == -1){
    //             newRoundArray.push(tmpTile);
    //             exceptTiles.push(tmpTile);
    //         }
    //     }
    // }
    return newRoundArray;
};
Phaser.TilemapLayer.prototype._getRoundTiles = function(roundTiles, exceptTiles, collideIndexes){
    var _layer = this.layer;
    var newRoundArray = [];
    var x;
    var y;
    var tmpTile;
    for (var i = 0; i < roundTiles.length; i++){
        x = roundTiles[i].x;
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
    return newRoundArray;
};

