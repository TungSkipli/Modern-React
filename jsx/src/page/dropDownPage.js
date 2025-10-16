import { useState } from "react"
import DropDown from "../components/dropDown/dropDown"
export default function DropDownPage() {
    const [selection, setSelection] = useState(null)

    const options = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' }
    ];
    const handleSelection = (option) => {
        setSelection(option)
    }

    return (
        <div className="">
            <DropDown
            options={options}
            selection={selection}
            onselect={handleSelection}
            />
        </div>
    )
}