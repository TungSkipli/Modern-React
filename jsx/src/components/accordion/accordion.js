import { useState } from "react"

export default function Accordion({items = []}) {
    console.log('Accordion component rendered with items:', items)
    const [explaned, setExplaned] = useState(null)

    const handleToggle = (index) => {
        setExplaned(explaned === index ? null : index)
    }

    const render = items.map((item, index) => {
        const isExplaned = index === explaned
        return (
            <div key={item.id}>
                <div onClick={() => handleToggle(index)} style={{cursor: 'pointer', padding: '10px', border: '1px solid #ccc', marginBottom: '5px'}}>
                    {item.label}
                </div>
                {isExplaned && (
                    <div style={{padding: '10px', backgroundColor: '#f5f5f5', marginBottom: '10px'}}>
                        {item.content}
                    </div>
                )}
            </div>
        )
    })

    return (
        <div>{render}</div>
    )

}