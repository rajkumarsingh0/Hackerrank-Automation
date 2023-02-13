const puppeteeer = require("puppeteer");
const loginLink = 'https://www.hackerrank.com/auth/login';
const codeObj = require("./codes");
const email = "gehimode.ipivusip@gotgel.org";
const passward = "king@123";


(async function(){
    try {
        
        let browserInstance = await puppeteeer.launch({
            headless:false,
            args:['--start-maximized'],
            defaultViewport:null
        });


        let newTab = await browserInstance.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']",email,{delay:50});
        await newTab.type("input[id='input-2']",passward,{delay:50});
        await newTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled",{delay:50});
        await waitAndClick("a[data-attr1='algorithms']",newTab); 
        await waitAndClick("input[value='warmup']",newTab); 
        await waitAndClick("input[value='warmup']",newTab); 
        let allChallanges = await newTab.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50}); 
        console.log("Total question",allChallanges.length);
        await questionSolver(newTab,allChallanges[0],codeObj.answers[0]); 


    } catch (error) {
        console.log(error);
    }
})()


async function waitAndClick(selector,cPage){
    await cPage.waitForSelector(selector);
    
    let selectorClicked = cPage.click(selector);
    return selectorClicked;
}

async function questionSolver(newTab,question,answer){
    await question.click();
    await waitAndClick(".monaco-editor.no-user-select.vs",newTab);
    await waitAndClick(".checkbox-input",newTab);
    await newTab.waitForSelector('textarea.custominput',newTab);
    await newTab.type('textarea.custominput',answer,{delay:10});
    await newTab.keyboard.down('Control');
    await newTab.keyboard.press('A',{delay:100});
    await newTab.keyboard.press('C',{delay:100});
    await newTab.keyboard.up('Control');
    await waitAndClick('.monaco-editor.no-user-select.vs',newTab)
    await newTab.keyboard.down('Control');
    await newTab.keyboard.press('A',{delay:100});
    await newTab.keyboard.press('V',{delay:100});
    await newTab.keyboard.up('Control');
    await newTab.click(".hr-monaco__run-code",{delay:50});
    await waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",newTab,{delay:50});
}




















