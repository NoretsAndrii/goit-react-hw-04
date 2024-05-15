import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(51, 48, 48, 0.75)',
    zIndex: '999',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: '0px solid transparent',
  },
};
Modal.setAppElement('#root');

export default function ImageModal({ isOpen, setModalIsOpen, modalImage }) {
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div id="modal">
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <img src={modalImage} alt="" />
      </Modal>
    </div>
  );
}
