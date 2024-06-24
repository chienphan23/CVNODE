import { useQuery } from "@tanstack/react-query"
import { apiDetailUserOfPost } from "../authentications/User/apiGetUser"

export const useGetDetailUser = (id) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['userDetail'],
        queryFn: () => apiDetailUserOfPost(id)
    })

    if(error) {
        console.log(error)
        return {}
    }
    const userDetail = data ? data?.data : {}
    return {userDetail, isLoading, error}
}