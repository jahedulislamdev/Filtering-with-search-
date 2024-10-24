import { useEffect, useState } from "react";
const App = () => {
  const [dynamicValue, setDynamicValue] = useState('');
  const handleInputValue = (e) => {
    setDynamicValue(e.target.value);
  }
  const handleSearchTerm = (searchTerm) => {
    console.log("search", searchTerm)
    setDynamicValue(searchTerm)
  }
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetch("data.json").then(res => res.json()).then(data => setResult(data));
  }, []);
  return (
    <div className="bg-violet-500 lg:w-1/3 md:w-1/2 mx-auto p-10 mt-5 rounded-s">
      <div className="flex justify-start">
        <input type="text" value={dynamicValue} onChange={handleInputValue} className="border outline-0 py-2 rounded-l-lg px-5" placeholder="Find your item here" />
        <button onClick={() => handleSearchTerm(dynamicValue)} className="bg-fuchsia-500 rounded-r-lg p-3 text-white">Search</button>
      </div>
      <ul className="text-white animate-pulse">
        {
          result.filter((item) => {
            const searchText = dynamicValue.toLocaleLowerCase();
            const ItemName = item.itemName.toLocaleLowerCase();
            return searchText && ItemName.startsWith(searchText) && ItemName !== searchText;
          }).slice(0, 5).map((item, idx) => <li className="cursor-pointer ease-in duration-75" onClick={() => handleSearchTerm(item.itemName)} key={idx}>{item.itemName}</li>)
        }
      </ul>
    </div>
  );
};

export default App;