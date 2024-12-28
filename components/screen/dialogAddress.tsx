import * as React from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Text } from '~/components/ui/text';
import Postcode from '@actbase/react-daum-postcode';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';

type Props = {
  onSelect: (data: OnCompleteParams) => void;
};
export default function DialogAddress(props: Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} className='h-full'>
      <DialogTrigger asChild>
        <Button variant={'inline'} size={'inline'} className='h-12'>
          <Text>주소찾기</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>주소 검색</DialogTitle>
          <DialogDescription>
            {open && (
              <Postcode
                style={{ flex: 1, width: '100%', zIndex: 999 }}
                jsOptions={{ animation: true }}
                onSelected={(data) => {
                  props.onSelect(data);
                  setOpen(false);
                }}
                onError={function (error: unknown): void {
                  throw new Error('Function not implemented.');
                }}
              />
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>닫기</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*
  {
    "postcode": "",
    "postcode1": "",
    "postcode2": "",
    "postcodeSeq": "",
    "zonecode": "11821",
    "addresss": "경기 의정부시 서광로 101",
    "addresssEnglish": "101 Seogwang-ro, Uijeongbu-si, Gyeonggi-do, Republic of Korea",
    "addresssType": "R",
    "bcode": "4115011300",
    "bname": "산곡동",
    "bnameEnglish": "Sangok-dong",
    "bname1": "",
    "bname1English": "",
    "bname2": "산곡동",
    "bname2English": "Sangok-dong",
    "sido": "경기",
    "sidoEnglish": "Gyeonggi-do",
    "sigungu": "의정부시",
    "sigunguEnglish": "Uijeongbu-si",
    "sigunguCode": "41150",
    "userLanguageType": "K",
    "query": "서광로 101",
    "buildingName": "고산 더 라피니엘",
    "buildingCode": "4115011200100000000000129",
    "apartment": "Y",
    "jibunaddresss": "경기 의정부시 산곡동 710",
    "jibunaddresssEnglish": "710 Sangok-dong, Uijeongbu-si, Gyeonggi-do, Republic of Korea",
    "roadaddresss": "경기 의정부시 서광로 101",
    "roadaddresssEnglish": "101 Seogwang-ro, Uijeongbu-si, Gyeonggi-do, Republic of Korea",
    "autoRoadaddresss": "",
    "autoRoadaddresssEnglish": "",
    "autoJibunaddresss": "",
    "autoJibunaddresssEnglish": "",
    "userSelectedType": "R",
    "noSelected": "N",
    "hname": "",
    "roadnameCode": "3352497",
    "roadname": "서광로",
    "roadnameEnglish": "Seogwang-ro"
}
  */
