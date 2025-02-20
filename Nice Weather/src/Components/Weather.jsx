import axios from "axios";
import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState();

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (city === "") {
      alert("Please Enter City Name");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"0dd6d51112a1bbf0dc7e9c046cf8ce58"}`
      );
      setWeatherData(response);
      console.log(response);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  return (
    <>
      <div className="h-screen bg-linear-to-t from-sky-500 to-indigo-500">
        <div className="grid justify-center items-center h-full">
          <h1 className="text-4xl text-center font-bold mt-3">
            It's Always Nice To Check Weather
          </h1>
          <div className="text-center">
            <input
              type="text"
              className="bg-white h-10 w-80 pl-3 rounded-bl-2xl rounded-tl-2xl outline-0"
              placeholder="Search"
              value={city}
              onChange={handleCityChange}
            />
            <button
              className="bg-pink-600 h-10 px-3 rounded-br-2xl rounded-tr-2xl text-white"
              onClick={handleClick}
            >
              Get Weather
            </button>
          </div>
          <div className="bg-white min-h-100 min-w-120 rounded-2xl shadow-2xl">
            {!weatherData ? (
              <>
                <h2 className="text-2xl font-bold text-center">
                  Enter City Name
                </h2>
              </>
            ) : (
              <div className="grid justify-center items-center">
                <h2 className="text-3xl  uppercase font-bold mt-5  text-center">
                  {weatherData.data.weather[0].description}
                </h2>
                <div className="mt-5 bg-linear-65 from-purple-500 to-pink-500 rounded-2xl grid gap-5 p-10">
                  <h2 className="text-3xl font-bold uppercase text-center">
                    {weatherData.data.name}
                  </h2>
                  <h2 className="text-3xl text-center">
                    {weatherData.data.main.temp}°C
                  </h2>
                  <p className="text-center text-2xl">
                    WindSpeed : {weatherData.data.wind.speed}
                  </p>
                  <p className="text-center text-2xl">
                    Humidity : {weatherData.data.main.humidity}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
