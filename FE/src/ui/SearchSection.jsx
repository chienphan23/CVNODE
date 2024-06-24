import { useEffect, useState } from "react"
import { searchUsers } from "../features/Search/apiSearch"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateSearch } from "../features/Search/searchSlice"

export const SearchSection = () => {
    const dispatch = useDispatch();
    const searchRedux = useSelector((state) => state.search)

    const [nameSearch, setNameSearch] = useState("")
    const [isSearched, setIsSearched] = useState(false)
    const [resultSearch, setResultSearch] = useState([])
    const onChangeSearch = (e) => {
         setNameSearch(e.target.value)
    }
    const onSubmitSearch = async (e) => {
        e.preventDefault()
        setIsSearched(true)
        console.log("this is submit")
        const result = await searchUsers(nameSearch)
        setResultSearch(result)
        dispatch(updateSearch({nameSearch, result}))
    }

    useEffect(() =>{
        if(searchRedux.nameSearch !== "" && searchRedux.resultSearch.length !== 0){
            setIsSearched(true)
            setNameSearch(searchRedux.nameSearch)
            setResultSearch(searchRedux.resultSearch)
        }
    }, [])
    useEffect(() => {
        if(nameSearch === ""){
            setIsSearched(false)
        }
    }, [nameSearch])

    return(
        <>
        {console.log(searchRedux)}
        <form onSubmit={(e) => onSubmitSearch(e)}>
            <div style={{display: "flex", alignItems: "center"}}>
                <img src= {`/icons/searchActive.png`} alt="icon" style={{width: "30px",height: "30px", boxSizing: "border-box", padding: "5px"}}/>
                <input onChange={(e) => onChangeSearch(e)} placeholder="Nhập tên bạn bè để tìm kiếm" style={{width: "80%", border: "0.5px solid #ccc",borderRadius: "8px",padding:"4px"}} value={nameSearch}/>
                <button type="submit" style={{backgroundColor: "#1877f2", color: "white", boxSizing: "border-box", padding: "8px 10px", display: "inline-block", borderRadius: "6px", fontWeight: "600", margin: "5px 0", border: "none"}} >Tìm</button>
            </div>
        </form>
        
        {
            isSearched ?
            resultSearch.length > 0 ?
                <div>
                <div>Có tổng cộng {resultSearch.length} kết quả tìm kiếm.</div>
                {
                    resultSearch.map((user,index) => 
                        <Link to={`/home/${user.id}`} style={{height: "60px", border: "0.5px solid #ccc", borderRadius: "4px", width: "80%", display:"block"}} key={user.id+index}>
                            <img src={`http://localhost:3000/imgPost/${user.avatar}`} alt="avatar" width={"44px"} height={"44px"} style={{borderRadius: "50%", display: "inline-block"}}/>
                            <strong style={{display: "inline-block", fontSize: "20px", padding: "0 6px", boxSizing: "border-box"}}>{user.name}</strong>
                        </Link>
                    )
                }
                
                </div>
               : 
               <div>Không có người dùng phù hợp</div>
            : 
            <div>
            <p>Những người bạn ở gần bạn</p>
            <div>
                <p>N A</p>
            </div>
        </div>
            
        }
        </>
    )
}