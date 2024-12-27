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
