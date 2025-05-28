import { useEffect, useState } from "react";
import CharacterCard from "../../components/molecules/characterCard/characterCard";
import { useGetCharactersQuery } from "../../store/apiSlice";
import Outlet from "../../components/layouts/outlets/outlet";
import Pagination from "../../components/molecules/pagination/pagination";
import Loader from "../../components/loader/loader";
import "./home.scss";


const Home=()=>{
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(10);
    const [characterData,setCharacterData]=useState([]);
    const [searchValue,setSearchValue]=useState("");
    const {data:allCharacterData,isLoading:isAllCharacterLoading,isSuccess:isAllCharacterSuccess,isError:isAllCharacterError}=useGetCharactersQuery({ page: page ?? 1, limit: limit ?? 10 ,search:searchValue});

    const handleSearchValue=(value:string)=>{
        setSearchValue(value);
    }
    useEffect(()=>{
        if(isAllCharacterSuccess && allCharacterData && allCharacterData?.data?.characters)
        {
            setCharacterData(allCharacterData?.data?.characters ??[])
        }
    },[searchValue,page,limit,isAllCharacterSuccess,allCharacterData])

    useEffect(()=>{
        if(searchValue)
        {
            setPage(1);
            setLimit(10);
        }

    },[searchValue])

    return(
        <Outlet searchHandler={handleSearchValue}>
            {isAllCharacterLoading ? <div className="loader-container"><Loader/></div> : (  
            <>
            <CharacterCard data={characterData ?? []}/> 
            <Pagination
             currentPage={page}
             totalPages={Math.ceil(allCharacterData?.data?.totalCharacters/ limit) ?? 1}
             onPageChange={(newPage) => setPage(newPage)}
             />
            </>
            )} 
        </Outlet>
    )

}
export default Home;