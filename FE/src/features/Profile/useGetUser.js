import { useQuery } from "@tanstack/react-query"
import { apiGetUser } from "../authentications/User/apiGetUser"

export const useGetUser = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['userCurrent'],
        queryFn: () => apiGetUser()
    })
    if(error) {
        console.log(error)
        throw new Error("Could not fetch data posts")
    }
    const userCurrent = data ? data?.data : {}
    return {userCurrent, isLoading, error}
}