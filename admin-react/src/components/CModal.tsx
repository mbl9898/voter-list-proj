import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { VotesModel } from "../interfaces/VotesModel";

interface Props {
  heading?: string;
  body?: string;
  onSubmit?: (event?: any) => void;
  unauthorizedVote?: VotesModel;
  externalButton?: boolean;
  showModalProp?: boolean;
}

const CModal = ({
  heading,
  body,
  onSubmit,
  unauthorizedVote,
  externalButton,
  showModalProp,
}: Props) => {
  const [show, setShow] = useState<boolean | undefined>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setShow(showModalProp);
  }, [showModalProp]);

  return (
    <>
      {!externalButton && (
        <Button
          className="mt-5"
          style={{ width: 50 + "%" }}
          variant="primary"
          onClick={handleShow}
        >
          Submit
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        {body && <Modal.Body>{body}</Modal.Body>}
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              handleClose();
              onSubmit && onSubmit();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CModal;
