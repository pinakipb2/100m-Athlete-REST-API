// Taken from https://www.worldathletics.org/world-rankings/100m/men on 16 June 2021

const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

request('https://www.worldathletics.org/world-rankings/100m/men',(error, response, html) => {
    if(!error && response.statusCode == 200)
    {
        const $ = cheerio.load(html);
        var obj = [];
        const need = 100;
        for(let j=1;j<=need;j++)
        {
            var value = {};
            for(let i=1;i<=5;i++)
            {
                const data = $(`#toplists > div.table-wrapper > table > tbody > tr:nth-child(${j}) > td:nth-child(${i})`);
                const output = data.text().trim();
                // console.log(output);
                if(i==1)
                {
                    value["rank"] = parseInt(output);
                }
                else if(i==2)
                {
                    value["name"] = output;
                }
                else if(i==3)
                {
                    value["dob"] = output;
                }
                else if(i==4)
                {
                    value["nationality"] = output;
                }
                else if(i==5)
                {
                    value["score"] = parseInt(output);
                }
            }
            obj.push(value);
        }
        const jsonData = JSON.stringify(obj);
        // console.log(jsonData);
        fs.writeFile("athlete1.json", jsonData, (err) => {
            console.log("Done");
        });
    }
});


fs.readFile("athlete1.json", "utf-8", (err, data) => {
    const orgData = JSON.parse(data);
    console.log(orgData[0]);
});