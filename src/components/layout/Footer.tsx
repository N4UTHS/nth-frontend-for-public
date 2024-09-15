import Image from "next/image";
import Link from "next/link";

export default function Footer () {
  return (
    <footer className="bg-white shadow-md mt-auto relative">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex w-full md:w-1/3 mb-6 md:mb-0 justify-between items-center px-12">
            <div className="flex-1 flex justify-center">
              <Link href="/">
                <div className="w-12 h-12 md:w-20 md:h-20 relative">
                  <Image
                    src="/f_logo2.png"
                    alt="Footer Logo 2"
                    layout="fill"
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <Link href="https://www.ajou.ac.kr/kr/index.do" legacyBehavior>
                <a
                  className="w-12 h-12 md:w-20 md:h-20 relative block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/f_logo1.png"
                      alt="Footer Logo 1"
                      layout="fill"
                      className="object-contain"
                    />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-2/3 text-gray-600">
            <div className="grid gap-1 md:gap-4 md:grid-cols-2 text-center md:text-left">
              <p className="mb-2 md:mb-0">
                <strong>Address:</strong> 주소
              </p>
              <p className="mb-2 md:mb-0">
                <strong>Email:</strong> 이메일
              </p>
              <p className="mb-2 md:mb-0">
                <strong>Tel:</strong> 번호
              </p>
              <p>
                <strong>Fax:</strong> 팩스
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};