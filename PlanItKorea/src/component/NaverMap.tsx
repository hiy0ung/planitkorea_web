import React, { useEffect } from 'react';
import { Point } from '../types/type';


interface NaverMapProps {
  point: Point; 
}

const apiKey = process.env.REACT_APP_NAVER_API;

const NaverMap: React.FC<NaverMapProps> = ({ point }) => {

  const option = {
    center: new window.naver.maps.LatLng(point.lat, point.lng),
    zoom: 16,
  }

  

  

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap;