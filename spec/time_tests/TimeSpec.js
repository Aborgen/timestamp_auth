describe("Timecode_auth:", () => {
    const App = require('../../scripts');
    let app;

    beforeEach(() => {
        app = App;
    });

    describe("when get request has been sent,", () => {
        // Parsing UTC
        /*        1        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('1388991600')).toEqual({ unix: 1388991600, natural: 'Mon, 06 Jan 2014 07:00:00 GMT' });
        });
        /*        2        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('999999999999')).toEqual({unix: 999999999999, natural: 'Fri, 27 Sep 33658 01:46:39 GMT'});
        });

        // Parsing natural time
        // Year LAST, month in TEXT
        /*        3        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('January,%2006,%202014')).toEqual({unix: 1388991600, natural: 'Mon, 06 Jan 2014 07:00:00 GMT'});
        });
        /*        4        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('06, January, 2014')).toEqual({unix: 1388991600, natural: 'Mon, 06 Jan 2014 07:00:00 GMT'});
        });
        // Year LAST, month in INT
        /*        5        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('01, 06, 2014')).toEqual({unix: 1388991600, natural: 'Mon, 06 Jan 2014 07:00:00 GMT'});
        });
        /*        6        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('06, 01, 2014')).toEqual({unix: 1401606000, natural:'Sun, 01 Jun 2014 07:00:00 GMT'});
        });

        // Year FIRST, month in TEXT
        /*        7        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('2014, January, 06')).toEqual({unix: 1388991600, natural: 'Mon, 06 Jan 2014 07:00:00 GMT'});
        });
        /*        8        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('2014, 06, January')).toEqual({unix: 1388991600, natural: 'Mon, 06 Jan 2014 07:00:00 GMT'});
        });

        // Year FIRST, month in INT
        /*        9        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('2014, 01, 06')).toEqual({unix: 1388991600, natural: 'Mon, 06 Jan 2014 07:00:00 GMT'});
        });
        /*        10        */
        it("should return an object containing both Unix and natural time", () => {
            expect(app.parseArgument('2014, 06, 01')).toEqual({unix: 1401606000, natural:'Sun, 01 Jun 2014 07:00:00 GMT'});
        });

        // Invalid checks
        /*        11        */
        it("should return an error key-value pair", () => {
            expect(app.parseArgument('2014, 36, 101')).toEqual({error: "Invalid Date"});
        });
        /*        12        */
        it("should return an error key-value pair", () => {
            expect(app.parseArgument('2014, 363, 10')).toEqual({error: "Invalid Date"});
        });
        /*        13        */
        it("should return an error key-value pair", () => {
            expect(app.parseArgument('9999999999999')).toEqual({error: "Invalid Date"});
        });
        /*        14        */
        it("should return an error key-value pair", () => {
            expect(app.parseArgument('hello world')).toEqual({error: "Please enter a valid date"});
        });

    });
});
