import { useQuery } from "@tanstack/react-query"
import { getAllConversation } from "./apiGetAllConversation"

export const useGetConversation = (idUser) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["AllConversation"],
        queryFn: () => getAllConversation(idUser)
    })
    if(error) {
        console.log(error)
        throw new Error("Could not fetch data posts")
    }
    return {data, isLoading}
}