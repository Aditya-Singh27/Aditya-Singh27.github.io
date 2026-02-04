//http://api.weatherapi.com/v1/current.json?key=f77ec1762b9c4c5983962114260302&q=London&aqi=yes
const button = document.getElementById("search")
const input = document.getElementById("input")

const cityName = document.getElementById("city-name")
const cityTime = document.getElementById("city-time")
const cityTemp = document.getElementById("city-temp")

async function getData(cityName) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=f77ec1762b9c4c5983962114260302&q=${cityName}&aqi=yes`
    )
    return await promise.json()
}

button.addEventListener("click" , async () =>{
    //console.log(cityName.value)
    const value = input.value
    const result = await getData(value)

    cityName.innerText = `${result.location.name} , ${result.location.region} - ${result.location.country} `
    cityTime.innerText = result.location.localtime
    cityTemp.innerText = result.current.temp_c
    //console.log(result)
})


//get location 

async function exactLocation(latitude , longitude) {
        const promise = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=f77ec1762b9c4c5983962114260302&q=${latitude},${longitude}&aqi=yes`
        )
        return await promise.json()
    }

async function GotLocation(position) {
    //console.log(position.coords.latitude)
    const locResult = await exactLocation(position.coords.latitude , position.coords.longitude)
    console.log(locResult.location)

    writeLoc.innerText = `${locResult.location.name}, 
    ${locResult.location.region} , ${locResult.location.country}
    ${locResult.location.localtime}`

}
async function failedToGet() {
    console.log("seems like there is some issue")
}

const loc = document.getElementById("get-location")
const writeLoc = document.getElementById("loc")
loc.addEventListener("click" , () =>{
    navigator.geolocation.getCurrentPosition(GotLocation , failedToGet)
})