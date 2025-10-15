import React from 'react';
import '../Styles/Translate/translate.css';
import Field from '../components/translate/field';
import Languages from '../components/translate/languages';
import TranslateLanguage from '../components/translate/translate';
import '../Styles/Translate/main.css';

export default function TranslateProject() {

  const [language, setLanguage] = React.useState('es');
  const [text, setText] = React.useState('');

  return (
    <div className='container'>
      <Field
        label="Enter text to translate"
        value={text}
        onChange={setText}
      />
      <Languages
        languages={language}
        onlanguagechange={setLanguage}
      />
      <hr />
      <TranslateLanguage
        language={language}
        text={text}
      />
    </div>
  );
}