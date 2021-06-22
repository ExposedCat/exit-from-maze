# Exit from maze

Algorithm finding an exit from the given maze.

## Usage

```js
import { escapeMaze } from './index.js'

/*
  0 - start position
  # - wall
  + - way
*/
const maze = [
    ['#','#','#','#','#','#','#','#','#'],
    ['#','+','+','+','#','+','+','+','#'],
    ['#','+','#','+','#','+','#','+','#'],
    ['+','+','#','+','0','+','#','+','#'],
    ['#','#','#','+','#','#','#','#','#'],
    ['#','#','+','+','#','#','#','#','#'],
    ['#','#','+','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#'],
]
const exitPath = escapeMaze(maze)
// ['left', 'top', 'top', 'left', 'left', 'bottom', 'bottom', 'left']
```
Algorithm is adapted for situations with multiple exits (shows the nearest).  
There must only be one start point (otherwise the first point will be used).  
Exit code `1` means that start point is not specified.  
Exit code `2` means that the maze has no exit.  

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)