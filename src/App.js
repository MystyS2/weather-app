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

// 1. 앱이 실행되자마자 현재 위치 기반 날씨 정보 출력
// 2. 제공 정보 : 화씨, 섭씨, 도시, 날씨 상태
// 3. 버튼 5개(현재위치 + 다른 도시 4개)
// 4. 도시 버튼을 누르면 도시별 날씨 확인 가능
// 5. 로딩 스피너
function App() {
  // states
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const cities = ["Seoul", "New York", "Osaka", "Paris"];

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
    setLoading(true); // 로딩 시작
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.WEATHER_API_KEY1}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false); // 로딩 종료
  };

  // 도시 이름으로 날씨 정보 가져오는 함수
  const getWeatherByCityName = async (city) => {
    setLoading(true); // 로딩 시작
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.WEATHER_API_KEY1}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false); // 로딩 종료
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
            <div className="spinner">Loading...</div>
          ) : (
            <WeatherBox weather={weather} />
          )}
          <WeatherButton
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
