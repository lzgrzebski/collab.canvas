import { useLoaderData } from 'react-router-dom';
import { Store } from '../state';

export const useStore = () => useLoaderData() as Store;
