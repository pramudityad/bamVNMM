import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    CardBody
} from "reactstrap";

const ModalCreateNew = ({
    isOpen, toggle, className, onClosed, title, children
}) => {
    return(
        <div>
             <Modal
          isOpen={isOpen}
          toggle={toggle}
          className={className}
          onClosed={onClosed}
        >
          <ModalHeader toggle={toggle}>
            {title}
          </ModalHeader>
          <ModalBody>
            <CardBody>
              {children[0]}
            </CardBody>
          </ModalBody>
            {children[1]}
        </Modal>
        </div>
    )
}

export default ModalCreateNew;