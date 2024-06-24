import { useQuery } from "@tanstack/react-query";
import { apiGetNotifications } from "../Notifications/apiGetNotifications";

export function useGetNotifications(){
    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ["notifications"],
        queryFn: apiGetNotifications
    })
    if(error){
        console.log(error)
        throw new Error("Could not fetch data posts")
    }
    return {data, isLoading, error, refetch}
}

