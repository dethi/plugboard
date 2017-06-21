import Vector from './vector';

const manhattanDist = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

export default class Pathfinding {
  constructor(grid) {
    this.grid = grid;
  }

  findPath(tstart, tgoal) {
    const start = new Vector(tstart.x, tstart.y);
    const goal = new Vector(tgoal.x, tgoal.y);

    if (!this.grid.isFree(start) || !this.grid.isFree(goal)) return [];

    const closed = [];
    const open = [start];

    const scores = {};

    scores[this.vectToId(start)] = manhattanDist(start, goal);

    while (open.length) {
      const current = this.minScore(open, scores);

      if (current.equals(goal)) return this.constructPath(current, goal);
      closed.push(current);
      open.splice(open.indexOf(current), 1);

      const neighbors = this.getNeighbors(current);

      for (let i = 0; i < neighbors.length; i++) {
        if (closed.indexOf(neighbors[i]) === -1) {
          scores[this.vectToId(neighbors[i])] = manhattanDist(
            neighbors[i],
            goal
          );

          neighbors[i].parent = current;
          open.push(neighbors[i]);
        }
      }
    }

    return [];
  }

  vectToId(vect) {
    return vect.x * this.grid.sizeX + vect.y;
  }

  minScore(open, scores) {
    let min = Number.MAX_SAFE_INTEGER;
    let minVect = 0;

    open.forEach(vect => {
      const id = this.vectToId(vect);

      if (min > scores[id]) {
        min = scores[id];
        minVect = vect;
      }
    });

    return minVect;
  }

  getNeighbors(a) {
    const neighbors = [];

    const westNeighbor = a.add(1, 0);
    if (this.grid.isFree(westNeighbor)) neighbors.push(westNeighbor);

    const topNeighbor = a.add(0, -1);
    if (this.grid.isFree(topNeighbor)) neighbors.push(topNeighbor);

    const bottomNeighbor = a.add(0, 1);
    if (this.grid.isFree(bottomNeighbor)) neighbors.push(bottomNeighbor);

    const eastNeighbor = a.add(-1, 0);
    if (this.grid.isFree(eastNeighbor)) neighbors.push(eastNeighbor);

    return neighbors;
  }

  constructPath(node, goal) {
    const pathBrut = [goal];
    while (node.parent) {
      node = node.parent;
      pathBrut.push(node);
    }

    const path = pathBrut.reverse();

    if (path.length < 2) return path;

    const compressed = [];
    let start = path[0];
    let next = path[1];
    let last;

    let dx = next.x - start.x;
    let dy = next.y - start.y;
    let ldx;
    let ldy;

    // normalize the direction
    let sq = Math.sqrt(dx * dx + dy * dy);
    dx /= sq;
    dy /= sq;

    // store the first point
    compressed.push(start);

    for (let i = 2; i < path.length; i++) {
      last = next;
      ldx = dx;
      ldy = dy;

      next = path[i];

      dx = next.x - last.x;
      dy = next.y - last.y;

      // normalize
      sq = Math.sqrt(dx * dx + dy * dy);
      dx /= sq;
      dy /= sq;

      // if the direction has changed, store the point
      if (dx !== ldx || dy !== ldy) {
        compressed.push(last);
      }
    }

    // store the last point
    compressed.push(next);

    return compressed;
  }
}

/*
while not open.is_empty do
    -- find node with minimum f
    current = min(open, function(node) return score_of[node] end)
    if current == goal then
        --reconstruct the path to goal
        return create_path(current)
    end
    closed.add(current)
    open.remove(current)

    for neighbor in current:neighbors() do
        if not closed.contains(neighbor) then
            --calculate the heuristics for neighboring node
            score_of[node] = calculate_heuristics(neighbor)
            --add neighboring node to open set
            open.add(neighbor)
        end
    end
end*/
