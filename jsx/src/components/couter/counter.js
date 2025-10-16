import { useState } from "react";

export default function Counter() {

    const [count, setCount] = useState(0);
    const [addCount, setAddCount] = useState("");

    const addOne = () => {
        setCount(count + 1);
    }

    const minusOne = () => {
        if (count === 0) {
            return;
        }
        setCount(count - 1);
    }
    const handlechange = (event) => {
        setAddCount(event.target.value);
    }

   const handleSubmit = (event) => {
  
    event.preventDefault();
    const numberToAdd = parseInt(addCount) || 0;
      if (!addCount.trim()) {
        return;
    }else if(isNaN(parseInt(addCount))){
        return;
    }else if(numberToAdd<0){
        return;
    }
    setCount(count + numberToAdd);
    setAddCount("");
   }

    return (
        <div>
            Count is: {count}
            <hr/>
            <button onClick={addOne}>Increase </button>
            <button onClick={minusOne}>Decrement</button>
            <hr/>
            <input
                type="number"
                value={addCount}
                onChange={handlechange}
                placeholder="Enter number to add"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}