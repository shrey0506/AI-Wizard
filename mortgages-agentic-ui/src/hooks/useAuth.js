// hooks/useAuth.js or useAuth.ts
import { useAtomValue } from 'jotai';
import { userStateAtom, userProfileAtom } from '../stores/atom';

const useAuth = () => {
  const userState = useAtomValue(userStateAtom);
  const profile = useAtomValue(userProfileAtom);

  const isAuthenticated = !!(userState?.userId && userState?.authToken);
  const firstName = profile?.firstName + " "+ profile?.lastName || ' ';

  return { isAuthenticated, firstName };
};

export default useAuth;
