'use strict';

module.exports = function (source) {

    var count = 0;
	var codeCount = 0;
	var indentCount = 0;
	var s0 = (source.match(/([`])\1*/g)||[]);
	if(s0!=null)
	{
		count = s0.length;
	}
	var s1 = (source.match(/<code>/g));
	if(s1!=null)
	{
	 codeCount = s1.length;
	}
	var s2 = (source.match(/( {4})\1*/g));
	console.log(s2);
	if(s2!=null)
	{
		//problem with indentation count, considering each line of code which is indented
		indentCount = s2.length;
	}
	console.log("backtick Count", count/2);
	console.log("code block count",codeCount);
	console.log("indent Count", indentCount);
	count = count/2 + codeCount + indentCount;
	return count;
}