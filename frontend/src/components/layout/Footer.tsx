export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-5 mt-0 border-t px-6 sm:px-30">
      <div className="max-w-6xl  flex flex-col md:flex-row justify-between items-start gap-10 text-sm">
        {/* 왼쪽 로고 + 소개 */}
        <div>
          <h2 className="text-lg font-bold mb-2">Loca</h2>
          <p className="text-gray-400">
            동네 이웃들과 소통하고,
            <br />
            정보를 나누는 지역 커뮤니티
          </p>
        </div>

        {/* 가운데 메뉴 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-300">서비스</h3>
          <ul className="text-gray-400 space-y-1">
            <li>
              <a href="#">인기 게시글</a>
            </li>
            <li>
              <a href="#">중고거래</a>
            </li>
            <li>
              <a href="#">모임 모집</a>
            </li>
          </ul>
        </div>

        {/* 오른쪽 연락처 등 */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-300">문의</h3>
          <ul className="text-gray-400 space-y-1">
            <li>Email: loca@example.com</li>
            <li>GitHub: @loca-dev</li>
          </ul>
        </div>
      </div>

      {/* 아래 하단 바 */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Loca. All rights reserved.
      </div>
    </footer>
  );
}
