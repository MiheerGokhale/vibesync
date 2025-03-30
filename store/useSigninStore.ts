import { create } from "zustand";

interface SigninState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

const useSigninStore = create<SigninState>((set) => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",

    setFirstName: (firstName) => set(() => ({ firstName })),
    setLastName: (lastName) => set(() => ({ lastName })),
    setEmail: (email) => set(() => ({ email })),
    setPassword: (password) => set(() => ({ password })),
}));

export default useSigninStore;
