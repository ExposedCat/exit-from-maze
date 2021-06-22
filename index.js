import {
    mapIcons
} from './utils.js'

function escapeMaze(maze) {
    const start = getStartPoint(maze)
    if (isEnd(maze, start)) {
        return []
    }
    initializePhase(maze, start)
    const end = spreadPhase(maze, start)
    return pathRecovery(maze, end)
}

function getStartPoint(maze) {
    for (const row in maze) {
        for (const column in maze[row]) {
            if (maze[row][column] === mapIcons.startPosition) {
                return ({
                    x: Number(column),
                    y: Number(row)
                })
            }
        }
    }
    console.error('Error: Start position is not found')
    process.exit(1)
}

function isEnd(maze, point) {
    return point.x === 0 || point.x === maze[0].length - 1 || point.y === 0 || point.y === maze.length - 1
}

function initializePhase(maze, start) {
    maze[start.y][start.x] = 0
}

function spread(maze, point) {
    let exit = false
    let spreadQueue = []
    for (const offset of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const newPoint = {
            x: point.x + offset[0],
            y: point.y + offset[1],
            d: point.d + 1
        }
        if (maze[newPoint.y] && maze[newPoint.y][newPoint.x]) {
            if (maze[newPoint.y][newPoint.x] === mapIcons.way) {
                maze[newPoint.y][newPoint.x] = newPoint.d
                spreadQueue.push(newPoint)
                if (isEnd(newPoint)) {
                    exit = newPoint
                }
            }
        }
    }
    return {
        exit,
        newPoints: spreadQueue
    }
}

function spreadPhase(maze, start) {
    start.d = 0
    let exitPoint = false
    let spreadQueue = [[start]]
    while (!exitPoint) {
        const nextPointPack = spreadQueue.shift()
        for (const nextPoint of nextPointPack) {
            const { newPoints, exit } = spread(maze, nextPoint)
            if (exit) {
                exitPoint = exit
            }
            spreadQueue.push(newPoints)
        }
        if (!spreadQueue.length && !exitPoint) {
            console.error('Error: Maze has no exit')
            process.exit(2)
        }
    }
    return exitPoint
}

function getLowestNeighbour(maze, point, d = point.d - 1) {
    let lowest = 0
    if (maze[point.y] && maze[point.y][point.x - 1] === d) {
        lowest = {
            x: point.x - 1,
            y: point.y,
            d: d
        }
    } else if (maze[point.y] && maze[point.y][point.x + 1] === d) {
        lowest = {
            x: point.x + 1,
            y: point.y,
            d: d
        }
    } else if (maze[point.y - 1] && maze[point.y - 1][point.x] === d) {
        lowest = {
            x: point.x,
            y: point.y - 1,
            d: d
        }
    } else if (maze[point.y + 1] && maze[point.y + 1][point.x] === d) {
        lowest = {
            x: point.x,
            y: point.y + 1,
            d: d
        }
    }
    if (!lowest) {
        return getLowestNeighbour(maze, point, d + 1)
    }
    return lowest
}

function pathRecovery(maze, end) {
    let path = []
    let currentPoint = end
    while (currentPoint.d !== 0) {
        path.unshift(currentPoint)
        currentPoint = getLowestNeighbour(maze, currentPoint)
    }
    return stringifyPath(currentPoint, path)
}

function stringifyPath(start, path) {
    let stringPathList = []
    let currentPoint = start
    for (const nextPoint of path) {
        if (nextPoint.x - currentPoint.x === 1) {
            stringPathList.push('right')
        } else if (nextPoint.x - currentPoint.x === -1) {
            stringPathList.push('left')
        } else if (nextPoint.y - currentPoint.y === 1) {
            stringPathList.push('bottom')
        } else if (nextPoint.y - currentPoint.y === -1) {
            stringPathList.push('top')
        }
        currentPoint = nextPoint
    }
    return stringPathList.join(' - ')
}

export { escapeMaze }