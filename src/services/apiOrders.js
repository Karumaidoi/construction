import { getToday } from '../utils/helpers';
import supabase, { supabaseUrl } from './supabase';

export async function getBooks() {
  const { data, error } = await supabase
    .from('Projects')
    .select('*, Users(*)', { count: 'exact' })
    .order('id', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase.from('Projects').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function createBook(newProject) {
  const projectName = `${Math.random()}-${newProject.image.name}`.replaceAll('/', '');

  const projectPath = `${supabaseUrl}/storage/v1/object/public/projectImages/${projectName}`;

  const { data, error } = await supabase.from('Projects').insert([{ ...newProject, image: projectPath }]);

  if (error) {
    throw new Error(error.message);
  }

  const { error: storageError } = await supabase.storage.from('projectImages').upload(projectName, newProject.image, {
    cacheControl: '3600',
    upsert: false,
  });

  if (storageError) {
    console.log(storageError);
    throw Error('Course Files could not be created');
  }

  return data;
}

export async function getBooksByDate(date) {
  const { data, error } = await supabase
    .from('Bids')
    .select()
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateOrder(newOrder) {
  const orderUpdated = newOrder.newBook;
  const { orderId } = newOrder;

  console.log(orderId, orderUpdated);

  const { data, error } = await supabase.from('Projects').update(orderUpdated).eq('id', orderId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
