//class that is a 3x3 matrix
class Matrix3{

	constructor(list){
		this.array = [[list[0], list[1], list[2], list[3]],
					  [list[4], list[5], list[6], list[7]],
					  [list[8], list[9], list[10], list[11]]];
	}

	istriangular(){
		let ar = this.array;
		return (ar[1][0]===0 && ar[2][0]===0 && ar[2][1]===0)
	}
	makeelementzero(i, j){
		//this function takes an element and makes operations to turn
		//it into zero
		//returns a list [matrix, factor multiplied by]
		let el = JSON.parse(JSON.stringify(this.array[i][j]));
		let upel = JSON.parse(JSON.stringify(this.array[i-1][j]));
		let n_mat = JSON.parse(JSON.stringify(this.array));
		for (let j=0; j<n_mat[i].length; j++){
			n_mat[i][j] = n_mat[i-1][j] - n_mat[i][j]*upel/el;
		}
		return [new Matrix3(n_mat.flat()), upel/el];
	}

	triangulize(){
		let first = this.makeelementzero(2, 0)[0];
		let first_factor = this.makeelementzero(2, 0)[1];
		let second = first.makeelementzero(1, 0)[0];
		let second_factor = first.makeelementzero(1, 0)[1];
		let third = second.makeelementzero(2, 1)[0];
		let third_factor = second.makeelementzero(2, 1)[1];

		return [[first, second, third],[first_factor, second_factor, third_factor]]
	}
}

module.exports = {Matrix3};
