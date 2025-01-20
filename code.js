function setup() {
	createCanvas(400, 400);
}

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


const boxes = [
	[10, 30, 'red'],
	[20, 20, 'green']
];

class TreeNode {
	constructor(x, y, width, height, left = null, right = null) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.box = null;
		this.left = left;
		this.right = rigth;
	}
}

//const rootArea = new Rect(0,0,400,400);
const rootNode = new Tree(0, 0, 400, 400);

function fillBox() {
	for (let box in boxes) {
		// traverse tree (dfs for smallest first) trying to insert
		insert(rootNode, box)
	}
}

function insert(node, box) {
	if (!node) {
		return false;
	}
	if (node.width * node.height < box.width * box.height) {
		return false;
	}
	if (root.filled) {
		if (insert(node.left, box)) {
			return true;
		}
		if (insert(node.right, box)) {
			return true;
		}
		return false;
	}
	// insert and split

	node.box = box;
	node.left = new TreeNode(box.width, node.y, node.width - box.width, box.height);
	node.right = new TreeNode(node.x, box.height, box.width, node.height - box.height);


}

function draw() {
	background(220);
	for (let box of boxes) {
		box.draw()
	}
}
