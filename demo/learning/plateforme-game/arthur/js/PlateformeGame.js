// PlateformeGame
// Eloquent JavaScript project
// Arthur Lehuen (aka) Mata_

const scale = 20;
const gravity = 30;
const maxStep = 0.05;

const playerXSpeed = 7;
const jumpSpeed = 17;

const wobbleSpeed = 8;
const wobbleDist = 0.07;

const maxLive = 3;

const ArrowCodes = {
	37: 'left',
	38: 'up',
	39: 'right',
	27: 'esc',
}

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(other) {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	times(factor) {
		return new Vector(this.x * factor, this.y * factor);
	}
}

class Player {
	constructor(pos) {
		this.pos = pos.plus(new Vector(0, -0.5));
		this.size = new Vector(0.8, 1.5);
		this.speed = new Vector(0, 0);
		this.type = 'player';
	}

	moveX(step, level, keys) {
		this.speed.x = 0;
		if (keys.left) this.speed.x -= playerXSpeed;
		if (keys.right) this.speed.x += playerXSpeed;

		const motion = new Vector(this.speed.x * step, 0);
		const newPos = this.pos.plus(motion);
		const obstacle = level.obstacleAt(newPos, this.size);
		obstacle ? level.playerTouched(obstacle) : this.pos = newPos;
	}

	moveY(step, level, keys) {
		this.speed.y += step * gravity;
		const motion = new Vector(0, this.speed.y * step);
		const newPos = this.pos.plus(motion);
		const obstacle = level.obstacleAt(newPos, this.size);

		if (obstacle) {
			level.playerTouched(obstacle);
			this.speed.y = (keys.up && this.speed.y > 0) ? -jumpSpeed : 0;
		} else {
			this.pos = newPos;
		}
	}

	act(step, level, keys) {
		this.moveX(step, level, keys);
		this.moveY(step, level, keys);

		const otherActor = level.actorAt(this);
		if (otherActor) level.playerTouched(otherActor.type, otherActor);

		if (level.status === 'lost') {
			this.pos.y += step;
			this.size.y -= step;
		}
	}
}

class Lava {
	constructor(pos, ch) {
		this.pos = pos;
		this.size = new Vector(1, 1);

		switch (ch) {
			case '=':
				this.speed = new Vector(2, 0);
				break;
			case '|':
				this.speed = new Vector(0, 2);
				break;
			case 'v':
				this.speed = new Vector(0, 3);
				this.repeatPos = pos;
				break;
		}

		this.type = 'lava';
	}

	act(step, level) {
		const newPos = this.pos.plus(this.speed.times(step));

		if (!level.obstacleAt(newPos, this.size)) this.pos = newPos;
		else if (this.repeatPos) this.pos = this.repeatPos;
		else this.speed = this.speed.times(-1);
	}
}

class Coin {
	constructor(pos, ch) {
		this.pos = pos.plus(new Vector(0.2, 0.1));
		this.basePos = pos;
		this.size = new Vector(0.6, 0.6);
		this.wobble = Math.random() * Math.PI * 2;
		this.type = 'coin';
	}

	act(step) {
		this.wobble += step * wobbleSpeed;
		const wobblePos = Math.sin(this.wobble) * wobbleDist;
		this.pos = this.basePos.plus(new Vector(0, wobblePos));
	}
}

const ActorChars = {
  '@': Player,
  'o': Coin,
  '=': Lava,
  '|': Lava,
  'v': Lava,
};

class Level {
	constructor(plan) {
		this.width = plan[0].length;
		this.height = plan.length;
		this.grid = [];
		this.actors = [];

		plan.forEach((line, y) => {
			const gridLine = [];
			Array.from(line).forEach((value, x) => {
				const actor = ActorChars[value];
				let fieldType = null;

				if (actor) this.actors.push(new actor(new Vector(x, y), value));
				else if (value === 'x') fieldType = 'wall';
				else if (value === '!') fieldType = 'lava';

				gridLine.push(fieldType)
			})

			this.grid.push(gridLine);
		});

		this.player = this.actors.filter((actor) => actor.type === 'player')[0];

		this.status = null;
		this.finishDelay = null;
	}

	isFinished() {
		return this.status != null && this.finishDelay < 0;
	}

	obstacleAt(pos, size) {
		const xStart = Math.floor(pos.x);
		const xEnd = Math.ceil(pos.x + size.x);
		const yStart = Math.floor(pos.y);
		const yEnd = Math.ceil(pos.y + size.y);

		if (xStart < 0 || xEnd > this.width || yStart < 0) return 'wall';
		if (yEnd > this.height) return 'lava';

		for (let y = yStart; y < yEnd; y++) {
			for (let x = xStart; x < xEnd; x++) {
				const fieldType = this.grid[y][x];
				if (fieldType) return fieldType;
			}
		}
	}

