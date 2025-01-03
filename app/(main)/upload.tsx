import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Wrap } from '~/components/layout/\bwrap';
import { Container } from '~/components/layout/container';
import { Button } from '~/components/ui/button';
import { ImageBox } from '~/components/ui/imageBox';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import images from '~/constants/images';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import DialogAddress from '~/components/screen/dialogAddress';
import { supabase } from '~/utils/supabase';
import { decode } from 'base64-arraybuffer';
import useCheckQrcode from '~/api/useCheckQrcode';

export const TForm = z.object({
  qrcode: z.string(),
  name: z.string().min(3, {
    message: '수령인을 입력해주세요. 3자 이상',
  }),
  hp: z.string().regex(new RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/), {
    message: 'examle) 01011112222, 010-1111-2222',
  }),
  zip: z.string().min(3),
  address1: z.string().min(3),
  address2: z.string().min(3, {
    message: '상세주소를 입력해주세요. 3자 이상',
  }),
});

export default function Screen() {
  const router = useRouter();
  const { qrcode } = useLocalSearchParams<{ qrcode: string }>();
  const { data, isLoading } = useCheckQrcode({ qrcode: qrcode });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof TForm>>({
    mode: 'onChange',
    resolver: zodResolver(TForm),
    defaultValues: {
      qrcode: qrcode,
    },
  });

  //todo - refector
  const [image, setImage] = useState<string | null>(null);
  const [imageResult, setImageResult] = useState<ImagePicker.ImagePickerResult>();

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    setImageResult(result);
    // console.log('dddd  ', result);
    /*
    {
      "canceled": false,
      "assets": [
              {
              "uri": "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/ ........",
              "width": 500,
              "height": 500,
              "type": "image",
              "mimeType": "image/jpeg",
              "fileName": "KakaoTalk_Photo_2024-12-09-17-53-34.jpeg",
              "fileSize": 15042,
              "base64": "/9j/4QAYRXhpZgAASUkqAAgAAAAAAAA/Z ........",
              "file": {}
            }
        ]
    }
    */

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 배송 시작
  const onSubmit = async (formData: z.infer<typeof TForm>) => {
    // console.log('onSubmit :: ', data);
    //   {
    //     "name": "31231321",
    //     "hp": "01071230816",
    //     "zip": "11821",
    //     "address1": "경기 의정부시 서광로 101",
    //     "address2": "333213123"
    // }

    //1) 데이터 저장
    const { error } = await supabase.from('order').insert(formData);

    if (error) {
      console.log('fdfdf 에러 발생 ', error);
      return null;
    }

    // 2) 이미지 스토리지 업로드
    const assets = imageResult?.assets;
    if (assets && assets.length > 0) {
      const img = imageResult.assets[0];
      const filePath = `${new Date().getTime()}`;

      const { data: dataStorage, error } = await supabase.storage
        .from('image')
        .upload(`public/${filePath}`, decode(img.base64 || ''), {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/*',
        });

      if (error) {
        console.log('image uplaod 에러 발생 ', error);
        return null;
      }
    } else {
      alert('이미지를 업로드해주세요');
    }

    router.replace('/(main)/complete');
  };

  useEffect(() => {
    if (data === undefined) {
      alert('QR코드가 잘못되었습니다. 올바른 접근이 아닙니다.');
      router.replace('/');
      return;
    }

    if (data?.length <= 0) {
      alert('QR코드가 잘못되었습니다.');
      router.replace('/');
      return;
    }
  }, []);

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
                {image ? (
                  <ImageBox
                    source={{ uri: image }}
                    className='h-[129px] w-[87.755px]'
                    imgContentFit='cover'
                  />
                ) : (
                  <ImageBox source={images.icon_upload} className='h-[60px] w-[60px]' />
                )}
              </View>
              <Button variant={'default'} onPress={uploadImage}>
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
                    <Text className='mb-1 text-[14px]'>
                      수령인
                      {errors.name && (
                        <Text className='text-[12px] text-red-500'>
                          {'  '}
                          {errors.name.message}
                        </Text>
                      )}
                    </Text>
                  </View>
                  <Controller
                    name='name' // TForm 타입에 맞춘다.
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        onBlur={onBlur}
                        value={value || ''}
                        onChangeText={onChange}
                        placeholder='이름을 입력 해주세요.'
                        className='mb-[12px]'
                      />
                    )}
                  />
                </View>
                {/* 2) 핸드폰 번호 */}
                <View>
                  <View>
                    <Text className='mb-1 text-[14px]'>
                      핸드폰 번호{' '}
                      {errors.hp && (
                        <Text className='text-[12px] text-red-500'>
                          {'  '}
                          {errors.hp.message}
                        </Text>
                      )}
                    </Text>
                  </View>
                  <Controller
                    name='hp' // TForm 타입에 맞춘다.
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        onBlur={onBlur}
                        value={value || ''}
                        onChangeText={onChange}
                        placeholder='핸드폰 번호를 입력해주세요'
                        className='mb-[12px]'
                      />
                    )}
                  />
                </View>
                {/* 3) 주소 */}
                <View className={'mb-10'}>
                  <View>
                    <Text className='mb-1 text-[14px]'>주소</Text>
                  </View>
                  <View className='mb-[12px] flex flex-row gap-5'>
                    <Controller
                      name='zip' // TForm 타입에 맞춘다.
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          editable={false}
                          onBlur={onBlur}
                          value={value || ''}
                          onChangeText={onChange}
                          placeholder='우편번호'
                          className='mb-[12px]'
                        />
                      )}
                    />
                    <DialogAddress
                      onSelect={(data) => {
                        setValue('zip', data.zonecode.toString());
                        setValue('address1', data.address.toString());
                      }}
                    />
                  </View>
                  <Controller
                    name='address1' // TForm 타입에 맞춘다.
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        editable={false}
                        onBlur={onBlur}
                        value={value || ''}
                        onChangeText={onChange}
                        placeholder='주소'
                        className='mb-[12px]'
                      />
                    )}
                  />
                  <Controller
                    name='address2' // TForm 타입에 맞춘다.
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <Input
                          onBlur={onBlur}
                          value={value || ''}
                          onChangeText={onChange}
                          placeholder='상세주소'
                          className='mb-[12px]'
                        />
                        {errors.address2 && (
                          <Text className='text-[12px] text-red-500'>
                            {'  '}
                            {errors.address2.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                </View>
              </View>
            </View>
            <View className='w-full'>
              <Button
                variant={'default'}
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit(onSubmit)}>
                <Text>배송 시작하기</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
