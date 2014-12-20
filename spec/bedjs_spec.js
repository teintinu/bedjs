describe('BED', function () {

	var bed=new BED();
	
	it('empty map', function () {
		
		json_expects({}, bed.deserialize([0xC0]));
		
		bed_expects([0xC0], bed.serialize({}));
		
	});
	
	it('empty string', function () {
		json_expects('', bed.deserialize([0x20]));
	});

	it('empty string A', function () {
		json_expects('A', bed.deserialize([0x21,65]));
	});

	it('string José', function () {
		json_expects('José', bed.deserialize([0x25,0x4A,0x6F,0x73,0xC3,0xA9]));
	});
	
});