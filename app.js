window.addEventListener('load', () => {

    let lat, long,icon;
    //===Declaring DOM Elements====//


    const timezoneH1 = document.querySelector('.location .location-timezone');
    const tempDegreeFah = document.querySelector('.temperature');
    const tempDegreeFahSpan = document.querySelector('.temperature span');

    const temper = document.querySelector('.temperature .degree');
    const tempDesc = document.querySelector('.temp-description');
    const iconic = document.querySelector('.icon1')
    // const quote = document.querySelector('.quote-unquote p');
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            let lat = position.coords.latitude;
            let long = position.coords.longitude;

            const cors = 'https://cors-anywhere.herokuapp.com/'
            const api = `${cors}https://api.darksky.net/forecast/0e978690858c1fec4f805c699b91c289/${lat},${long}`;
            // const api = `https://api.kanye.rest`;
            fetch(api)
                .then(response => {
                    return response.json();
                })

                .then(data => {
                    console.log(data);
//                     quote.innerHTML = `<em> ${data.quote} </em>`;
                    const timeZone = data.timezone;
                    const currentTemp = data.currently.apparentTemperature;
                    const description = data.currently.summary;
                    const iconId = data.currently.icon;
                    icon = data.currently.icon;
                    console.log(description);
                    timezoneH1.innerText = `${timeZone}`;
                    temper.innerText = fahrenToDegree(currentTemp);
                    tempDesc.innerText = `${description}`;

                    //====Set Icons====//
                    DrawskyCons(icon ,iconic)

                    //=====Converting that Shit on click ===//
                    tempDegreeFah.addEventListener('click', ()=>{

                        const degreeTemperature = fahrenToDegree(currentTemp);
                        // console.log(degreeTemperature);

                        if(tempDegreeFahSpan.innerText.includes('F')){
                            tempDegreeFahSpan.innerText = 'C';
                            temper.innerText = degreeTemperature;
                        }

                        else{
                            tempDegreeFahSpan.innerText = 'F';
                            temper.innerText = currentTemp;

                        }
                    })
                })
        })
    }

    DrawskyCons = (icon , iconID) => {
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    fahrenToDegree = (temp) => {
        const degree = Math.round(((temp - 32) * 5 / 9));
        return degree;
    }
})
