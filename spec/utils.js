function throwbin() {
	var buf1 = [];
	var buf2 = [];
	for (var k = 0; k < arguments.length; k++) {
		str = arguments[k];
		var l = str.length;
		var i = 0;
		while (i < l) {
			var c = str.charCodeAt(i)
			buf2.push('[');
			buf2.push(str[i]);
			buf2.push(' ');

			var dec = c.toString();
			while (dec.length < 3) dec = '0' + dec;
			buf2.push(dec);

			var hex = c.toString(16).toUpperCase();
			while (hex.length < 2) hex = '0' + hex;
			buf1.push("0x" + hex + ",");
			buf2.push(hex);

			var bin = c.toString(2);
			while (bin.length < 8) bin = '0' + bin;
			bin = bin.substr(0, 4) + ' ' + bin.substr(4, 4);
			buf2.push(bin);

			buf2.push(']');
			i++;
		}
	}
	var txt = buf1.join(' ') + ' ---  ' + buf2.join(' ');
	throw txt;
}

function binstr(bin) {
	var ret = [];
	for (var i = 0; i < bin.length; i++) {
		var c = bin[i];
		if (c < 0)
			c += 256;
		if (c < 15)
			ret.push("\\x0" + c.toString(16).toUpperCase());
		else if (c < 32 || c > 126)
			ret.push("\\x" + c.toString(16).toUpperCase());
		else
			ret.push(String.fromCharCode(c));
	}
	return ret.join('') + ' l=' + bin.length;
}

function str_to_buf(str) {
	var l = str.length;
	var buf = new Int8Array(new ArrayBuffer(l));
	var i = 0;
	while (i < l) {
		buf[i] = str.charCodeAt(i);
		i++;
	}
	return buf;
}

function bed_expects(expected, actual) {
	if (typeof expected === 'string')
		expected = str_to_buf(expected);

	expect(binstr(expected))
		.toBe(binstr(actual));
}

function json_expects(expected, actual) {
	if (actual instanceof Uint8Array) {
		var a = [];

		for (var i = 0; i < actual.length; i++)
			a.push(actual[i]);
		actual = a;
	}
	expected = JSON.stringify(expected);
	actual = JSON.stringify(actual);

	expect(expected).toBe(actual);
}