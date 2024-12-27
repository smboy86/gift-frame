import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import useTestList from '~/api/useTestList';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { ImageBox } from '~/components/ui/imageBox';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';
import * as z from 'zod';
import { useState } from 'react';

export const TForm = z.object({
  title: z.string().min(1, {
    message: 'err 일정 제목을 입력해주세요',
  }),
  member_cnt: z.string().min(1, {
    message: 'err 인원을 선택해주세요',
  }),
});

export default function Screen() {
  const router = useRouter();
  const { data, isLoading, refetch } = useTestList({});

  const [value, setValue] = useState('');

  if (isLoading) return null;
  return (
    <Container>
      <Wrap type='default' className=''>
        <ScrollView className='flex flex-1' showsVerticalScrollIndicator={false}>
          <View className='flex h-full justify-between'>
            <View className='px-5 pt-12'>
              {/* 1) 사진 */}
              <View className='mb-4'>
                <Text className='text-[14px] font-semibold'>1. 사진을 업로드 해주세요</Text>
              </View>
              <View className='flex h-[129px] w-full items-center justify-center bg-[#FEFAE0]'>
                <ImageBox source={images.icon_upload} className='h-[60px] w-[60px]' />
              </View>
              <Button
                variant={'default'}
                onPress={() => {
                  alert('upload');
                }}>
                <Text>이미지 업로드</Text>
              </Button>
              {/* 2) 배송지 */}
              <View className='mb-4 mt-9'>
                <Text className='text-[14px] font-semibold'>2. 배송지를 입력해 주세요</Text>
              </View>
              <View>
                {/* 1) 수령인 */}
                <View>
                  <View>
                    <Text className='mb-1 text-[14px]'>수령인</Text>
                  </View>
                  <Input
                    value={value}
                    onChangeText={setValue}
                    placeholder='이름을 입력 해주세요.'
                    className='mb-[12px]'
                  />
                </View>
                {/* 2) 핸드폰 번호 */}
                <View>
                  <View>
                    <Text className='mb-1 text-[14px]'>핸드폰 번호</Text>
                  </View>
                  <Input
                    value={value}
                    onChangeText={setValue}
                    placeholder='010-0000-0000'
                    className='mb-[12px]'
                  />
                </View>
                {/* 3) 주소 */}
                <View className={'mb-10'}>
                  <View>
                    <Text className='mb-1 text-[14px]'>주소</Text>
                  </View>
                  <View className='mb-[12px] flex flex-row gap-5'>
                    <Input value={value} placeholder='우편번호' />
                    <Button variant={'inline'} size={'inline'}>
                      <Text>주소찾기</Text>
                    </Button>
                  </View>
                  <Input value={value} placeholder='주소' className='mb-[12px]' />
                  <Input value={value} onChangeText={setValue} placeholder='상세주소' className='mb-[12px]' />
                </View>
              </View>
            </View>
            <View className='w-full'>
              <Button
                variant={'default'}
                onPress={() => {
                  router.push('/(main)/complete');
                }}>
                <Text>배송 시작하기</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
