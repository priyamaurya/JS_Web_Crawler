var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');

// var PAGE_URL = "http://www.bbc.co.uk";
var PAGE_URL = "http://www.wiprodigital.com";
// var PAGE_URL = "http://www.zoopla.co.uk";
// var PAGE_URL = "http://www.lloydsbankinggroup.com/";

var url = new URL(PAGE_URL);
var baseUrl = url.protocol + "//" + url.hostname;

var pagesVisited = {};
var pageCounter = 0;
var pagesToVisit = [];
var images = [];
var externalLinks = [];
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
    saveInfoToFile("site_domain_links", pagesToVisit);

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

            findExternalLink($); // finds all external links in page
            saveImagesOfPage($); // function to get all images links of the page
            callback(); // callback is  pageCrawl function

        } else {
            console.log("error returned " + error);
            callback();
            return;
        }
    });
}

function findExternalLink($) {
    var pagelink;
    $("a[href]").each(function() {
        if (url.hostname.includes(extractDomain($(this).attr('href'))) || extractDomain($(this).attr('href')) === '') {
            pagelink = $(this).attr('href');
            if (pagelink !== undefined) {
                if (pagelink.indexOf("://") > -1 ? pagesToVisit.push(pagelink) : pagesToVisit.push(baseUrl + pagelink));
            } else {
                pagesToVisit.push(baseUrl + pagelink);
            }

        } else {
            externalLinks.push($(this).attr('href'));
        }
        saveInfoToFile("external_links", externalLinks);
    });
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
    return domain;
}

function saveImagesOfPage($) {
    $('img').each(function() {
        var image = $(this).attr('src');
        images.push(image);
        saveInfoToFile('images', images);
    });
}

function saveInfoToFile(fileName, arrayOfValues) {
    var filenameToSave = './' + fileName + '.json';
    fs.writeFile(
        filenameToSave,
        JSON.stringify(arrayOfValues, null, "\n"),

        function(err) {
            if (err) {
                console.error('Failed to save in file');
            }
        }
    );

}
