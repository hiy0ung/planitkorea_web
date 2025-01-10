import React from "react";
import springImg from "../../assets/images/mainImg/spring.jpg";
import summerImg from "../../assets/images/mainImg/summer.jpg";
import fallImg from "../../assets/images/mainImg/fall.jpg";
import winterImg from "../../assets/images/mainImg/winter.jpg";
import styled from "styled-components";

type Season = "spring" | "summer" | "fall" | "winter";

function getSeason(date: Date): "spring" | "summer" | "fall" | "winter" {
  const month = date.getMonth();
  if (month >= 3 && month <= 5) {
    return "spring";
  } else if (month >= 6 && month <= 8) {
    return "summer";
  } else if (month >= 9 && month <= 10) {
    return "fall";
  } else {
    return "winter";
  }
}

const images: { [key in Season]: string } = {
  spring: springImg,
  summer: summerImg,
  fall: fallImg,
  winter: winterImg,
};

const ImgDiv = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

export default function HomeImg() {
  const currentSeason = getSeason(new Date());
  console.log("Current Season:", currentSeason);
  return (
    <>
      <ImgDiv>
        <MainImg src={images[currentSeason]} alt={currentSeason} />
      </ImgDiv>
    </>
  );
}
