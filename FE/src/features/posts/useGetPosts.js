import { useQuery } from "@tanstack/react-query";
import { apiGetPosts } from "./apiGetPosts";

export function useGetPosts(){
    const {data, isLoading, error} = useQuery({
        queryKey: ["posts"],
        queryFn: apiGetPosts
    })
    if(error){
        console.log(error)
        throw new Error("Could not fetch data posts")
    }
    return {data, isLoading, error}
}

