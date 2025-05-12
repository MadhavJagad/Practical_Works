import { useState, useEffect } from "react";
import axios from "axios";
import { Sun, CloudRain, CloudSnow, Cloud, Moon, Wind, Droplet, Search, Loader } from "lucide-react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    if (weatherData) {
      const weather = weatherData.data.weather[0].main.toLowerCase();
      const isDaytime = isDay(weatherData.data.sys.sunrise, weatherData.data.sys.sunset);
      
      if (weather.includes("rain") || weather.includes("drizzle")) {
        setTheme("rainy");
      } else if (weather.includes("snow")) {
        setTheme("snowy");
      } else if (weather.includes("cloud")) {
        setTheme("cloudy");
      } else {
        setTheme(isDaytime ? "day" : "night");
      }
    }
  }, [weatherData]);

  const isDay = (sunrise, sunset) => {
    const now = Math.floor(Date.now() / 1000);
    return now >= sunrise && now <= sunset;
  };

  const getBackgroundClass = () => {
    switch (theme) {
      case "rainy":
        return "bg-gradient-to-br from-gray-700 to-blue-900";
      case "snowy":
        return "bg-gradient-to-br from-blue-100 to-blue-300";
      case "cloudy":
        return "bg-gradient-to-br from-gray-300 to-blue-400";
      case "night":
        return "bg-gradient-to-br from-gray-900 to-blue-900";
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-600";
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0dd6d51112a1bbf0dc7e9c046cf8ce58`
      );
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        setError("City not found. Please check the spelling and try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  const getWeatherIcon = () => {
    if (!weatherData) return <Sun className="w-20 h-20 text-yellow-400" />;
    
    const weather = weatherData.data.weather[0].main.toLowerCase();
    
    if (weather.includes("rain") || weather.includes("drizzle")) {
      return <CloudRain className="w-20 h-20 text-blue-400" />;
    } else if (weather.includes("snow")) {
      return <CloudSnow className="w-20 h-20 text-blue-100" />;
    } else if (weather.includes("cloud")) {
      return <Cloud className="w-20 h-20 text-gray-400" />;
    } else if (theme === "night") {
      return <Moon className="w-20 h-20 text-yellow-200" />;
    } else {
      return <Sun className="w-20 h-20 text-yellow-400" />;
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-all duration-500 p-4 flex flex-col items-center justify-center`}>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
            Weather Forecast
          </h1>
          <p className="text-white text-lg opacity-80">It's always nice to check the weather</p>
        </div>
        
        <div className="relative mb-6">
          <input
            type="text"
            className="w-full bg-white h-12 px-4 pr-12 rounded-lg shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter city name..."
            value={city}
            onChange={handleCityChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors"
            onClick={fetchWeather}
            disabled={loading}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-md">
            <p>{error}</p>
          </div>
        )}
        
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
          {loading ? (
            <div className="p-8 flex flex-col items-center justify-center">
              <Loader className="w-16 h-16 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Fetching weather data...</p>
            </div>
          ) : !weatherData ? (
            <div className="p-8 flex flex-col items-center justify-center">
              {getWeatherIcon()}
              <h2 className="text-xl font-semibold text-gray-700 mt-4">
                Enter a city name to get started
              </h2>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute top-4 right-4 opacity-20">
                {getWeatherIcon()}
              </div>
              
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {weatherData.data.name}
                  <span className="text-sm ml-2 font-normal text-gray-500">
                    {weatherData.data.sys.country}
                  </span>
                </h2>
                
                <div className="mt-4 flex items-center">
                  <div className="mr-4">
                    {getWeatherIcon()}
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-gray-800">
                      {Math.round(weatherData.data.main.temp)}°C
                    </p>
                    <p className="text-gray-600 capitalize">
                      {weatherData.data.weather[0].description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Wind className="w-5 h-5 text-blue-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Wind Speed</p>
                        <p className="font-semibold text-gray-700">{weatherData.data.wind.speed} m/s</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Droplet className="w-5 h-5 text-blue-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-500">Humidity</p>
                        <p className="font-semibold text-gray-700">{weatherData.data.main.humidity}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <div>
                        <p className="text-xs text-gray-500">Feels Like</p>
                        <p className="font-semibold text-gray-700">{Math.round(weatherData.data.main.feels_like)}°C</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <p className="text-xs text-gray-500">Pressure</p>
                        <p className="font-semibold text-gray-700">{weatherData.data.main.pressure} hPa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-white text-sm opacity-70">
            Designed with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}