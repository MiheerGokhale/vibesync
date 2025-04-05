"use server"

import { accountDb } from "@/lib/db/accountDb"

export const getUserAccounts = async (userId:string) => {
    return accountDb.getAccounts(userId);
}