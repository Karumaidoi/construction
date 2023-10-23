import { useQuery } from '@tanstack/react-query';
import { getBids } from '../../services/apiBids';

export function useBids() {
  const {
    data: bids,
    isLoading: gettingBids,
    error,
  } = useQuery({
    queryKey: ['bids'],
    queryFn: getBids,
  });

  return { bids, gettingBids, error };
}
