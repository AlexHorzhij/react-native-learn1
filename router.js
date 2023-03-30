import { Main } from './navigation/Main';
import { Auth } from './navigation/Auth';

export default function useRouter(auth) {
  if (auth) {
    return <Main />;
  }
  return <Auth />;
}
