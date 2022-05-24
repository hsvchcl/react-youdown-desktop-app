import { Modal, Spacer } from "@geist-ui/core";
import { X } from "@geist-ui/icons";
export const ModalInfo = ({ open, setOpenCloseModalInfo }) => {
  return (
    <Modal
      visible={open}
      disableBackdropClick
      backdropClassName="modal__blured"
    >
      <Modal.Title>YouDown v1.0</Modal.Title>
      {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
      <Modal.Content style={{ textAlign: "center" }}>
        <p>Aplicación desarrollada por hsvchcl</p>
      </Modal.Content>
      <Modal.Action passive onClick={() => setOpenCloseModalInfo(false)}>
        <X /><Spacer w={.5} />
        Cerrar
      </Modal.Action>
      <Modal.Action>GitHub</Modal.Action>
    </Modal>
  );
};
