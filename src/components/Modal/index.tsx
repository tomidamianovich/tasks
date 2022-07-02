import { FC } from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";

type ModalContentProps = {
  title: string;
  onClose: () => void;
  children: JSX.Element;
};

type ModalProps = ModalContentProps;

const modalContainer = document.querySelector("#modal-root") as HTMLElement;

const ModalComponent: FC<ModalContentProps> = ({
  title,
  onClose,
  children,
}) => (
  <div className="modal" tabIndex={-1} role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button onClick={onClose} className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

const Modal: FC<ModalProps> = ({ title, children, onClose }) =>
  ReactDOM.createPortal(
    <ModalComponent title={title} onClose={onClose} children={children} />,
    modalContainer
  );

export default Modal;
