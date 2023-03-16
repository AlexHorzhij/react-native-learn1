import { Main } from './navigation/Main';
import { Auth } from './navigation/Auth';
import { Tabs } from './navigation/Tabs';

export default function useRouter(auth) {
  if (auth) {
    return <Main />;
  }

  return <Auth />;
}
