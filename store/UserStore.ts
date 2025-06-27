import { create } from "zustand";
import { getUserDetails } from "@/app/actions/getUserDetails"; 

type User = {
  id: number;
  clerkId: string;
  name: string;
  email: string;
  createdAt: string;
  creditsAvailable: number;
  creditsUsed: number;
};

type Store = {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  resetUser: () => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const userData = await getUserDetails();
      if (!userData) {
        set({ user: null, error: "User not found", loading: false });
        return;
      }

      set({
        user: {
          id: userData.id,
          clerkId: userData.clerkId,
          name: userData.name,
          email: userData.email,
          createdAt: userData.createdAt!,
          creditsAvailable: userData.creditsAvailable!,
          creditsUsed: userData.creditsUsed!,
        },
        loading: false,
      });
    } catch (e) {
      set({ error: "Failed to fetch user details", loading: false });
    }
  },

  resetUser: () => set({ user: null, error: null, loading: false }),
}));
