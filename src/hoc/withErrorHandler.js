import React, { Fragment } from 'react';
import Modal from '../components/Modal';
import useHttpError from '../hooks/http-error';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, clearError] = useHttpError(axios)

        return ( 
          <Fragment>
            <Modal show={error} modalClosed={clearError}>
              {error ? <h4>{error.message}</h4> : null}
            </Modal>
            <WrappedComponent {...props} />
          </Fragment>
        );
    }; 
};
 
export default withErrorHandler;
