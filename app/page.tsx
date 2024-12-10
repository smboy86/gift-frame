import { Button } from "@/components/ui/button";
import Image from "next/image";

import sampleImage from "../assets/image/test-image.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      {/* 환영 메시지 */}
      <div className="w-full text-center mt-8">
        <h1 className="text-3xl font-bold text-gray-800">
          GiftFramed에 오신 것을 환영합니다
        </h1>
        <p className="mt-2 text-gray-600">
          소중한 순간을 특별한 선물로 만들어드립니다
        </p>
      </div>

      {/* 중앙 이미지 */}
      <div className="flex-1 flex items-center justify-center w-full my-8">
        <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden items-center">
          <Image
            src={sampleImage}
            alt="Sample Frame"
            className="object-cover"
            // fill={true}
            width={473}
            height={307}
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="w-full max-w-md mb-8">
        <Button className="w-full py-6 text-lg font-semibold" size="lg" asChild>
          <Link href={`/order?id=123123`}>지금 신청하기</Link>
        </Button>
      </div>
    </main>
  );
}
