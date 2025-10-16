import { useState } from "react";
import Modal from "../components/modal/modal"
export default function ModalPage() {

    const [showModal, setShowModal] = useState(false);

      const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={handleShowModal}>Open modal</button>
            {
                showModal && <Modal isOpen={showModal} onClose={handleCloseModal} />
            }
        </div>
    )
}