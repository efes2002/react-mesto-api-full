import {useEffect} from "react";
import React from 'react';

function withOverlayAndEscClose(Component) {
  return ({...props}) => {

    const handleOverlayClose = (e) => {
      if (e.target.className.split(' ').includes('popup')) {
        props.onClose();
      }
    }
    const handleEscClose = (e) => {
      if (e.key === "Escape") {props.onClose();}
    }

    useEffect(()=>{
      document.addEventListener('click', handleOverlayClose);
      document.addEventListener('keydown', handleEscClose);
      return (()=> {
        document.removeEventListener('click',handleOverlayClose);
        document.removeEventListener('keydown', handleEscClose);
      })
      // eslint-disable-next-line
    }, [])

    return <Component {...props}/>
  } ;
}
export default withOverlayAndEscClose;
