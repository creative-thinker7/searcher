import { callApi } from "@/libs";
import { LoginFormRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { saveAuthStatus } from "@/actions";

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginFormRequest) => {
      await callApi({
        url: "/auth/login",
        method: "POST",
        body: data,
      });

      await saveAuthStatus();
    },
  });
}
