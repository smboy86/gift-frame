// "use client";

import { InputLabel } from "@/components/layout/inputLabel";
import Address from "@/components/page/address";
import { ImageUpload } from "@/components/page/imageUpload";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    id: string | undefined;
  };
};

export default async function Page(props: Props) {
  const { id } = await props.searchParams;

  if (id === undefined || id === null || id === "") redirect("/");

  // const handleOrder = () => {
  //   alert("배송 시작하기!!");
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      {/* container */}
      <div className="w-full max-w-md mb-8">
        {/* 1) 사진 업로드 */}
        <div className="mb-10">
          <p>1. 사진을 업로드 해주세요.</p>
          <ImageUpload />
        </div>
        {/* 2) 배송지 입력 */}
        <div className="mb-10">
          <p>2. 배송지를 입력해주세요</p>
          <InputLabel id="name" label="수령인" placeholder="입력해주세요." />
          <InputLabel id="hp" label="핸드폰번호" placeholder="입력해주세요." />
          <Address />
        </div>
        {/* 하단 버튼 */}
        <div className="w-full max-w-md mb-8">
          <Button className="w-full py-6 text-lg font-semibold" size="lg">
            배송 시작하기
          </Button>
        </div>
      </div>
    </main>
  );
}
