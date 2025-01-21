
class Rect {
	constructor(x, y, width, height, color = "red") {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw() {
		fill(this.color);
		rect(0, 0, this.width, this.height);
	}
}


class TreeNode {
	constructor(x, y, width, height, left = null, right = null) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.box = null;
		this.left = left;
		this.right = right;
	}
}

const rootNode = new TreeNode(0, 0, 400, 400);

function insert(node, box) {
	if (!node) {
		return false;
	}
	// returning too early
	if (node.width < box[0] || node.height < box[1]) {
		return false;
	}
	if (node.box) {
		if (insert(node.left, box)) {
			return true;
		}
		if (insert(node.right, box)) {
			return true;
		}
		return false;
	}

	// insert and split
	console.log(`inserting box: ${box}`);
	node.box = box;
	node.left = new TreeNode(node.x + box[0], node.y, node.width - box[0], box[1]);
	node.right = new TreeNode(node.x, node.y + box[1], node.width, node.height - box[1]);

	return true;
}

function drawTree(node) {
	if (!node) {
		return;
	}
	// draw node area
	fill("#dddddd");
	console.log(`drawing area: ${node.x} ${node.y} ${node.width} ${node.height}`);
	rect(node.x, node.y, node.width, node.height);

	if (!node.box) {
		return;
	}

	fill(node.box[2]);
	rect(node.x, node.y, node.box[0], node.box[1]);
	drawTree(node.left);
	drawTree(node.right);
}

function test() {
	fill('#a5f1b9');
	rect(0,0,400,400);
}

const boxes = [
	[10, 30, 'red'],
	[20, 20, 'green'],
	[50, 10, 'blue'],
	[10, 30, 'red'],
	[50, 70, 'blue'],
	[50, 70, 'blue'],
	[20, 20, 'green'],
];

// let boxAreas = boxes.map( (box, i) => [box[0]*box[1], i]);
// boxAreas.sort((a,b) => b[0] - a[0]);
boxes.sort((a,b) => (b[0]  * b[1]) - (a[0] * a[1]));

function setup() {
	createCanvas(400, 400);
	background(240);
	// fill('#a5f1b9');
	// noStroke();
	// rect(100,100,100,100);
	// test();
	// for (let [area, ind] of boxAreas) {
	// 	insert(rootNode, boxes[ind])
	// }
	for (let box of boxes) {
		insert(rootNode, box);
	}
	console.log(rootNode);
	drawTree(rootNode);	
}

function draw() {
	// background(220);
	// drawTree(rootNode);	
}
