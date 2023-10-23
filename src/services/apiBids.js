import supabase from './supabase';

export async function getBids() {
  const { data, error } = await supabase.from('Bids').select('*, Users(*), Projects(*)');

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function updateBid(newObj) {
  console.log(newObj.isAccepted);

  const newData = { isAccepted: newObj.isAccepted };

  const { data, error } = await supabase.from('Bids').update(newData).eq('id', newObj.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
