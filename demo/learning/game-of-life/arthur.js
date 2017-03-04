// Electronic Life
// Eloquent JavaScript project
// Arthur Lehuen (aka) Mata_

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(other) {
		return new Vector(this.x + other.x, this.y + other.y);
	}
}

class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.space = [width * height];
	}

	isInside(vector) {
		return vector.x >= 0
			&& vector.x < this.width
			&& vector.y >= 0
			&& vector.y < this.height;
	}

	get(vector) {
		return this.space[vector.x + this.width * vector.y];
	}

	set(vector, value) {
		this.space[vector.x + this.width * vector.y] = value;
	}

	forEach(func, context) {
		for (let y = 0; y < this.height; y++)
			for (let x = 0; x < this.width; x++) {
				const value = this.space[x + this.width * y];
				if (value !== null)
					func.call(context, value, new Vector(x, y));
			}
	}
}

const directions = {
	n:  new Vector( 0, -1),
	ne: new Vector( 1, -1),
	e:  new Vector( 1,  0),
	se: new Vector( 1,  1),
	s:  new Vector( 0,  1),
	sw: new Vector(-1,  1),
	w:  new Vector(-1,  0),
	nw: new Vector(-1, -1),
}

const directionNames = 'n ne e se s sw w nw'.split(' ');

function elementFromChar(legend, ch) {
	if (ch === ' ') return null;
	const element = new legend[ch]();
	element.originChar = ch;
	return element;
}

function charFromElement(element) {
	return (element === null) ? ' ' : element.originChar;
}

function dirPlus(dir, n) {
	return directionNames[(directionNames.indexOf(dir) + n + 8) % 8];
}

function randomElementInArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}

class BouncingCritter {
	constructor() {
		this.energy = 20;
		this.direction = randomElementInArray(directionNames);
	}

	act(view) {
		if (view.look(this.direction) != ' ')
    		this.direction = view.find(' ') || ' ';

		const space = this.direction;
		if (this.energy > 60 && space) return { type: 'reproduce', direction: space };

		const plants = view.findAll('*');
		if (plants
			&& this.energy < 60
			&& plants.length >= 2) {
			return { type: 'eat', direction: randomElementInArray(plants) };
		}

		if (space) return { type: 'move', direction: space };
	}
}

class Tiger {
	constructor() {
		this.energy = 40;
	}


	act(view) {
		const space = view.find(' ');
		if (this.energy > 80 && space) return { type: 'reproduce', direction: space };

		const critter = view.find('O');
		if (critter) return { type: 'eat', direction: critter };

		if (space) return { type: 'move', direction: space };
	}
}

class Plant {
	constructor() {
		this.energy = 3 + Math.random() * 4;
	}

	act(view) {
		if (this.energy > 15) {
			const space = view.find(' ');
			if (space) return { type: 'reproduce', direction: space };
		}

		if (this.energy < 20) return { type: 'grow' };
	}
}

class ActionTypes {
	static grow(critter) {
		critter.energy += 0.5;
		return true;
	}

	static move(critter, vector, action) {
		const dest = this.checkDestination(action, vector);
		if (dest === null
			|| critter.energy <= 1
			|| this.grid.get(dest) !== null) {
			return false
		}

		critter.energy -= 1;
		this.grid.set(vector, null);
		this.grid.set(dest, critter);
		return true;
	}

	static eat(critter, vector, action) {
		const dest = this.checkDestination(action, vector);
		const atDest = dest !== null && this.grid.get(dest);
		if (!atDest || atDest.energy == null) {
			return false;
		}

		critter.energy += atDest.energy;
		this.grid.set(dest, null);
		return true;
	}

	static reproduce(critter, vector, action) {
		const baby = elementFromChar(this.legend, critter.originChar);
		const dest = this.checkDestination(action, vector);
		if (dest == null
			|| critter.energy <= 2 * baby.energy
			|| this.grid.get(dest) !== null) {
			return false;
		}

		critter.energy -= 2 * baby.energy;
		this.grid.set(dest, baby);
		return true;
	}
}

class Wall {}

class World {
	constructor(map, legend) {
		this.grid = new Grid(map[0].length, map.length);
		this.legend = legend;

		map.forEach((line, y) =>
			Array.from(line).forEach((value, x) => {
				this.grid.set(new Vector(x, y), elementFromChar(legend, value));
			})
		);
	}

	turn() {
		const acted = [];
		this.grid.forEach((critter, vector) => {
			if (critter.act && acted.indexOf(critter) === -1) {
				acted.push(critter);
				this.letAct(critter, vector);
			}
		}, this);
	}

	letAct(critter, vector) {
		const action = critter.act(new View(this, vector));
		const handled = action
			&& action.type in ActionTypes
			&& ActionTypes[action.type].call(this, critter, vector, action);

		if (!handled) {
			critter.energy -= 0.2;
			if (critter.energy <= 0) this.grid.set(vector, null);
		}
	}

	checkDestination(action, vector) {
		if (directions[action.direction] !== null) {
			const dest = vector.plus(directions[action.direction]);
			if (this.grid.isInside(dest)) return dest;
		}
	}

	toString() {
		let output = '';

		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++)
				output += charFromElement(this.grid.get(new Vector(x, y)));
			output += '\n';
		}

		return output;
	}
}

class View {
	constructor(world, vector) {
		this.world = world;
		this.vector = vector;
	}

	look(dir) {
		const target = this.vector.plus(directions[dir]);
		return (this.world.grid.isInside(target)) ? charFromElement(this.world.grid.get(target)) : '#';
	}

	findAll(ch) {
		const found = [];
		for (let dir in directions)
			if (this.look(dir) == ch) found.push(dir);
		return found;
	}

	find(ch) {
		const found = this.findAll(ch);
		return (found.length === 0) ? null : randomElementInArray(found)
	}
}

const plan =
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"];

const world = new World(
	plan, {
		'#': Wall,
		'*': Plant,
		'@': Tiger,
		'O': BouncingCritter,
	}
);

for (let i = 0; i < 5; i++) {
	world.turn();
}