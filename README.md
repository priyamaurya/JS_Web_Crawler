Web Crawler in Javascript
===============================

This is simple web crawler developed in Javascript and node js. 

1.This will crawl internal links from the start page given in variable PAGE_URL.

2.We can set the number of pages to crawl in variable NUM_OF_PAGE_CAN_VISIT.

3.In console log we can see the page visited. 

4.All links in this page domain will be saved in "site_domain_links.json" file in same directory. 

5.All external links of the page will be saved in ""external_links.json" file in same directory.

6.All links to image on the page will be saved in "images.json" file in same directory. 


To build and run this solution
====================================================


There are two methods for to build and run this solution .

1Checkout this repo,install dependencies, then start the gulp process with the following:

    >git clone https://github.com/priyamaurya/JS_Web_Crawler.git
    >cd JS_Web_Crawler
    >npm install
    >node web_crawler.js

2.Download the .zip file. Extract the contents of the zip file, then open your terminal, change to the project directory, 
and:

    > npm install
    > node web_crawler.js
    

To test web crawler 
====================================

1.Open your terminal, change to the project directory, and provide commands

    > npm test

Test Features : 

1. This will test the required parameters like PAGE_URL to start crawling and NUM_OF_PAGE_CAN_VISIT for number of Pages.

2.This will test the request function to test the response code.



Provided more time I would like to do following improvements in the web crawler.

1.Provide simple UI with text box to enter the PAGE_URL to crawl,NUM_OF_PAGE_CAN_VISIT, format of file to save and a 
button  to save the file.

2.Save links in site map structure in json files. 

3.Add validation for the mandatory inputs. 

4.Write more test cases to test all the methods.  

=====================================
