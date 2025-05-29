import "./home.scss";
import { useEffect, useState } from "react";
import CharacterCard from "../../components/molecules/characterCard/characterCard";
import { useGetCharactersQuery } from "../../store/apiSlice";
import Outlet from "../../components/layouts/outlets/outlet";
import Pagination from "../../components/molecules/pagination/pagination";
import Loader from "../../components/loader/loader";
import NoData from "../../components/atoms/noData/noData";
import { AlertCircle } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Home = () => {
  const componentClassName="p-home";
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [characterData, setCharacterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Debounced search value
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const {
    data: allCharacterData,
    isFetching: isAllCharacterFetching,
    isLoading:isAllCharacterLoading,
    isSuccess: isAllCharacterSuccess,
    isError: isAllCharacterError,
  } = useGetCharactersQuery({
    page: page ?? 1,
    limit: limit ?? 10,
    search: debouncedSearchValue,
  });

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (isAllCharacterSuccess && allCharacterData?.data?.characters) {
      setCharacterData(allCharacterData.data.characters ?? []);
    }
  }, [debouncedSearchValue, page, limit, isAllCharacterSuccess, allCharacterData]);

  useEffect(()=>{
    if(isAllCharacterError)
    {
        toast.error("Something went wrong!");
    }
  },[isAllCharacterError])

  useEffect(() => {
    if (searchValue) {
      setPage(1);
      setLimit(10);
    }
  }, [searchValue]);

  return (
    <Outlet searchHandler={handleSearchValue}>
  <div className={`${componentClassName}__wrapper`}>
    {isAllCharacterLoading || isAllCharacterFetching ? (
      <div className={`${componentClassName}__loader-container`}>
        <Loader />
      </div>
    ) : (
      <>
        {characterData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`${componentClassName}__no-data-wrapper`}
          >
            <NoData
              message="No records found"
              icon={<AlertCircle />}
              showButton
              buttonLabel="Reload"
              onButtonClick={() => window.location.reload()}
            />
          </motion.div>
        ) : (
          <CharacterCard data={characterData ?? []} />
        )}
        {/* Always show pagination at the bottom */}
        <div className={`${componentClassName}__pagination-wrapper`}>
          <Pagination
            currentPage={page}
            totalPages={
              Math.ceil(allCharacterData?.data?.totalCharacters / limit) ?? 1
            }
            onPageChange={setPage}
          />
        </div>
      </>
    )}
  </div>
</Outlet>

  );
};

export default Home;
