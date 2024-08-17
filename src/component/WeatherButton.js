import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ getWeatherByCityName, getCurrentLocation }) => { // props로 api 호출 함수 받아옴
  return (
    <div>
      <Button variant="info" onClick={getCurrentLocation}>내 위치</Button>
      <Button variant="info" onClick={() => getWeatherByCityName('New York')}>뉴욕</Button>
      <Button variant="info" onClick={() => getWeatherByCityName('Osaka')}>오사카</Button>
      <Button variant="info" onClick={() => getWeatherByCityName('Paris')}>파리</Button>
    </div>
  );
}

export default WeatherButton;