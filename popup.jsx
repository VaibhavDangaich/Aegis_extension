document.getElementById('analyzeBtn').addEventListener('click',async()=>{
    const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
    const url=tab.url;
    const response=await fetch('http://localhost:5000/analyze',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({url,result:'Analyzing....'})
    });
    const data=await response.json();
    document.getElementById('result').innerText=data.analysis.result|| 'Done!!';
})