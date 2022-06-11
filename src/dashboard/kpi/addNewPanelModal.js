import React from 'react';
import { Modal, Button } from 'bootstrap-4-react';

function AddNewPanelModal({}) {

  return (
    <>
      <Modal id="exampleModal" fade>
        <Modal.Dialog>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Add New Panel</Modal.Title>
              <Modal.Close>
                <span aria-hidden="true">&times;</span>
              </Modal.Close>
            </Modal.Header>
            <Modal.Body>
              Modal body text goes here.
            </Modal.Body>
            <Modal.Footer>
              <Button secondary data-dismiss="modal">Close</Button>
              <Button primary>Save changes</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default AddNewPanelModal;