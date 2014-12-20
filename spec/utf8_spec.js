describe('UTF-8', function () {

	utftest('decode empty', '', [], 0, 0);

	utftest('decode A', 'A', [65], 0, 1);

	utftest('decode A2', 'A', [64, 65, 64], 1, 1);

	it('decode José', function () {
		var s = Utf8ArrayToStr([0x4A, 0x6F, 0x73, 0xC3, 0xA9], 0, 5);
		json_expects('José', s);
	});

	it('decode ângela', function () {
		var s = Utf8ArrayToStr([0xC3, 0xA2, 0x6E, 0x67, 0x65, 0x6C, 0x61], 0, 7);
		json_expects('ângela', s);
	});

	it('decode €', function () {
		var s = Utf8ArrayToStr([0xE2, 0x82, 0xAC], 0, 3);
		json_expects('€', s);
	});

});


function utftest(testname, str, arr, i, l) {

	describe(testname, function () {
		it(' from Array to String ', function () {
			json_expects(str, Utf8ArrayToStr(arr, i, l));
		});

		it(' from String to Array ', function () {
			var a = [];
			var end = i + l;
			for (var k = i; k < end; k++)
				a.push(arr[k]);
			json_expects(a, ShortStrToUtf8Array(str));
		});
	});
}