"use client";

import { InputLabel } from "../layout/inputLabel";
import { Button } from "../ui/button";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

export default function Address() {
  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        (document.getElementById("addr") as HTMLInputElement).value =
          data.address;
        (document.getElementById("zipNo") as HTMLInputElement).value =
          data.zonecode;
        document.getElementById("addrDetail")?.focus();
      },
    }).open();
  };

  // return (
  //   <>
  //     <input id="addr" type="text" readOnly onClick={onClickAddr} />
  //     <button onClick={onClickAddr}>검색</button>
  //     <input id="zipNo" type="text" readOnly />
  //     <input id="addrDetail" type="text" />
  //   </>
  // );
  return (
    <>
      <div className="w-full flex justify-between">
        <div className="w-2/3">
          <InputLabel id="zipNo" placeholder="우편번호" disabled />
        </div>
        <div className="w-1/3 px-3">
          <Button
            className="w-full text-sm font-semibold"
            size="sm"
            onClick={onClickAddr}
          >
            주소 찾기
          </Button>
        </div>

        {/* <input id="addr" type="text" /> */}
        {/* <input id="addrDetail" type="text" /> */}
      </div>
      <InputLabel id="addr" placeholder="주소" disabled />
      <InputLabel id="address1" placeholder="상세 주소 입력해주세요" />
    </>
  );
}
