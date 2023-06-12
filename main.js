const Node = (data, right = null, left = null) => {
	return { data, right, left };
};

const Tree = (arr) => {
	if (arr.length <= 0) return arr;

	//Sort the array and remove the duplicates
	const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);

	const leftID = 0;
	const rightID = sortedArr.length - 1;

	let root = buildTree(sortedArr, leftID, rightID);

	//Build a balanced BST
	function buildTree(arr, l, r) {
		if (l > r) return null;

		let mid = Math.floor((l + r) / 2);

		let root = Node(arr[mid]);

		root.left = buildTree(arr, l, mid - 1);
		root.right = buildTree(arr, mid + 1, r);

		return root;
	}

	//Insert node into the tree
	function insert(x, node = root) {
		if (node === null) {
			node = Node(x);
			return node;
		} else if (x < node.data) node.left = insert(x, node.left);
		else node.right = insert(x, node.right);
		return node;
	}

	//Remove node from the tree
	function deleteNode(x, node = root) {
		if (node === null) return node;

		if (x < node.data) {
			node.left = deleteNode(x, node.left);
		} else if (x > node.data) node.right = deleteNode(x, node.right);
		else if (x == node.data) {
			if (node.left === null && node.right === null) return null;

			//Node with one child
			if (node.left === null) return node.right;
			else if (node.right === null) return node.left;

			node.data = minValue(node.right);

			node.right = deleteNode(node.data, node.right);
		}

		return node;
	}
	function minValue(node) {
		let minVal = node.data;
		while (node.left != null) {
			minVal = node.left.data;
			node = node.left;
		}
		return minVal;
	}

	//Find the node in the tree with the value of x
	function find(x, node = root) {
		if (x == node.data) return node;
		else if (x < node.data) return find(x, node.left);
		else if (x > node.data) return find(x, node.right);
		else {
			console.log(`Number ${x} does not exist in the tree`);
			return null;
		}
	}

	//LevelOrder traversal
	function levelOrder(node = root) {
		if (node === null) return node;
		let result = [],
			que = [],
			res;
		que.push(node);
		while (que.length > 0) {
			curr = que.shift();
			result.push(curr.data);
			if (curr.left !== null) que.push(curr.left);
			if (curr.right !== null) que.push(curr.right);
		}
		return result;
	}

	//Inorder traversal
	function inOrder(node = root) {
		if (node === null) return node;
		let result = [];
		function traverse(node) {
			if (node.left !== null) traverse(node.left);
			result.push(node.data);
			if (node.right !== null) traverse(node.right);
		}
		traverse(node);
		return result;
	}

	//Preorder traversal
	function preOrder(node = root) {
		if (node === null) return node;
		let result = [];
		function traverse(node) {
			result.push(node.data);
			if (node.left !== null) traverse(node.left);
			if (node.right !== null) traverse(node.right);
		}
		traverse(node);
		return result;
	}

	//Postorder traversal
	function postOrder(node = root) {
		if (node === null) return node;
		let result = [];
		function traverse(node) {
			if (node.left !== null) traverse(node.left);
			if (node.right !== null) traverse(node.right);
			result.push(node.data);
		}
		traverse(node);
		return result;
	}

	//Height of the node
	function height(x) {
		const foundNode = find(x);
		if (foundNode) return nodeHeight(foundNode);
		else console.error('Invalid node');
	}
	function nodeHeight(node) {
		if (node === null) return -1;
		return 1 + Math.max(nodeHeight(node.left), nodeHeight(node.right));
	}

	//Depth of the node
	function depth(x) {
		let foundNode = find(x);
		if (foundNode) {
			return nodeDepth(foundNode);
		} else console.error('Invalid node');
	}
	function nodeDepth(x, node = root, counter = 0) {
		if (x.data < node.data) return nodeDepth(x, node.left, counter + 1);
		else if (x.data > node.data) return nodeDepth(x, node.right, counter + 1);
		else if (x == node) return counter;
	}

	//Check if tree is balanced
	function isBalanced(node = root) {
		let diff,
			left = height(node.left.data),
			right = height(node.right.data);
		if (left > right) diff = left - right;
		else if (left < right) diff = right - left;
		else return true;
		if (diff <= 1) return true;
		else return false;
	}

	//Rebalance the tree
	function reBalance() {
		if (!isBalanced()) {
			let arr = inOrder();
			root = buildTree(arr, 0, arr.length - 1);
			return;
		} else return `The tree is already balanced`;
	}

	//Function that prints the tree in a structured format
	const prettyPrint = (node = root, prefix = '', isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	};

	return {
		insert,
		deleteNode,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		height,
		depth,
		isBalanced,
		reBalance,
		prettyPrint,
	};
};

let a = [100, 200, 12, 1, 20, 300, 10, 22, 11, 13];

let tree = Tree(a);
tree.prettyPrint();
tree.insert(131);
tree.insert(121);
tree.insert(111);
tree.insert(113);
tree.insert(112);
tree.prettyPrint();
// tree.deleteNode(333);
// tree.prettyPrint();
console.log(`levelorder traversal : ${tree.levelOrder()}`);
console.log(`inorder traversal : ${tree.inOrder()}`);
console.log(`preorder traversal : ${tree.preOrder()}`);
console.log(`postorder traversal : ${tree.postOrder()}`);

tree.height(13);
console.log(`Depth of 300 is : ${tree.depth(300)}`);
console.log(`Is this tree balanced : ${tree.isBalanced()}`);
tree.reBalance();
tree.prettyPrint();
console.log(`Is this tree balanced now : ${tree.isBalanced()}`);
