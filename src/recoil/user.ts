import { atom, selectorFamily } from "recoil";

// 로컬스토리지용
// const ssrCompletedState = atom({
//   key: "SsrCompleted",
//   default: false,
// });

// export const useSsrComplectedState = () => {
//   const setSsrCompleted = useSetRecoilState(ssrCompletedState);
//   return () => setSsrCompleted(true);
// };

// const { persistAtom } = recoilPersist();

// export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
//   param.getPromise(ssrCompletedState).then(() => persistAtom(param));
// };

type UserState = {
  isLogin: boolean;
  role: string;
  name: string;
};

export const userState = atom<UserState>({
  key: "userState",
  default: {
    isLogin: false,
    role: "",
    name: "",
  },
});

export const userSelector = selectorFamily({
  key: "userPropertySelector",
  get:
    (property) =>
    ({ get }) => {
      const user = get(userState);

      switch (property) {
        case "isLogin":
          return user && user.isLogin;
        case "role":
          return user && user.role;
        case "name":
          return user && user.name;
        default:
          return null;
      }
    },
  set:
    (property) =>
    ({ set }, newValue: any) => {
      set(userState, (prevUserState: any) => {
        switch (property) {
          case "isLogin":
            return { ...prevUserState, isLogin: newValue };
          case "role":
            return { ...prevUserState, role: newValue };
          case "name":
            return { ...prevUserState, name: newValue };

          default:
            return prevUserState;
        }
      });
    },
});
