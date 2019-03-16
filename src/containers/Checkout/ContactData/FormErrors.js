import React from 'react';

const formErrors = props => (
    Object.keys(props.formErrors).map((fieldName, i) => {
        if(props.formErrors[fieldName].length > 0) {
            return <p key={i}>{fieldName} : {props.formErrors[fieldName]}</p>
        } else return null;
    })
);

export default formErrors;