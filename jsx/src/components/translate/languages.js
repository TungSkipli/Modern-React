import React ,{useState} from 'react';
import '../../Styles/Translate/languages.css';

const LANGUAGES = [
  { label: "Afrikaans", value: "af" },
  { label: "Arabic", value: "ar" },
  { label: "French", value: "fr" },
  { label: "Hindi", value: "hi" },
  { label: "Japanese", value: "ja" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Simplified Chinese", value: "zh-CN" },
  { label: "Spanish", value: "es" },
  { label: "Swahili", value: "sw" },
  { label: "Thai", value: "th" }
];

const Languages = ({languages, onlanguagechange}) => {
    if(languages === undefined) {
        languages = "es";
    }
    const languageConfig = LANGUAGES.find(l => l.value === languages);
    if(!languageConfig) {
        throw new Error(`Unknown language code '${languages}'`);
    }
    const [open , setOpen] = useState(false);

    const onSelect = language => {
        setOpen(false);
        onlanguagechange(language);
    }

    return (
        <div className='language-container'>
            <label className='label'>Select Language</label>
            <div className={`dropdown ${open && "is-active"}`}>
                <div className='dropdown-trigger'>
                    <button className="button" onClick={() => setOpen(!open)}>
                        <span>{languageConfig.label}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" />
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu"> 
                    <div className="dropdown-content">
                        {LANGUAGES.map(({label, value}) => {
                            return (
                                <button
                                    className={`dropdown-item ${value === languages && "is-active"}`}
                                    onClick={() => onSelect(value)}
                                    key={value}
                                    type="button"
                                >
                                    {label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Languages;