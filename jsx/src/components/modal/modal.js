import "./modal.css";

export default function Modal({isOpen, onClose}) {


    const data = [
        <p>hello everyone! this is a modal component.</p>
    ]

    const handleCloseModal = () => {
        onClose();
    }


  return (
    <div className="modal">
      { isOpen && data && data.length > 0 && (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="title"> Modal</h2>
                </div>
                <div className="modal-body">
                    {data.map((item, index) => (
                        <div key={index} className="modal-item">
                            {item}
                        </div>
                    ))}
                </div>
                <button className="close-button" onClick={handleCloseModal}>
                        close
                    </button>
            </div>
        </div>
      )}
    </div>
  );
}