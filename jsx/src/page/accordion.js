import Accordion from "../components/accordion/accordion";
import data from "../MockData/data";


export default function AccordionPage () {
    console.log('AccordionPage rendered with data:', data)
    return(
        <div className="">
            <h1>Accordion Page</h1>
            <Accordion items={data}/>
        </div>
    )
}