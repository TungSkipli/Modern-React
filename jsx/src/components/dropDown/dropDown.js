import { useState } from "react";
import "../../Styles/dropdown/dropdown.css";

export default function DropDown({options , selection, onselect}) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handleSelection = (option) => {
    setIsOpen(false);
    onselect(option)
  }

  const renderedOptions = options.map((option)=>{
    if(selection && option.value === selection.value){
      return null;
    }
    return(
      <li key={option.value} onClick={()=>handleSelection(option)}>
        {option.label}
      </li>
    )
  })

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button onClick={handleClick}>{selection?.label || 'Select...'}</button>
      {isOpen && <ul>{renderedOptions}</ul>}
    </div>
  )
}