"use client";
import { fetchUser } from "@/lib/queries";
import { userTokenAtom } from "@/state/userToken";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export const useUser = (queryEnabled = false) => {
  const currentUser = useAtomValue(userTokenAtom);

  return useQuery({
    queryKey: ["user", currentUser?.userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      if (!userId) throw new Error("User not logged in");
      return fetchUser({ userId });
    },
    enabled: queryEnabled && !!currentUser?.userId,
  });
};