	actorAt(actor) {
		for (let i = 0; i < this.actors.length; i++) {
			const other = this.actors[i];
			if (other != actor
				&& actor.pos.x + actor.size.x > other.pos.x
				&& actor.pos.x < other.pos.x + other.size.x
				&& actor.pos.y + actor.size.y > other.pos.y
				&& actor.pos.y < other.pos.y + other.size.y)
				return other;
		}
	}

	animate(step, keys) {
		if (this.status != null) this.finishDelay -= step;

		while (step > 0) {
			const thisStep = Math.min(step, maxStep);
			this.actors.forEach((actor) => actor.act(thisStep, this, keys), this);
			step -= thisStep;
		}
	}

	playerTouched(type, actor) {
		if (type === 'lava' && this.status == null) {
			this.status = 'lost';
			this.finishDelay = 1;
		} else if (type === 'coin') {
			this.actors = this.actors.filter((other) => other != actor);
			if (!this.actors.some((actor) => actor.type === 'coin')) {
				this.status = 'won';
				this.finishDelay = 1;
			}
		}
	}
}

function elt(name, className) {
	let elt = document.createElement(name);
	if (className) elt.className = className;
	return elt;
}

class DOMDisplay {
	constructor(parent, level) {
		this.wrap = parent.appendChild(elt('div', 'game'));
		this.level = level;

		this.wrap.appendChild(this.drawBackground())
		this.actorLayer = null;
		this.drawFrame();
	}

	drawBackground() {
		const table = elt('table', 'background');
		table.style.width = this.level.width * scale + 'px';

		this.level.grid.forEach((raw) => {
			const rowElt = table.appendChild(elt('tr'));
			rowElt.style.height = scale + 'px';
			raw.forEach((type) => rowElt.appendChild(elt('td', type)));
		});

		return table;
	}

	drawActors() {
		const wrap = elt('div');
		this.level.actors.forEach((actor) => {
			const rect = wrap.appendChild(elt('div', `actor ${actor.type}`));
			rect.style.width = actor.size.x * scale + 'px';
			rect.style.height = actor.size.y * scale + 'px';
			rect.style.left = actor.pos.x * scale + 'px';
			rect.style.top = actor.pos.y * scale + 'px';
		});

		return wrap;
	}

	drawFrame() {
		if (this.actorLayer) this.wrap.removeChild(this.actorLayer);
		this.actorLayer = this.wrap.appendChild(this.drawActors());
		this.wrap.className = `game ${this.level.status || ' '}`;
		this.scrollPlayerIntoView();
	}

	scrollPlayerIntoView() {
		const width = this.wrap.clientWidth;
		const height = this.wrap.clientHeight;
		const margin = width / 3;

		const left = this.wrap.scrollLeft;
		const right = left + width;
		const top = this.wrap.scrollTop;
		const bottom = top + height;

		const player = this.level.player;
		const center = player.pos.plus(player.size.times(0.5)).times(scale);

		if (center.x < left + margin) this.wrap.scrollLeft = center.x - margin;
		else if (center.x > right - margin) this.wrap.scrollLeft = center.x + margin - width;

		if (center.y < top + margin) this.wrap.scrollTop = center.y - margin;
		else if (center.y > bottom - margin) this.wrap.scrollTop = center.y + margin - height;
	}

	clear() {
		this.wrap.parentNode.removeChild(this.wrap);
	}
}

function trackKeys(codes) {
	const pressed = {};

	const handler = function(event) {
		if (codes[event.keyCode]) {
			const down = event.type === 'keydown';
			pressed[codes[event.keyCode]] = down;
			event.preventDefault();
		}
	}

	addEventListener('keydown', handler);
	addEventListener('keyup', handler);

	return pressed;
}

const arrows = trackKeys(ArrowCodes);

function runAnimation(frameFunc) {
	let lastTime = null;
	const frame = function(time) {
		let stop = false;
		if (lastTime != null) {
			const timeStep = Math.min(time - lastTime, 100) / 1000;
			stop = frameFunc(timeStep) === false;
		}
		lastTime = time;
		if (!stop)
			requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);
}

function runLevel(level, Display, andThen) {
	const display = new Display(document.body, level);
	let pause = false;
	runAnimation((step) => {
		if (arrows.esc) pause = !pause;

		if (!pause) {
			level.animate(step, arrows);
			display.drawFrame(step);
			if (level.isFinished()) {
				display.clear()
				if (andThen)
					andThen(level.status);
				return false;
			}
		}
	});
}

function runGame(plans, Display) {
	let currentLive = maxLive;
	const startLevel = function(n) {
		if (currentLive <= 0) {
			console.log('You loose !');
			return;
		}
		runLevel(new Level(plans[n]), Display, (status) => {
			if (status === 'lost') {
				currentLive--;
				startLevel(n);
			} else if (n < plans.length - 1) startLevel(n + 1);
			else console.log('You win !');
		})
	}

	startLevel(0);
}