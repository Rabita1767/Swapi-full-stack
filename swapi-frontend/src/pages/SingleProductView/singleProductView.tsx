import { useEffect, useState } from "react";
import SingleCharacterCard from "../../components/molecules/singleCharacterCard/singleCharacterCard";
import "./singleProductView.scss";
import { useParams } from "react-router-dom";
import type { CharacterResult } from "../../types/type";
import { useGetCharacterByIdQuery } from "../../store/apiSlice";
import Outlet from "../../components/layouts/outlets/outlet";
import Loader from "../../components/loader/loader";
import { toast } from "react-toastify";

const SingleProductView = () => {
    const {id}=useParams();
    const componentClassName = "p-single-product-view";
    const [singleCharacterData, setSingleCharacterData] = useState<CharacterResult | null>(null);
    const {data: singleCharacterDataResponse, isLoading, isSuccess, isError } = useGetCharacterByIdQuery(id);
    useEffect(()=>{
    if (isSuccess && singleCharacterDataResponse) {
            setSingleCharacterData(singleCharacterDataResponse?.data?.result);
        }
    },[id, isSuccess, singleCharacterDataResponse])

    useEffect(()=>{
      if(isError)
      {
        toast.error("Something went wrong!");
      }

    },[isError])

  return (
    <Outlet isButtonHidden isSearchbarHidden>
        {isLoading ? <div className="loader-container"><Loader/></div> :(
            <>
                <div className={componentClassName}>
                    <SingleCharacterCard data={singleCharacterData} />
                </div>
            </>
        )}
    </Outlet>
  );
}
export default SingleProductView;

