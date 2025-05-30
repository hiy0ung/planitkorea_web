import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import {
  ImgPickDiv,
  ModalMain,
} from "../DetailSt";
import theme from "../../../styles/theme";
interface ImageSliderProps {
  images?: string[];
}

const ImgInnerDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  width: 100%;
  height: 90%;
  object-fit: cover;
  overflow: hidden;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    border: 2px solid ${theme.palette.primary.dark};
    opacity: 0.8;
  }
`;
const FullImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RightButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;
  position: absolute;
  right: 0;
  top: 40%;
`;

const LeftButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 10;
  position: absolute;
  left: 0;
  top: 40%;
`;

const BackDiv = styled.div`
  background-color: #eee;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageSlider: React.FC<ImageSliderProps> = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedImage, setDisplayedImage] = useState<string>(images[0]);
  const handleThumbClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const src = (e?.currentTarget as HTMLImageElement).src;
    setDisplayedImage(src);
  };
  if (!images.length) return null;
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const visibleImages = [];
  const totalImages = images.length;
  if (totalImages > 0) {
    for (let i = 0; i < 5; i++) {
      visibleImages.push(images[(currentIndex + i) % totalImages]);
    }
  }
  return (
    <>
    <BackDiv>
      <ModalMain>
        <FullImg src={displayedImage}/>
      </ModalMain>
    </BackDiv>
      <ImgPickDiv>
          <ImgInnerDiv>
          <LeftButton onClick={handlePrevClick}>
              <FontAwesomeIcon icon={faBackward} />
            </LeftButton>
            {visibleImages.map((image, index) => (
              <div key={index} style={{ flex: "0 0 20%" }}>
                <Img src={image} alt="이미지" style={{ width: "100%" }} onClick={handleThumbClick} />
              </div>
            ))}
          <RightButton onClick={handleNextClick}>
              <FontAwesomeIcon icon={faForward} />
            </RightButton>
          </ImgInnerDiv>
      </ImgPickDiv>
    </>
  );
};
export default ImageSlider;