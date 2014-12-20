
describe('First Message', function(){

	var json = '{"compact":true,"schema":0}';
    var bed1 = '\\0xC2\\0x27compact\\0x41\\0x26schema\0\x80';
    var bed2 = "\\0xC2\\0x42\\0x41\\0x43\\0x80";

	var bed=new BED();
	
	/*
	it('from 28 to 17 bytes', function(){
		//var s=bed.serialize(json);
        //expect(s.binstr()).toBe(bad1.binstr());
    });
    it('deserialize first message', function(){
		var s=bed.deserialize(json);
        expect(BED.binstr(s)).toBe(bed1);
    });*/
});