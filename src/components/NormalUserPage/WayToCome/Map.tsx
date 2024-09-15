'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

export default function MapComponent () {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
    document.head.appendChild(mapScript);

    const onLoadMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.2821, 127.0477),
        zoom: 15,
      };
      const map = new window.naver.maps.Map('map', mapOptions);

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.2821, 127.0477),
        map: map
      });

      const infowindow = new window.naver.maps.InfoWindow({
        content: '<div style="padding:10px;"><a href="https://map.naver.com/p/directions/-/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/car?c=15.00,0,0,0,dh" target="_blank" style="text-decoration:none; color:#333;">길 찾기</a></div>'
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });
    };

    mapScript.addEventListener('load', onLoadMap);

    return () => {
      mapScript.removeEventListener('load', onLoadMap);
    };
  }, []);

  return (
    <div className="flex justify-center flex-grow">
      <div
        id="map"
        className="relative z-0 w-5/6 h-[650px] md:h-[750px] rounded-[15px] overflow-hidden"
      />
    </div>
  ); 
};