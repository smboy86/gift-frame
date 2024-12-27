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
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import DialogAddress from '~/components/screen/dialogAddress';

export const TForm = z.object({
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
  // member_cnt: z.string().min(1, {
  //   message: 'err 인원을 선택해주세요',
  // }),
});

export default function Screen() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof TForm>>({
    mode: 'onChange',
    resolver: zodResolver(TForm),
  });

  const router = useRouter();
  const { data, isLoading, refetch } = useTestList({});

  // temp var
  const [valueT, setValueT] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 배송 시작
  const onSubmit = async (data: z.infer<typeof TForm>) => {
    console.log('onSubmit :: ', data);
  };

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
              <Button variant={'default'} disabled={!isValid} onPress={handleSubmit(onSubmit)}>
                <Text>배송 시작하기</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Wrap>
    </Container>
  );
}
