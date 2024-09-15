import React from 'react';

export default function TransportationInfo () {
  return (
    <div className="w-5/6 mx-auto mt-8 text-gray-800">
      <h2 className="text-large md:text-2xl font-bold mt-5 md:mt-14 mb-2 text-center">대중교통</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="hidden md:table-row">
              <th className="border-b border-gray-300 p-2 text-left text-xs md:text-base w-2/5 md:w-1/5">
                출발지
              </th>
              <th className="border-b border-gray-300 p-2 text-left text-xs md:text-base">
                교통편
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14135519.5714453,4505540.5127798,%EC%82%AC%EB%8B%B9%EC%97%AD4%EB%B2%88%EC%B6%9C%EA%B5%AC,21406152,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/transit?c=10.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  사당역 4번 출구
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">7000, 7001</td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14140762.3521074,4508376.5767781,%EA%B0%95%EB%82%A8%EC%97%AD5%EB%B2%88%EC%B6%9C%EA%B5%AC,1677575221,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/transit?c=11.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  강남역 5번 출구
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">3007</td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14141520.3042563,4506622.4028017,%EC%96%91%EC%9E%AC%EC%97%AD(%EC%84%9C%EC%B4%88%EA%B5%AC%EC%B2%AD)9%EB%B2%88%EC%B6%9C%EA%B5%AC,21406651,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/transit?c=11.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  양재역 9번 출구
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">3007</td>
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14148613.4486263,4510819.6798403,%EC%9E%A0%EC%8B%A4%EC%97%AD(%EB%A0%88%EC%9D%B4%ED%81%AC%ED%8C%B0%EB%A6%AC%EC%8A%A4)4%EB%B2%88%EC%B6%9C%EA%B5%AC,21405356,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/transit?c=11.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  잠실역 4번 출구
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">1007-1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-large md:text-2xl font-bold mt-5 md:mt-14 mb-2 text-center">승용차</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="hidden md:table-row">
              <th className="border-b border-gray-300 p-2 text-left text-xs md:text-base w-2/5 md:w-1/5">
                출발지
              </th>
              <th className="border-b border-gray-300 p-2 text-left text-xs md:text-base">
                경로
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 데스크탑 화면에서 전체 경로를 표시 */}
            <tr className="hidden md:table-row">
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14143173.5879377,4480958.1030946,%EB%8F%99%EC%88%98%EC%9B%90IC,19213690,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/car?c=14.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  동수원 IC
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                중소기업지원센터 → 효성사거리(원형육교) → 아주대학교
              </td>
            </tr>
            <tr className="hidden md:table-row">
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14149128.9580562,4476399.2678237,%EC%88%98%EC%9B%90%EC%8B%A0%EA%B0%88IC,19293727,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/car?c=14.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  수원 신갈 IC
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                원천유원지 삼거리 → 국립지리원 → 아주대학교
              </td>
            </tr>
            <tr className="hidden md:table-row">
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14139797.2677819,4474197.6754229,%EC%88%98%EC%9B%90%EB%B2%84%EC%8A%A4%ED%84%B0%EB%AF%B8%EB%84%90,11562241,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/car?c=14.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  수원 버스 터미널
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                시청사거리 → 농협사거리 → 뉴코아아울렛 → 효성사거리(원형육교) → 아주대학교
              </td>
            </tr>
            <tr className="hidden md:table-row">
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                <a
                  href="https://map.naver.com/p/directions/14137544.3950592,4476234.3926054,%EC%88%98%EC%9B%90%EC%97%AD%20(%EA%B3%A0%EC%86%8D%EC%B2%A0%EB%8F%84),19546226,PLACE_POI/14142622.5119305,4478532.1775836,%EC%97%94%ED%8F%AC%EC%9C%A0%EB%8C%80%ED%95%99%EC%97%B0%ED%95%A9%EA%B8%B0%EC%88%A0%EC%A7%80%EC%A3%BC%ED%9A%8C%EC%82%AC,1121371370,PLACE_POI/-/car?c=14.00,0,0,0,dh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline"
                >
                  수원역
                </a>
              </td>
              <td className="border-b border-gray-200 p-2 text-xs md:text-base">
                도청사거리 → 매교사거리 → 중동사거리 → 성빈센트 병원 → 동수원 사거리 → 아주대삼거리 → 아주대학교
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-12"></div>
    </div>
  );
};