'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      <nav className="bg-white shadow-md max-w-screen-xl mx-auto px-4 md:px-6 h-20 md:h-24 flex justify-between items-center">
        <div className="flex items-center md:w-auto w-full justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={60} height={60} className="mr-3" />
            <div className="hidden md:block">
              <Image
                src="/logo_title.png"
                alt="회사 이름"
                width={200}
                height={60}
              />
            </div>
          </Link>
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image
                src="/logo_title.png"
                alt="(주)엔포유 기술 지주"
                width={150}
                height={45}
              />
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col items-center justify-center w-8 h-8"
            >
              <span className="block w-1.5 h-1.5 bg-black rounded-full mb-1"></span>
              <span className="block w-1.5 h-1.5 bg-black rounded-full mb-1"></span>
              <span className="block w-1.5 h-1.5 bg-black rounded-full"></span>
            </button>
          </div>
        </div>
        <div className="hidden md:flex space-x-10">
          <Link href="/subsidiaries" className="text-lg md:text-xl text-gray-800 hover:text-gray-600">자회사</Link>
          <Link href="/announcement" className="text-lg md:text-xl text-gray-800 hover:text-gray-600">공지사항</Link>
          <Link href="/waytocome" className="text-lg md:text-xl text-gray-800 hover:text-gray-600">오시는 길</Link>
        </div>
        <div
          className={`fixed top-0 right-0 bottom-0 w-56 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? 'shadow-xl transform translate-x-0' : 'transform translate-x-full'
            }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center"
          >
            <span className="block w-5 h-0.5 bg-black rotate-45 absolute"></span>
            <span className="block w-5 h-0.5 bg-black -rotate-45 absolute"></span>
          </button>
          <div className="flex flex-col h-full justify-center items-center space-y-6">
            <Link href="/subsidiaries" className="text-lg md:text-xl text-gray-800 hover:text-gray-600" onClick={handleLinkClick}>자회사</Link>
            <Link href="/announcement" className="text-lg md:text-xl text-gray-800 hover:text-gray-600" onClick={handleLinkClick}>공지사항</Link>
            <Link href="/waytocome" className="text-lg md:text-xl text-gray-800 hover:text-gray-600" onClick={handleLinkClick}>오시는 길</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}