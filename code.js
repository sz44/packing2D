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


function insert(node, box) {
	if (!node) {
		return false;
	}
	if (node.width < box.width || node.height < box.height) {
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
	node.left = new TreeNode(node.x + box.width, node.y, node.width - box.width, box.height);
	node.right = new TreeNode(node.x, node.y + box.height, node.width, node.height - box.height);

	return true;
}

function drawTree(node) {
	if (!node) {
		return;
	}
	// draw node area
	// fill("#dddddd");
	// console.log(`drawing area: ${node.x} ${node.y} ${node.width} ${node.height}`);
	// rect(node.x, node.y, node.width, node.height);

	if (!node.box) {
		return;
	}

	fill(node.box.color);
	rect(node.x, node.y, node.box.width, node.box.height);
	drawTree(node.left);
	drawTree(node.right);
}

const boxes = [
	{width:10, height:30, color:'red'},
	{width:20, height:20, color:'green'},
	{width:50, height:10, color:'blue'},
	{width:10, height:30, color:'red'},
	{width:50, height:70, color:'blue'},
	{width:50, height:70, color:'blue'},
	{width:20, height:20, color:'green'},
	{width:350, height:60, color:'#a591b9'},
];

boxes.sort((a,b) => (b.width  * b.height) - (a.width * a.height));

const rootNode = new TreeNode(0, 0, 400, 400);

function setup() {
	createCanvas(400, 400);
	background(240);

	for (let box of boxes) {
		insert(rootNode, box);
	}

	console.log(rootNode);
	drawTree(rootNode);	
}

function draw() {
}
