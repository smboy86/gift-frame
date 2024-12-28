import { useQuery } from '@tanstack/react-query';
import { useAuth } from '~/providers/AuthProvider';
import { supabase } from '~/utils/supabase';

type Props = {
  qrcode: string;
};

// type Return = Database['public']['Tables']['schedule']['Row'];
type ReturnValue = {
  created_at: string;
  id: number;
};

const useCheckQrcode = (props: Props) => {
  // const { session } = useAuth(); // 테스트 인 경우 or

  return useQuery<Array<ReturnValue>>({
    queryKey: ['qr'],
    queryFn: async () => {
      // if (isEmpty(session)) return [];

      const { data, error } = await supabase.from('qrcode').select(`*`).eq('qrcode', props.qrcode);

      if (error || !data) {
        throw new Error('An error occurred while fetching data: ' + error?.message);
      }

      return data;
    },
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

export default useCheckQrcode;

// ### 사용부
//  const { data, isLoading, refetch } = useTestList({ date: '' });
