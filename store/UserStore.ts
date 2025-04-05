import { getUserAccounts } from "@/app/actions/User/userAction";
import { create } from "zustand";

type Account = {
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
    emailAddress:string,
    image:string

    setEmailAddress: (emailAddress:string) => void,
    setImage: (image:string) => void 
}

export const useCurrentAccount = create<SelectedAccount>((set) => ({
    emailAddress:"",
    image:"",

    setEmailAddress: (emailAddress) => set(() => ({emailAddress})),
    setImage: (image) => set(() => ({image}))
}))
