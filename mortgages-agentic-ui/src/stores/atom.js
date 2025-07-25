import { atom } from 'jotai';

export const userAtom = atom(null);

export const userStateAtom = atom({
  userId: null,
  authToken: null,
});

export const userProfileAtom = atom(null);
