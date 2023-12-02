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
  username: string;
  nonMember: {
    name?: string;
    phone?: number;
  };
};

export const userState = atom<UserState>({
  key: "userState",
  default: {
    isLogin: false,
    role: "",
    username: "",
    nonMember: {
      name: "", // 비회원용
      phone: 0, // 비회원용
    },
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
        case "nonMember":
          return user && user.nonMember;
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
          case "nonMember":
            return {
              ...prevUserState,
              nonMember: {
                name: newValue.name,
                phone: newValue.phone,
              },
            };
          default:
            return prevUserState;
        }
      });
    },
});
