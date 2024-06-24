import { useQuery } from "@tanstack/react-query"
import { getMessage } from "./apiCreateMessage"

export const useGetMessage = (conversation) => {
    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ['messageOld'],
        queryFn: () => getMessage(conversation),
        enabled: false  // ngăn không cho tự động tải
    })
    if(error) {
        console.log(error)
        throw new Error("Could not fetch message old")
    }
    
    return {data, isLoading, error, refetch}
}