const Node = (data, right = null, left = null) => {
	return { data, right, left };
};

const Tree = (arr) => {
	if (arr.length <= 0) return arr;

	//Sort the array and remove the duplicates
	const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);

	const leftID = 0;
	const rightID = sortedArr.length - 1;

	const root = buildTree(sortedArr, leftID, rightID);

	//Build balanced BST
	function buildTree(arr, l, r) {
		if (l > r) return null;

		let mid = Math.floor((l + r) / 2);

		let root = Node(mid, l, r);

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
	}

	//Remove node from the tree
	function deleteNode(x, node = root) {
		if (node === null) return node;

		if (x < node.data) {
			node.left = deleteNode(x, node.left);
		} else if (x > node.data) node.right = deleteNode(x, node.right);
		else if (x === node.data) {
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
};
