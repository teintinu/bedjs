describe('UTF-8', function () {
	
	it('decode empty', function () {
		var s=Utf8ArrayToStr([],0,0);
		json_expects('', s);
	});

	it('decode A', function () {
		var s=Utf8ArrayToStr([65],0,1);
		json_expects('A', s);
	});

	it('decode A2', function () {
		var s=Utf8ArrayToStr([64,65,64],1,1);
		json_expects('A', s);
	});
	
	it('decode José', function () {		
		var s=Utf8ArrayToStr([0x4A,0x6F,0x73,0xC3,0xA9],0,5);
		json_expects('José', s);
	});
	
	it('decode ângela', function () {		
		var s=Utf8ArrayToStr([0xC3,0xA2,0x6E,0x67,0x65,0x6C,0x61],0,7);
		json_expects('ângela', s);
	});
});