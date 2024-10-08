// css 파일
import "./App.css";
import "./component/RainBackground.css";
import "./component/SunBackground.css";
import "./component/SnowBackground.css";
import "./component/CloudsBackground.scss";
// nextui
import { NextUIProvider } from "@nextui-org/react";
// 리액트, 컴포넌트
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import SunBackground from "./component/SunBackground";
import RainBackground from "./component/RainBackground";
import SnowBackground from "./component/SnowBackground";
import CloudsBackground from "./component/CloudsBackground";
// api key
import config from "./apikey.js";


function App() {
  // states
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [city, setCity] = useState("");
  const cities = ["Seoul", "New York", "Osaka", "Paris"];
  const [btnActive, setBtnActive] = useState("");
  const [apiError, setAPIError] = useState("");

  // 현재 위치 좌표 가져와서 날씨 정보 api 호출
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 날씨 정보 가져와서 state에 저장
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      setLoading(true); // 로딩 시작
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.WEATHER_API_KEY1}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setCity("");
      setBtnActive("");
      setLoading(false); // 로딩 종료
    } catch(error){
      setAPIError(error.message);
      setLoading(false);
    }

  };

  // 도시 이름으로 날씨 정보 가져오는 함수
  const getWeatherByCityName = async (city) => {
    try{
      setLoading(true); // 로딩 시작
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.WEATHER_API_KEY1}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setCity(city);
      setBtnActive('city');
      setLoading(false); // 로딩 종료
    } catch(error){
      setAPIError(error.message);
      setLoading(false); 
    }

  };

  useEffect(() => {
    getCurrentLocation();
  }, []); // 배열이 비어있으면 componentDidMount 처럼 렌더 후 바로 실행 됨

  const changeBackground = () => {
    switch (weather ? weather.weather[0].main : "") {
      case "Clear":
        return <SunBackground />;
      case "Rain":
        return <RainBackground />;
      case "Thunderstorm":
        return <RainBackground />;
      case "Clouds":
        return <CloudsBackground />;
      case "Snow":
        return <SnowBackground />;
      case "Atmosphere":
        return <CloudsBackground />;
      default:
        return <SunBackground />;
    }
  };

  return (
    <NextUIProvider>
      <div className="view">
        <div className="background">{changeBackground()}</div>
        <div className="info-container">
          {loading ? ( // 로딩 스피너 표시
            <img src='https://64.media.tumblr.com/767288fc52dd8bf80733d1f198be50e4/1c91bcd9bd19a2b2-02/s500x750/b92fcb5ba884cf99e364b422db37977ba1ad7288.gifv' alt="로딩중" width="10%" />
          ) : (
            <WeatherBox weather={weather} />
          )}
          <WeatherButton
            btnState={btnActive}
            cities={cities}
            getWeatherByCityName={getWeatherByCityName} // 도시 이름으로 날씨 가져오는 함수 전달
            getCurrentLocation={getCurrentLocation} // 현재 위치 기반 날씨 함수 전달
          />
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
