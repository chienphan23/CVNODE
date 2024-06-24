import { useInfiniteQuery } from "@tanstack/react-query"
import Post from "../features/posts/Post"
import { useEffect } from "react"
import { apiGetPosts } from "../features/posts/apiGetPosts"
import { useGetUser } from "../features/Profile/useGetUser"

const Home = () => {
    const {userCurrent} = useGetUser()
    const {data, hasNextPage, fetchNextPage} = useInfiniteQuery({
        queryKey: ['postsInfinite'],
        queryFn: ({pageParam = 1}) => apiGetPosts(pageParam),
        getNextPageParam: (lastPage, allPages) =>  {
            if(lastPage.data.length === 0){
                return undefined
            }
            const nextPage = allPages.length *2
            return nextPage
        }
    })
    
    

    useEffect(() => {
        let fetching = false
        const onScroll = async (e) => {
            const {scrollHeight, scrollTop, clientHeight} = e.target.scrollingElement
            //  tổng thanh cuộn, chiều cao hiện tại, chiều cao của nội dung của khung đang đứng
            if(!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {  // cuộn đến gần cuối trang
                fetching = true
                console.log("alo" + hasNextPage)
                if(hasNextPage) {
                    await fetchNextPage();
                    }else{
                        console.log("hết bài")
                    }
                fetching = false
            }
        }
        document.addEventListener("scroll", onScroll)

        return () => {
            document.removeEventListener("scroll", onScroll)
        }
    }, [fetchNextPage, hasNextPage])// cần truyền vào hasNextPage nếu không hasNextPage sẽ giữ giá trị ban đầu khi mount useEffect là undefinde => luôn false (useEffect không cập nhật lại hasNextPage khi thực hiện)
    
    if(!data) return <h1>Loading</h1>
    // const {data: posts} = data
    // const {user}  = data
    return (
        <>
            <div>
                {data.pages.map(pages => 
                    pages.data.map((post) => <Post post={post} key={post._id} userCurrent={userCurrent}/>)
                )}
           {
            !hasNextPage &&
            <>
                <p style={{textAlign: "center"}}>Bạn đã xem hết bài viết Follow thêm bạn bè để xem thêm 🎉</p>
            </>
           }
            </div>
        </>
    )
}
export default Home