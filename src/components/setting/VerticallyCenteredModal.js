import React, { useImperativeHandle, forwardRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <img
            src={props.prop.img}
            alt={props.prop.btnText}
            style={{ width: "30px" }}
          />
        </div>
        <h4
          style={{
            textAlign: "center",
            fontFamily: "poppins",
            fontSize: "22px",
          }}
        >
          Are you Sure?
        </h4>
        <p
          style={{
            textAlign: "center",
            fontFamily: "poppins",
            fontSize: "12px",
            color: "#777777",
          }}
        >
          {props.prop.text}
        </p>
      </Modal.Body>
      <Modal.Footer
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          style={{
            border: "1px solid #777777",
            background: "none",
            fontFamily: "poppins",
            color: "#777777",
            fontSize: "13px",
            borderRadius: "5px",
          }}
          onClick={props.onHide}
        >
          Cancel
        </Button>
        <Button
          style={{
            background: "red",
            fontFamily: "poppins",
            fontSize: "13px",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={
            props.prop.btnText == "Disconnect Page"
              ? () => props.prop.disConnect()
              : () => props.prop.removeHandler()
          }
        >
          {props.prop.btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const VerticallyCenteredModal = forwardRef((props, ref) => {
  const [modalShow, setModalShow] = React.useState(false);
  useImperativeHandle(ref, () => ({
    alterModalShow: () => {
      setModalShow(!modalShow);
    },
  }));

  return (
    <>
      <MyVerticallyCenteredModal
        prop={props}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
});

export default VerticallyCenteredModal;
