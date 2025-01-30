import { callApi } from "@/libs";
import { useMutation } from "@tanstack/react-query";
import { removeAuthStatus } from "@/actions";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await callApi({
        url: "/auth/logout",
        method: "POST",
      });

      await removeAuthStatus();
    },
  });
}
