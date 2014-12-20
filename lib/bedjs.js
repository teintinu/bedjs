function BED() {
	function serialize(data) {

		var arrbuf = new ArrayBuffer(1024);
		var buf = new Uint8Array(arrbuf);

		var buffers = null;
		var stack = [data];
		var r;
		var i = 0;
		while (stack.length > 0) {
			var data = stack.pop();
			if (typeof data === 'object') {
				r = data;
				buf[i++] = 0xC0;
			} else
				throw "TODO"
		}
		var r = new Uint8Array(arrbuf, 0, i);
		return r;
	}

	function deserialize(bed_data) {
		if (bed_data === undefined)
			return undefined;
		var l = bed_data.length;

		var stack = [];
		var dictionary = [];
		var curr = {};
		var b, len, peek;

		var i = 0;
		while (i < l) {
			b = bed_data[i];
			if (b < 0x20)
				throw "TODO";
			else if (b < 0x40) { // 001LLLLL `String data`						
				b = b & 0x1F;
				i++;
				curr.val = Utf8ArrayToStr(bed_data, i, b);
				i += b;
				dictionary.push(dictionary);
			} else if (b < 0xC0)
				throw "TODO";
			else if (b < 0xE0) { // Map data

				b = b & 0x1F;

				curr = {
					count: b,
					val: {}
				};

				i++;
				stack.push(curr);
				peek = curr;

			} else
				throw "TODO";
		}
		return curr.val;
	}

	this.serialize = serialize;
	this.deserialize = deserialize;
}

function ucs2encode(array) {
	var length = array.length;
	var index = -1;
	var value;
	var output = '';
	while (++index < length) {
		value = array[index];
		if (value > 0xFFFF) {
			value -= 0x10000;
			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
			value = 0xDC00 | value & 0x3FF;
		}
		output += stringFromCharCode(value);
	}
	return output;
}

function Utf8ArrayToStr(array, start, len) {
	var out, i, len, c;
	var char2, char3;

	out = [];
	i = start;
	var end = i + len;
	while (i < end) {
		c = array[i++];
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			out.push(String.fromCharCode(c));
			break;
		case 12:
		case 13:
			// 110x xxxx   10xx xxxx
			char2 = array[i++];
			out.push(String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)));
			break;
		case 14:
			// 1110 xxxx  10xx xxxx  10xx xxxx
			char2 = array[i++];
			char3 = array[i++];
			out.push(String.fromCharCode(((c & 0x0F) << 12) |
				((char2 & 0x3F) << 6) |
				((char3 & 0x3F) << 0)));
			break;
		}
	}

	return out.join('');
}

BED.Utf8ArrayToStr = Utf8ArrayToStr;