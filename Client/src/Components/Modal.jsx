// import Modal from 'react-bootstrap/Modal'
// import ModalDialog from 'react-bootstrap/ModalDialog'
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalTitle from 'react-bootstrap/ModalTitle'
// import ModalBody from 'react-bootstrap/ModalBody'
// import ModalFooter from 'react-bootstrap/ModalFooter'
// import { useState } from 'react';          

// export default function MyModal() {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         <>
//             <button variant="primary" onClick={handleShow}>
//                 Launch demo modal
//             </button>

//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Modal heading</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//                 <Modal.Footer>
//                     <button variant="secondary" onClick={handleClose}>
//                         Close
//                     </button>
//                     <button variant="primary" onClick={handleClose}>
//                         Save Changes
//                     </button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// //render(<Example />);




// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import Modal from 'react-modal';

// // const customStyles = {
// //   content: {
// //     top: '50%',
// //     left: '50%',
// //     right: 'auto',
// //     bottom: 'auto',
// //     marginRight: '-50%',
// //     transform: 'translate(-50%, -50%)',
// //   },
// // };

// // // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// // //Modal.setAppElement('#yourAppElement');

// // export default function Modal2() {
// //   let subtitle;
// //   const [modalIsOpen, setIsOpen] = React.useState(false);

// //   function openModal() {
// //     setIsOpen(true);
// //   }

// //   function afterOpenModal() {
// //     // references are now sync'd and can be accessed.
// //     subtitle.style.color = '#f00';
// //   }

// //   function closeModal() {
// //     setIsOpen(false);
// //   }

// //   return (
// //     <div>
// //       <button onClick={openModal}>Open Modal</button>
// //       <Modal
// //         isOpen={modalIsOpen}
// //         onAfterOpen={afterOpenModal}
// //         onRequestClose={closeModal}
// //         style={customStyles}
// //         contentLabel="Example Modal"
// //       >
// //         <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
// //         <button onClick={closeModal}>close</button>
// //         <div>I am a modal</div>
// //         <form>
// //           <input />
// //           <button>tab navigation</button>
// //           <button>stays</button>
// //           <button>inside</button>
// //           <button>the modal</button>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // }

// //ReactDOM.render(<Modal2/>, Modal);


// // import React, { useState } from 'react';
// // import {
// //     MDBBtn,
// //     MDBModal,
// //     MDBModalDialog,
// //     MDBModalContent,
// //     MDBModalHeader,
// //     MDBModalTitle,
// //     MDBModalBody,
// //     MDBModalFooter,
// // } from 'mdb-react-ui-kit';

// // export default function Modal() {
// //     //   const [centredModal, setCentredModal] = useState(false);
// //     const [basicModal, setBasicModal] = useState(false);

// //     const toggleShow = () => {
// //         debugger
// //         setBasicModal(!basicModal);
// //     }

// //     return (
// //         <>
// //             <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>
// //             <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
// //                 <MDBModalDialog>
// //                     <MDBModalContent>
// //                         <MDBModalHeader>
// //                             <MDBModalTitle>Modal title</MDBModalTitle>
// //                             <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
// //                         </MDBModalHeader>
// //                         <MDBModalBody>...</MDBModalBody>

// //                         <MDBModalFooter>
// //                             <MDBBtn color='secondary' onClick={toggleShow}>
// //                                 Close
// //                             </MDBBtn>
// //                             <MDBBtn>Save changes</MDBBtn>
// //                         </MDBModalFooter>
// //                     </MDBModalContent>
// //                 </MDBModalDialog>
// //             </MDBModal>
// //         </>
// //     );
// // }


