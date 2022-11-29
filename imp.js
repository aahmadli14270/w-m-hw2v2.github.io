"use strict";

const date3D = new Date();
const temp = new Date();
const tomorrow = new Date();

const tomorrowplus = new Date();
tomorrow.setDate(temp.getDate() + 1);
tomorrowplus.setDate(temp.getDate() + 2);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

console.log(date3D);
navigator.geolocation.getCurrentPosition(
  function (position) {
    // console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);

    const map = L.map("map").setView([latitude, longitude], 6);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();

    console.log(openWeatherCall(latitude, longitude));
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  },
  function () {
    alert(
      "Couldn't get your current location... Please give location permission."
    );
  }
);

function openWeatherCall(latitude, longitude) {
  let lat = latitude;
  let lon = longitude;
  let units = "metric";
  let lang = "en";
  let key = "5209b666803238e6492b0f84bb620f41";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
  //let url = `https://api.openweathermap.org/data/2.5/onecall?lat=40.405520074042514&lon=49.844963102044325&appid=51a6bf5e7efb2ebbc1b35e2519d42ff1&units=metric&lang=en`;
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      weatherGenerator(data);
    })
    .catch(console.err);
}

function weatherGenerator(data) {
  const mainDetails = document.querySelector(".main-weather-details");

  let templateHTML = `
  <img class = "cloud-img" src = "http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png" alt = "${data.current.weather[0].description}">
    <p class = "property">humidity: ${data.current.humidity}</p>
    <p class = "property">pressure: ${data.current.pressure}</p>
    <p class = "property">sunrise: ${data.current.sunrise}</p>
    <p class = "property">timezone: ${data.timezone}</p>
    `;

  mainDetails.innerHTML = templateHTML;
  const secondaryDetails = document.querySelector(".secondary-weather-details");

  // let templateHTMLsecondary = `
  //           <div class="day">
  //             <h1>${
  //               dayNames[date3D.getDay()] +
  //               ", " +
  //               date3D.getDate() +
  //               " " +
  //               monthNames[date3D.getMonth()]
  //             }</h1>
  //             <p>${data.current.weather[0].description}</p>
  //             <div class="img-degree-container">
  //               <img class = "cloud-img" src = "http://openweathermap.org/img/wn/${
  //                 data.current.weather[0].icon
  //               }@4x.png" alt = "${data.current.weather[0].description}"/>
  //               <p class = "day-description">${
  //                 data.daily[date3D.getDay()].temp.day
  //               }/${data.daily[date3D.getDay()].temp.night}°C</p>
  //             </div>
  //           </div>

  //           <div class="day">
  //             <h1>${
  //               dayNames[tomorrow.getDay()] +
  //               ", " +
  //               tomorrow.getDate() +
  //               " " +
  //               monthNames[tomorrow.getMonth()]
  //             }</h1>
  //             <p>${data.daily[tomorrow.getDay()].weather[0].description}</p>
  //             <div class="img-degree-container">
  //               <img class = "cloud-img" src = "http://openweathermap.org/img/wn/${
  //                 data.current.weather[0].icon
  //               }@4x.png" alt = "${data.current.weather[0].description}"/>
  //               <p class = "day-description">${
  //                 data.daily[tomorrow.getDay()].temp.day
  //               }/${data.daily[tomorrow.getDay()].temp.night}°C</p>
  //             </div>
  //           </div>
  //           <div class="day">
  //             <h1>${
  //               dayNames[tomorrowplus.getDay()] +
  //               ", " +
  //               tomorrowplus.getDate() +
  //               " " +
  //               monthNames[tomorrowplus.getMonth()]
  //             }</h1>

  //             <p>${data.daily[tomorrowplus.getDay()].weather[0].description}</p>
  //             <div class="img-degree-container">
  //               <img class = "cloud-img" src = "http://openweathermap.org/img/wn/${
  //                 data.current.weather[0].icon
  //               }@4x.png" alt = "${data.current.weather[0].description}"/>
  //               <p class = "day-description">${
  //                 data.daily[tomorrowplus.getDay()].temp.day
  //               }/${data.daily[tomorrowplus.getDay()].temp.night}°C</p>
  //             </div>
  //           </div>
  // `;
  // secondaryDetails.innerHTML = templateHTMLsecondary;
}
