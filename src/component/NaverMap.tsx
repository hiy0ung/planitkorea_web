<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react';

type Point = {
  lat: number;
  lng: number;
}

type Address = {
  address: string;
}

const apiKey = process.env.REACT_APP_NAVER_API;
const NAVER_MAP_API = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=`;

const NaverMap: React.FC<Address> = ({ address }) => {
  const [addressMessage, setAddressMessage] = useState<string>('');
  const [latLng, setLatLng] = useState<Point | null>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    // 주소가 없으면 기본값 처리
    if (!address) {
      setAddressMessage('주소가 존재하지 않습니다.');
      setLatLng(null);
      if (map) {
        map.setCenter(new window.naver.maps.LatLng(37.5665, 126.9784)); // 서울로 기본 설정
      }
      return;
    }

    if (!apiKey) {
      console.error('API 키 에러');
      return;
    }

    // 네이버 지도 API 로드
    const script = document.createElement('script');
    script.src = `${NAVER_MAP_API}${apiKey}`;
    script.onload = () => {
      if (!window.naver || !window.naver.maps) {
        console.error('네이버 지도 객체가 없습니다.');
        return;
      }

      // 주소를 좌표로 변환
      window.naver.maps.Service.geocode(
        { query: `${address}` },
        function (status, response) {
          if (status !== window.naver.maps.Service.Status.OK) {
            setAddressMessage('주소 변환 실패');
            return;
          }
          const result = response.v2.addresses[0];
          if (result) {
            setLatLng({
              lat: parseFloat(result.y),
              lng: parseFloat(result.x),
            });
          } else {
            setAddressMessage('주소 결과를 찾을 수 없습니다.');
          }
        }
      );
    };
    script.onerror = () => {
      console.error('지도 로드 실패');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address, apiKey, map]);

  useEffect(() => {
    if (!latLng) return;

    if (map) {
      map.setCenter(new window.naver.maps.LatLng(latLng.lat, latLng.lng));
      return;
    }

    const newMap = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(latLng.lat, latLng.lng),
      zoom: 16,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latLng.lat, latLng.lng),
      map: newMap,
    });

    setMap(newMap);
  }, [latLng]);

  return (
    <>
      {address ? (
        <div id="map" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
      ) : (
        <p>{addressMessage}</p>
      )}
    </>
  );
};

export default NaverMap;
>>>>>>> 4ab1ddc (chore:프로젝트 구조 정리 및 파일 이동)
