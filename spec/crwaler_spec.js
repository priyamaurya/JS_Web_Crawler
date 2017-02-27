var request = require("request");
var webCrawler = require("../web_crawler.js");
var base_url = "http://www.wiprodigital.com";

describe("Web Crawler", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

   describe("PAGE_URL ", function() {

      var PAGE_URL = "http://www.msn.com";

      it("is defined", function() {       
        expect(PAGE_URL).not.toBeUndefined();
      });

      it("not empty", function() {       
        expect(PAGE_URL).not.toEqual('');
      });
    });

    describe("NUM_OF_PAGE_CAN_VISIT ", function() {

      var NUM_OF_PAGE_CAN_VISIT = '';

      it("is defined", function() {       
        expect(NUM_OF_PAGE_CAN_VISIT).not.toBeUndefined();
      });

      it("not empty", function() {       
        expect(NUM_OF_PAGE_CAN_VISIT).not.toBeNull();
      });

      it("greater than 0", function() {       
        expect(NUM_OF_PAGE_CAN_VISIT).toBeGreaterThan(0);
      });

    });
    
});