import React from 'react';
import '../../Styles/Translate/field.css';


const Field = ({label, value, onChange}) => {
    return (
        <div className="Field-wrapper">
            <label>{label}</label>
            <textarea value={value} onChange={e => onChange(e.target.value)} placeholder="Nhập văn bản..." />
        </div>
    )
}

export default Field;