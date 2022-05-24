import { Modal, Spacer, Image } from "@geist-ui/core";
import { X } from "@geist-ui/icons";
import CancelSvg from "../../assets/sucess.svg";
export const ModalDownloadMessage = ({ open, setOpenCloseModalDownloadMessage }) => {
  return (
    <Modal
      visible={open}
      disableBackdropClick
      backdropClassName="modal__blured"
    >
      <Modal.Content style={{ textAlign: "center" }}>
        <Image src={CancelSvg} width={4}></Image>
        <Spacer h={3}/>
        <h4>Descarga Finalizada</h4>
        <p>Archivo guardado correctamente en DIRECTORIO</p>
      </Modal.Content>
      <Modal.Action passive onClick={() => setOpenCloseModalDownloadMessage(false)}>
        <X />
        <Spacer w={0.5} />
        Cerrar
      </Modal.Action>
    </Modal>
  );
};
