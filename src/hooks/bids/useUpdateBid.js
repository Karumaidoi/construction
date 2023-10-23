import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBid } from '../../services/apiBids';

export function useUpdateBid() {
  const queryClient = useQueryClient();
  const {
    mutate: editBid,
    isLoading: isEditingBid,
    error,
  } = useMutation({
    mutationFn: updateBid,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bids'],
      });
      toast.success('Bid updated successfull');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { editBid, isEditingBid, error };
}
