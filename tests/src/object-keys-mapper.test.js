describe("JS Object Keys Mapper", function() {

    /**
     * Simulates the mask object.
     * @var {Object}
     */
    var mockMask = {
        write: {
            name: 'name',
            label: 'text',
            renderer: function(obj) {
                return obj['text'].replace('text', 'gaaaas');
            },
            test: 'renderers'
        },
        read: {
            name: 'name',
            text: 'label'
        }
    };

    /**
     * Simulates the object to write.
     * @var {Object}
     */
    var objectToWrite = {
        name: 'from "name" to "name"',
        text: 'from "text" to "label"',
        blabla: 'this label won\'t be written',
        renderers: [
            { condition: "{isInvoice} && !{converted}", renderer: "link|{orderID}|/e/i.html?id={orderID}&cid={patronID}|_blank" },
            { condition: "true", renderer: "link|{orderID}|/e/c.html?id={orderID}&cid={patronID}|_blank" }
        ]
    };

    /**
     * Simulates another object to write.
     * @var {Object}
     */
    var anotherObjectToWrite = {
        name: 'from "name" to "name". Second version',
        text: 'from "text" to "label". Second version',
        blabla: 'this label won\'t be written. Second version',
        renderers: [
            { condition: "{isInvoice} && !{converted}", renderer: "link|{orderID}|/e/i.html?id={orderID}&cid={patronID}|_blank" },
            { condition: "true", renderer: "link|{orderID}|/e/c.html?id={orderID}&cid={patronID}|_blank" }
        ]
    };

    /**
     * Simulates an array to write.
     * @var {Object}
     */
    var mockArrayToWrite = [
        objectToWrite, anotherObjectToWrite
    ];

    /**
     * Simulates the result of the write() method on "objectToWrite".
     * @var {Object}
     */
    var mappedObjectWithWriting = {
        name: 'from "name" to "name"',
        label: 'from "text" to "label"',
        renderer: 'from "gaaaas" to "label"',
        test: [
            { condition: "{isInvoice} && !{converted}", renderer: "link|{orderID}|/e/i.html?id={orderID}&cid={patronID}|_blank" },
            { condition: "true", renderer: "link|{orderID}|/e/c.html?id={orderID}&cid={patronID}|_blank" }
        ]
    };

    /**
     * Simulates the result of the write() method on "anotherObjectToWrite".
     * @var {Object}
     */
    var mappedAnotherObjectWithWriting = {
        name: 'from "name" to "name". Second version',
        label: 'from "text" to "label". Second version',
        renderer: 'from "gaaaas" to "label". Second version',
        test: [
            { condition: "{isInvoice} && !{converted}", renderer: "link|{orderID}|/e/i.html?id={orderID}&cid={patronID}|_blank" },
            { condition: "true", renderer: "link|{orderID}|/e/c.html?id={orderID}&cid={patronID}|_blank" }
        ]
    };

    /**
     * Simulates the object to read.
     * @var {Object}
     */
    var objectToRead = {
        name: 'from "name" to "name"',
        blabla: 'this label won\'t be written',
        label: 'from "label" to "text"'
    };

    /**
     * Simulates another object to read.
     * @var {Object}
     */
    var anotherObjectToRead = {
        name: 'from "name" to "name". Second version',
        blabla: 'this label won\'t be written. Second version',
        label: 'from "label" to "text". Second version'
    };

    /**
     * Simulates an array to read.
     * @var {Object}
     */
    var mockArrayToRead = [
        objectToRead, anotherObjectToRead
    ];

    /**
     * Simulates the result of the read() method on "objectToRead".
     * @var {Object}
     */
    var mappedObjectWithReading = {
        name: 'from "name" to "name"',
        text: 'from "label" to "text"'
    };

    /**
     * Simulates the result of the read() method on "anotherObjectToRead".
     * @var {Object}
     */
    var mappedAnotherObjectWithReading = {
        name: 'from "name" to "name". Second version',
        text: 'from "label" to "text". Second version'
    };

    it("testing JS Object Keys Mapper object.", function() {
        expect(ObjectKeysMapper).toBeDefined();
    });

    it("testing JS Object Keys Mapper constructor.", function() {
        var test = function() { return new ObjectKeysMapper('abc') };
        expect(test).toThrow();

        var test = function() { return new ObjectKeysMapper({}) };
        expect(test).toThrow();

        var test = function() { return new ObjectKeysMapper({ read: 'abc', write: true }) };
        expect(test).toThrow();

        var test = function() { return new ObjectKeysMapper({ read: {}, write: {} }) };
        expect(test).not.toThrow();
    });

    it("testing JS Object Keys Mapper object initialization.", function() {
        var mapper = new ObjectKeysMapper(mockMask);
        expect(mapper.getMask()).toEqual(mockMask);
    });

    it("testing JS Object Keys Mapper write method.", function() {
        var mapper = new ObjectKeysMapper(mockMask);
        expect(mapper.write(objectToWrite)).toEqual(mappedObjectWithWriting);
    });

    it("testing JS Object Keys Mapper read method.", function() {
        var mapper = new ObjectKeysMapper(mockMask);
        expect(mapper.read(objectToRead)).toEqual(mappedObjectWithReading);
    });

    it("testing JS Object Keys Mapper array method.", function() {
        var mapper = new ObjectKeysMapper(mockMask);

        expect(mapper.array(mockArrayToWrite, mapper.WRITE_ACTION)).toEqual([
            mappedObjectWithWriting, mappedAnotherObjectWithWriting
        ]);

        expect(mapper.array(mockArrayToRead, mapper.READ_ACTION)).toEqual([
            mappedObjectWithReading, mappedAnotherObjectWithReading
        ]);
    });
});
