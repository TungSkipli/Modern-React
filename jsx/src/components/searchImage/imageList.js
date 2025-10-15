import ImageShow from "./imageShow"
import "../../Styles/search/ImageList.css"
export default function ImageList({images}) {

    const renderImage = images.map((image) => {
        return <ImageShow key={image.id} image={image} />
    })
    return (
        <div className="image-list">
            {renderImage}
        </div>
    )
}