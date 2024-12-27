import { Link } from 'expo-router';
import { View } from 'react-native';
import useTestList from '~/api/useTestList';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { ImageBox } from '~/components/ui/imageBox';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';

export default function Screen() {
  const { data, isLoading, refetch } = useTestList({});

  if (isLoading) return null;
  return (
    <Container>
      <Wrap type='default' full className=''>
        <View className='flex h-full justify-between pt-12'>
          <View className='items-center justify-center'>
            <ImageBox source={images.img_giftframe} className='h-[45.67px] w-[320px]' />
          </View>
          <View className='items-center px-5'>
            <Text className='text-[24px] font-semibold text-gray03'>액자와 함께 담는</Text>
            <Text className='text-[24px] font-semibold text-gray03'>무료 사진 인화 서비스</Text>
            <View className='items-center pt-6'>
              <Text className='text-[16px] leading-6 text-gray03'>사진 인화 서비스가 포함된 </Text>
              <Text className='text-[16px] leading-6 text-gray03'>프리미엄 액자로 </Text>
              <Text className='mb-4 text-[16px] leading-6 text-gray03'>
                특별한 순간을 완벽하게 간직해 보세요.
              </Text>

              <Text className='text-[16px] leading-6 text-gray03'>액자를 구매하시면 </Text>
              <Text className='text-[16px] leading-6 text-gray03'>사랑하는 사진을 </Text>
              <Text className='text-[16px] leading-6 text-gray03'>고화질로 인화해 배송해 드립니다.</Text>
            </View>
          </View>
          <View className='w-full'>
            <Link href='/upload' asChild>
              <Button variant={'default'}>
                <Text>신청하기</Text>
              </Button>
            </Link>
          </View>
        </View>
      </Wrap>
    </Container>
  );
}
