import { AuthenticatedUser } from "@/lib/interfaces/authentication.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function createGlobalState<T>(
  queryKey: unknown,
  initialData: T | null = null
) {
  const queryClient = useQueryClient();
  return function () {
    const { data } = useQuery({
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(initialData),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    function setData(data: Partial<T>) {
      queryClient.setQueryData([queryKey], data);
    }

    function resetData() {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      queryClient.refetchQueries({
        queryKey: [queryKey],
      });
    }

    return { data, setData, resetData };
  };
}
