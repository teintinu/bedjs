describe('BED', function () {

	bedtest('empty string', '', [0x20]);

	//bedtest('empty string A', 'A', [0x21, 65]);

		var bed = new BED();


	it('string José', function () {
		json_expects('José', bed.deserialize([0x25, 0x4A, 0x6F, 0x73, 0xC3, 0xA9]));
	});

	it('empty map', function () {

		json_expects({}, bed.deserialize([0xC0]));

		bed_expects([0xC0], bed.serialize({}));

	});

});


function bedtest(testname, json_data, bed_data) {

	describe(testname, function () {
		it(' from BED to JSON ', function () {
			var bed = new BED();
			json_expects(json_data, bed.deserialize(bed_data));
		});

		it(' from JSON to BED ', function () {
			var bed = new BED();
			bed_expects(bed_data, bed.serialize(json_data));
		});
	});
}