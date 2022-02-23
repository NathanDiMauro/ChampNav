import { getByPlaceholderText } from '@testing-library/dom';
import React from 'react';
import {AStar} from '../data/astar';

class AstarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
          START_NODE_ROW: 3,
          START_NODE_COL: 2,
          FINISH_NODE_ROW: 0,
          FINISH_NODE_COL: 0,
          ROW_COUNT: 5,
          COL_COUNT: 5
        };
    }
    createNode = (row, col) => {
        return {
          row,
          col,
          isStart:
            row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
          isFinish:
            row === this.state.FINISH_NODE_ROW &&
            col === this.state.FINISH_NODE_COL,
          distance: Infinity,
          distanceToFinishNode:
            Math.abs(this.state.FINISH_NODE_ROW - row) +
            Math.abs(this.state.FINISH_NODE_COL - col),
          isVisited: false,
          isWall: false,
          previousNode: null,
          isNode: true,
        };
    };

    getInitialGrid(rowCount, colCount){
        const initialGrid = [];
        for (let row = 0; row < rowCount; row++) {
          const currentRow = [];
          for (let col = 0; col < colCount; col++) {
            currentRow.push(this.createNode(row, col));
          }
          initialGrid.push(currentRow);
        }
        return initialGrid;
    }

    // starts with last node
    getPath(node){
        // create list for the path
        let path = [];

        // end condition
        if (node.isStart){
            path.push(node);
            return path;
        }

        // combine current path and new node
        path = path.concat(this.getPath(node.previousNode));
        path.push(node);

        // return the path
        return path
    }

    render() {
        // set up the grid
        const grid = this.getInitialGrid(this.state.ROW_COUNT, this.state.COL_COUNT);
        
        // perfomr astar
        let astar = AStar(grid, grid[this.state.START_NODE_ROW][this.state.START_NODE_COL], grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL])

        // create the path list
        let path = [];

        // get the path starting with end
        for (const index in astar){
            if (astar[index].isFinish){
                path = this.getPath(astar[index]);
            }
        }
        
        // display the path
        // console.log("The path is: ")
        // for (const node in path){
        //     console.log(path[node].row, path[node].col);
        // }

        return (
            <h1>Astar loaded</h1>
        )
    }
}

export default AstarComponent