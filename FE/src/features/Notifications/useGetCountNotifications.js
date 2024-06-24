import { useQuery } from "@tanstack/react-query"
import { apigetCheckNotifications } from "./apiGetCheckNotifications"

export const useCountNotifications = (idUser) => {
    const {data: countNotifications, isLoading, error, refetch} = useQuery({
        queryKey: ['countNotifications'],
        queryFn: () => apigetCheckNotifications(idUser)
    })
    if(error) {
        console.log(error)
        throw new Error("Could not fetch data posts")
    }
    
    return {countNotifications, isLoading, error, refetch}
}