
import { useState } from 'react'
import '../../Styles/table/table.css'

export default function Table({data}){
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

    const handleSort = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0

        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (sortConfig.key === 'name') {
            if (sortConfig.direction === 'asc') {
                return aValue.localeCompare(bValue)
            } else {
                return bValue.localeCompare(aValue)
            }
        } else if (sortConfig.key === 'quantity') {
            if (sortConfig.direction === 'asc') {
                return aValue - bValue
            } else {
                return bValue - aValue
            }
        }
        return 0
    })

    const renderData = sortedData.map((item) => {
        return(
            <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                    <div className="color-display">
                        <div 
                            className="color-square" 
                            style={{backgroundColor: item.color}}
                        ></div>
                        <span className="color-text">{item.color}</span>
                    </div>
                </td>
                <td>{item.quantity}</td>
            </tr>
        )
    })

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <span className="sort-icon">▲▼</span>
        }
        return sortConfig.direction === 'asc' ? 
            <span className="sort-icon active">▲</span> : 
            <span className="sort-icon active">▼</span>
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th 
                        className="sortable" 
                        onClick={() => handleSort('name')}
                    >
                        Name {getSortIcon('name')}
                    </th>
                    <th>Color</th>
                    <th 
                        className="sortable" 
                        onClick={() => handleSort('quantity')}
                    >
                        Quantity {getSortIcon('quantity')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {renderData}
            </tbody>
        </table>
    )
}