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
        <View className='flex h-full pt-12'>
          <View className='items-center justify-center'>
            <ImageBox source={images.img_giftframe} className='h-[45.67px] w-[320px]' />
          </View>
          <View className='items-center pt-16'>
            <View>
              <ImageBox source={images.icon_clap} className='h-[24px] w-[36px]' />
            </View>
            <Text>신청이 완료됐습니다.</Text>
          </View>
        </View>
      </Wrap>
    </Container>
  );
}
