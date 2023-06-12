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
};
