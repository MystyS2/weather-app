import React from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

const WeatherButton = ({
  btnState,
  cities,
  getWeatherByCityName,
  getCurrentLocation,
}) => {
  // props로 api 호출 함수 받아옴
  return (
    <div>
      <Button variant={btnState==""?"bordered":"solid"} color="primary" onClick={getCurrentLocation}>
        My Location
      </Button>
      <Dropdown>
        <DropdownTrigger>
          <Button variant={btnState=="city"?"bordered":"solid"} color="danger">Other Cities</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event "
          onAction={(item) => getWeatherByCityName(item)}
        >
          {cities.map((item) => (
            <DropdownItem key={item} className="text-danger" color="danger">
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default WeatherButton;
