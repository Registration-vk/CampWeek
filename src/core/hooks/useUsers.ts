import { NoInfer, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { $api } from "@/core/axios";
import { UserRepository } from "@/services/users";

const userRepository = new UserRepository($api, "/api/v1/user");

export const useUsersAll = () => {
  return useQuery({
    queryKey: ["users/getAll"],
    queryFn: () => userRepository.getAllUsers(),
  });
};

export const useUserById = (userId: number, url: string) => {
  return useQuery({
    queryKey: [url, {userId}],
    queryFn: () => userId > 0 ? userRepository.getUserById(userId) : null,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["users/useCurrentUser"],
    queryFn: () => userRepository.getCurrentProfile(),
  });
};

export const useGenericMutation = <T>(
  func: (data: T) => Promise<AxiosResponse<T>>,
  url: string,
  params?: object,
  updater?: ((oldData: NoInfer<T> | undefined, newData: T) => T) | undefined
) => {
  const queryClient = useQueryClient();
 
  return useMutation<AxiosResponse, AxiosError, T>({ mutationFn: func, 
    onMutate: async (data) => {
      await queryClient.cancelQueries({queryKey: [url, params]});
 
      const previousData = queryClient.getQueryData([url!, params]);
 
      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData, data) : data;
      });
 
      return previousData;
    }, 
    onError: (err, _, context) => {
      queryClient.setQueryData([url!, params], context);
    }, 
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [url, params]});
    } 
  });
 };

export const useUpdate = <T>(
    url: string,
    params?: object,
    updater?: (oldData: NoInfer<T> | undefined, newData: T) => T
) => {
  return useGenericMutation<T>(
    (data) => $api.patch<T>(url, data),
    url,
    params,
    updater
  );
};