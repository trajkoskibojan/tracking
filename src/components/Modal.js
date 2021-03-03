import React, { Fragment } from 'react';
import styled from 'styled-components';
import Backdrop from './Backdrop';

const ModalS = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  color: black;
  transform: ${(props) =>
    props.show ? 'translateY(0)' : 'translateY(-100vh)'};
  opacity: ${(props) => (props.show ? '1' : '0')};
`;

const Modal = ({ show, modalClosed, children }) => {
  return (
    <Fragment>
      <Backdrop show={show} clicked={modalClosed} />
      <ModalS show={show}>{children}</ModalS>
    </Fragment>
  );
};

export default Modal;
