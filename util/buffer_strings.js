'use strict';

//TODO: add unit tests
// Easy way to write a test is to convert a readable string to its code points. See:
// http://www.asciitable.com
// 'hello' -> [104, 101, 108, 108, 111]

function bufferToBinaryString(arrayBuffer){
	let str = '';
	let uint8Array = new Uint8Array(arrayBuffer);
	for (let i = 0 ; i < arrayBuffer.byteLength ; ++i)
		str += String.fromCharCode(uint8Array[i]);
	return str;
}

function binaryStringToBuffer(str){
	let arrayBuffer = new ArrayBuffer(str.length);
	let uint8Array = new Uint8Array(arrayBuffer);
	for (let i = 0 ; i < str.length ; ++i)
		uint8Array[i] = str.charCodeAt(i);
	return arrayBuffer;
}

module.exports = {bufferToBinaryString,binaryStringToBuffer};
