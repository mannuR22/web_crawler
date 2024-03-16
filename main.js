const axios = require('axios');
const cheerio = require('cheerio');


const URLS = ['https://www.geeksforgeeks.org/'];
const VIS_URLS = {};
let CURR = 0;

function extractLinks(html) {
    const $ = cheerio.load(html);
    const links = $('a')
        .map((index, element) => $(element).attr('href'))
        .get();

    // console.log("ExtractLinks: ", links);
    return links;
}

async function fetchHTML(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        return null;
    }
}

function extractJobs(html) {
    const $ = cheerio.load(html);
    const jobs = [];

    console.log("extracJobs gets Called");
    return jobs;
}

async function crawl(URLS, CURR) {
    console.log("ITR: ", CURR + 1);
    console.log("URL lenght: ", URLS.length);
    if (CURR < URLS.length) {
        console.log("hello");
        let url = URLS[CURR];
        if (!(url in VIS_URLS)) {
            VIS_URLS[url] = true;

            console.log("url", url);
            const html = await fetchHTML(url);

            if (html) {
                console.log("Current URL: ", url);
                let links = extractLinks(html);
                links.forEach((link) => {
                    // console.log("489")
                    // console.log("URLS", URLS);
                    if(link.includes( "http"))
                        URLS.push(link);
                })
                const jobs = extractJobs(html);
                if (jobs)
                    console.log(`Found ${jobs.length} jobs on ${url}`);
                else
                    console.log(`No Jobs found`);
            }

            console.log("end");
            
        }

        crawl(URLS, CURR + 1);
    }


}


crawl(URLS, CURR);
