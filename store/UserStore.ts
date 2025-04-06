import { getUserAccounts } from "@/app/actions/User/userAction";
import { create } from "zustand";

type Account = {
  accountId: string;
  emailAddress: string;
  image: string;
};

type UserAccount = {
    accounts: Account[]

    setAccounts: (accounts:Account[]) => void 
    fetchAccounts: (userId:string) => Promise<void>;
}

export const useUserAccount = create<UserAccount>((set) => ({
    accounts: [],

    setAccounts: (accounts) => set(() => ({accounts})),

    fetchAccounts: async (userId:string) => {
        try{
            const response = await getUserAccounts(userId);
            const data:Account[]=response.map((account) => {
                return {
                    accountId:account.id,
                    emailAddress:account.emailAddress,
                    image:account.image
                }
            });            

            set(() => ({accounts:data}));
        }catch(error){
            console.error("Error fetching accounts:",error);
        }
    }
}));

type SelectedAccount = {
    accountId:string
    emailAddress:string,
    image:string

    setAccountId: (accountId:string) => void
    setEmailAddress: (emailAddress:string) => void,
    setImage: (image:string) => void 
}

export const useCurrentAccount = create<SelectedAccount>((set) => ({
    accountId:"",
    emailAddress:"",
    image:"",

    setAccountId: (accountId) => set(() => ({accountId})),
    setEmailAddress: (emailAddress) => set(() => ({emailAddress})),
    setImage: (image) => set(() => ({image}))
}))
