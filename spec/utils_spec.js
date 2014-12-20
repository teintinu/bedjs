describe('Utils spec', function () {

	it('CRLF', function () {
		expect(binstr([13, 10])).toBe('\\x0D\\x0A l=2');
	});

	it('B\\0xC8D', function () {
		expect(binstr([66, 0xC8, 68])).toBe('B\\xC8D l=3');
	});

	it('bed_expects', function () {
		bed_expects([65], [65]);
	});
	
	it('bed_expects 1', function () {
		bed_expects('A', [65]);
	});

	it('bed_expects 2', function () {
		bed_expects("\xC8", [0xC8]);
	});
	
	it('bed_expects 3', function () {
		bed_expects("B\xC8B", [66,0xC8, 66]);
	});

	it('json_expects 1', function () {
		json_expects({}, {});
	});		
});

