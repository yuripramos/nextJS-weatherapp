/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import Box from "@mui/material/Box";
import useSingleDayFormatter, {
  EnumSingleDayItem,
} from "./useSingleDayFormatter";
import {
  aditionalContentWeatherBoxStyle,
  dailyWeatherBoxStyle,
  mainContentWeatherBoxStyle,
} from "../../styles/styles";

function DailyWeatherBox({ singleDay }: EnumSingleDayItem) {
  const { weather, main, currentDay, temperatureSymbol } =
    useSingleDayFormatter({ singleDay });

  return (
    <Box
      height="250px"
      m="10px"
      alignItems="flex-start"
      css={dailyWeatherBoxStyle}
    >
      <div css={aditionalContentWeatherBoxStyle}>{weather.description}</div>
      <div css={mainContentWeatherBoxStyle}>
        {parseInt(main.temp)} {temperatureSymbol}
        <img
          loading="lazy"
          width="80"
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt=""
        />
      </div>

      <div css={aditionalContentWeatherBoxStyle}>{currentDay}</div>
    </Box>
  );
}

export default DailyWeatherBox;
