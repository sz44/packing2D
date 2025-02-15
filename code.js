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

	// dont go deeper if box no longer fits
	if (node.width < box.width || node.height < box.height) {
		// console.log("dosent fit: ", box, [node.width, node.height]);
		// check if rotating would fit
		if (node.width >= box.height && node.height >= box.width) {
			// console.log("rotating", box);
			// rotate
			let temp = box.width;
			box.width = box.height;
			box.height = temp;
		} else {
			return false;
		}
	}

	if (node.box) {
		return insert(node.right, box) || insert(node.left, box);
	}

	// insert and split
	console.log(`inserting box: ${box}`);
	node.box = box;
	const remainingWidth = node.width - box.width;
	const remainingHeight = node.height - box.height;
	if (remainingWidth > 0) {
		node.right = new TreeNode(node.x + box.width, node.y, remainingWidth, box.height);
	}
	if (remainingHeight > 0) {
		node.left = new TreeNode(node.x, node.y + box.height, node.width, remainingHeight);
	}

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
	let padding = 4;

	noStroke();
	fill("#FFFFFF");
	rect(node.x, node.y, node.box.width, node.box.height);

	stroke("#000000");
	fill(node.box.color);
	rect(node.x+padding, node.y+padding, node.box.width-2*padding, node.box.height-2*padding);

	drawTree(node.left);
	drawTree(node.right);
}

const boxes = [
	{width:10, height:30, color:'red'},
	{width:20, height:20, color:'green'},
	{width:50, height:10, color:'blue'},
	{width:10, height:30, color:'red'},
	{width:10, height:30, color:'red'},
	{width:20, height:20, color:'green'},
	{width:50, height:10, color:'blue'},
	{width:10, height:30, color:'red'},
	{width:50, height:70, color:'blue'},
	{width:50, height:70, color:'blue'},
	{width:20, height:20, color:'green'},
	{width:350, height:60, color:'#a591b9'},
	{width:50, height:90, color:'orange'},
	{width:300, height:190, color:'black'},
	{width:150, height:140, color:'#b100FF'},
	{width:50, height:40, color:'#b100FF'},
	{width:60, height:80, color:'#b100FF'},
	{width:70, height:170, color:'#b100FF'},
	{width:120, height:130, color:'#b100FF'},
	{width:180, height:210, color:'#aaaaaa'},
	{width:180, height:210, color:'#aaaaaa'},
	{width:310, height:180, color:'#aaaaaa'},

];

boxes.sort((a,b) => (b.width  * b.height) - (a.width * a.height));

const rootNode = new TreeNode(0, 0, 400, 400);

function setup() {
	createCanvas(400, 400);
	background(255);

	for (let box of boxes) {
		insert(rootNode, box);
	}

	console.log(rootNode);
	drawTree(rootNode);	
}

function draw() {
}
