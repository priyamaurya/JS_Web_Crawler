var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var PAGE_URL = "http://www.wiprodigital.com";


var url = new URL(PAGE_URL);
var baseUrl = url.protocol + "//" + url.hostname;

var pagesVisited = {};
var pageCounter = 0;
var pagesToVisit = [];
var NUM_OF_PAGE_CAN_VISIT = 5;

pagesToVisit.push(PAGE_URL);
pageCrawl();

function pageCrawl() {
    if (pageCounter >= NUM_OF_PAGE_CAN_VISIT) {
        console.log("You reached the limit of pages can be visited");
        return;
    }
    var nextPage = pagesToVisit.pop();
    if (nextPage in pagesVisited) {
        // Already visited this page, so repeat the pageCrawl
        pageCrawl();
    } else {
        // New page 
        checkPage(nextPage, pageCrawl);
    }
}

function checkPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    pageCounter++;
    console.log("Visiting page " + url);
    
    request(url, function(error, response, body) {
        // Check status code (200 is HTTP OK)
        if (!error && response.statusCode == 200) {
            console.log("Status code: " + response.statusCode);
            var $ = cheerio.load(body);
            var link;
            $('a').each(function() {
                link = $(this).attr('href');

                if (link !== undefined) {
                    if (link.indexOf("://") > -1 ? pagesToVisit.push(link) : pagesToVisit.push(baseUrl + link));
                } else {
                    pagesToVisit.push(baseUrl + link);
                }
            });

               callback(); // callback is  pageCrawl function

        } else {
            console.log("error returned " + error);
            callback();
            return;
        }
    });
}


