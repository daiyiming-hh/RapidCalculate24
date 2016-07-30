function Calculate24(nums) {
	var array = new Array(nums[0], nums[1], nums[2], nums[3]);
	var symbols = new Array("+", "-", "*", "/");

	var dfs = function(sum, next, index) {
		if (index == 3) {
			for (var i = 0; i < symbols.length; i ++) {
				var expression = sum + symbols[i] + next;
				if (parseFloat(eval(expression)) == 24) {
					return expression;
				}
			}
			return null;
		}
		// 先计算前半部分
		for (var i = 0; i < symbols.length; i ++) {
			var expression = null;
			if (expression = dfs("(" + sum + symbols[i] + next + ")", array[index + 1], index + 1)) {
				return expression;
			}
			if (expression = dfs(sum, "(" + next + symbols[i] + array[index + 1] + ")", index + 1)) {
				return expression;
			}
		}
		return null;
	}

	var swap = function(index1, index2) {
		var tem = array[index1];
		array[index1] = array[index2];
		array[index2] = tem;
	}

	var fullSort = function(index) {
		if (index >= array.length - 1) {
			return dfs(array[0], array[1], 1);
		}
		for (var i = index; i < array.length; i ++) {
			swap(i, index);
			var expression = null;
			if ((expression = fullSort(index + 1)) != null) {
				return expression;
			}
			swap(i, index);
		}
		return null;
	}

	this.getExpression = function() {
		return fullSort(0);
	}
}