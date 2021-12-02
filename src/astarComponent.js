import React from 'react';
import {AStar} from './astar';

class AstarComponent extends React.Component {
    render() {
        console.log("Rendering Astar...");

        const grid = [[1,2,3],
                      [4,5,6],
                      [7,8,9]];

        console.log(AStar(grid, grid[0][0], grid[2][2]));

        return (
            <h1>Astar loaded</h1>
        )
    }
}

export default AstarComponent