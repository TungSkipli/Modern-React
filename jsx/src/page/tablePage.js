import Table from "../components/table/table"

export default function TablePage() {

    const data = [
        {name: 'Apple', color: "red" , quantity: 3},
        {name: 'Banana', color: "yellow", quantity: 4},
        {name: 'Orange', color: "orange", quantity: 2},
        {name: 'Grape', color: "purple", quantity: 1},
        {name: 'Strawberry', color: "pink", quantity: 7},
        {name: 'Watermelon', color: "green", quantity: 6},
    ]

  return (
    <div>
        <Table data={data} />
    </div>
  )
}