import "./header.scss";
import Text from "../../atoms/text/text";
import Input from "../../atoms/input/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


interface IHeader {
  onSearch: (value: string) => void;
}

const Header: React.FC<IHeader> = ({ onSearch }) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (value: string) => {
      setSearchValue(value); // Update local state
      onSearch(value); // Call the parent search handler
    };

  return (
    <div className="m-searchBar">
      <Text fontSize="32" fontWeight="700" color="black" lineHeight="32lh" isPointer onClick={()=>{navigate("/")}}>
        StarWars
      </Text>
      <Input
        type="text"
        value={searchValue}
        isRequired={false}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Header;