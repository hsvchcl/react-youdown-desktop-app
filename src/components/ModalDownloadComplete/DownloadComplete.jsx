import { Modal, Spacer, Image, Tag } from "@geist-ui/core";
import { X } from "@geist-ui/icons";
import SuccessSvg from "../../assets/sucess.svg";
import ErrorSvg from "../../assets/error.svg";
export const ModalDownloadMessage = ({
  open,
  setOpenCloseModalDownloadMessage,
  downloadInfo,
}) => {
  return (
    <Modal
      visible={open}
      disableBackdropClick
      backdropClassName="modal__blured"
    >
      {downloadInfo.status === true && (
        <>
          <Modal.Content style={{ textAlign: "center" }}>
            <Image src={SuccessSvg} width={4}></Image>
            <Spacer h={3} />
            <h4>Descarga Finalizada</h4>
            <p>
              Archivo guardado correctamente en: 
            </p>
            <Tag type="lite">{downloadInfo.path_download}</Tag>
          </Modal.Content>
          <Modal.Action
            passive
            onClick={() => setOpenCloseModalDownloadMessage(false)}
          >
            <X />
            <Spacer w={0.5} />
            Cerrar
          </Modal.Action>
        </>
      )}

      {downloadInfo.status === false && (
        <>
          <Modal.Content style={{ textAlign: "center" }}>
            <Image src={ErrorSvg} width={4}></Image>
            <Spacer h={3} />
            <h4>Ocurrió un error</h4>
            <p>No se pudo completar la descarga 😩</p>
          </Modal.Content>
          <Modal.Action
            passive
            onClick={() => setOpenCloseModalDownloadMessage(false)}
          >
            <X />
            <Spacer w={0.5} />
            Cerrar
          </Modal.Action>
        </>
      )}
    </Modal>
  );
};
