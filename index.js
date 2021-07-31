const btn = document.querySelector('button.click-me');

const yourIpAddress = document.querySelector('.ip-address strong');
const yourLocation = document.querySelector('.your-location strong')

const randomBtn = document.querySelector('button.random-click');
const randomIpAddress = document.querySelector('.random-ip-address strong');
const randomLocation = document.querySelector('.random-location strong')

const ipList = document.querySelector('.ip-list');


let randomIpArr = [
    "155.50.71.1",
    "208.30.224.28",
    "82.19.208.248",
    "191.45.182.55",
    "23.115.68.103",
    "176.126.146.245",
    "182.23.228.56",
    "151.50.162.227",
    "53.118.160.216",
    "46.57.84.142",
    "92.127.42.132",
    "149.243.177.21",
    "7.68.166.184",
    "252.4.114.215",
    "25.205.254.9",
    "165.152.1.183",
    "31.189.173.26",
    "164.54.78.197",
    "67.127.191.36",
    "56.160.21.212",
];

const wait = (ms=0) => new Promise((resolve) => setTimeout(resolve,ms));

const ipAddressEndpoint =  `https://api.ipify.org`;
const ipLocationEndpoint =  `https://api.ip2country.info/ip`;


async function fetchYourLocation(ip,ipAddressEl,locationEl){
    const res = await fetch(`${ipLocationEndpoint}?${ip}`);
    const {countryName} = await res.json();
    ipAddressEl.textContent = 'Loading...';
    locationEl.textContent = 'Loading...';
    await wait(700);
    ipAddressEl.textContent = ip;
    locationEl.textContent = countryName.length? countryName:"Not found";
    return countryName;
}

async function fetchIpAddress(){
    const res = await fetch(`${ipAddressEndpoint}?format=json`);
    const {ip} = await res.json();
    fetchYourLocation(ip,yourIpAddress,yourLocation);
    return ip;
}

 async function goRandom(){
         for(const ip of randomIpArr ){
            //  await wait(1500);
            let country = await fetchYourLocation(ip,randomIpAddress,randomLocation);
            let listHtml = `<li><span class="ip">${ip}</span><span class="location">${country.length? country:'Not Found'}</span></li>`;
            ipList.innerHTML = ipList.innerHTML += listHtml;
    }
}

btn.addEventListener('click',fetchIpAddress);
randomBtn.addEventListener('click',goRandom,{ once: true });



