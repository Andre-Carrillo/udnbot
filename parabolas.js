var algebra = require('algebra.js');
function toFraction(exp){
	let strin = exp.toString();
	if (!strin.includes("/")){
		return parseInt(strin)
	}
	let parts = strin.split('/');
	return parseInt(parts[0])/parseInt(parts[1]);
}
class Parabola{
	constructor(str){
		this.eq = algebra.parse(str);
		console.log(this.eq.toString())
		this.ansfy = this.eq.solveFor('y');
		console.log(this.ansfy)
		this.c = this.ansfy.eval({x:0});
		let aplusb = this.ansfy.eval({x:1}).subtract(this.c);
		let a2plusb = this.ansfy.eval({x:2}).subtract(this.c).divide(2);
		this.a = a2plusb.subtract(aplusb);
		this.b = aplusb.subtract(this.a);
		let av = toFraction(this.a);
		let bv = toFraction(this.b);
		let cv = toFraction(this.c);
		let p_ = 1/(4*av)
		let h_ = bv/(-2*av);
		let k_ = cv - h_*h_/(4*p_) 
		this.info = {
			a:this.a.toString(),
			b:this.b.toString(),
			c:this.c.toString(),
			p:p_,
			h:h_,
			k:k_
		}
	}
}

module.exports = {Parabola}
