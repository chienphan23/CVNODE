import { useQuery } from "@tanstack/react-query"
import axios from "../../setup/axios"

export const useGetPostWithIdUser = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['postsOfMe'],
        queryFn: () => getPostWithIdUser()
    })
    if(error) {
        console.log(error)
        throw new Error("Could not fetch data posts")
    }
    const posts = data ? data?.data : []
    return {posts, isLoading, error}
}

const getPostWithIdUser = async () => {
    try {
        const post = await axios.get(`/posts/getPostWithIdUser`)
        return post;
    } catch (error) {
        console.log(error)
        return error
    }
}