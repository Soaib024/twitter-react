import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import React from "react";

import Modal from "react-modal";
import TweetForm from "./TweetForm";
import Post from "./Post";

const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    
  },
};

Modal.setAppElement(document.getElementById("root"));

function ModalContainer({ profilePic, post }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
   
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="">
      <p onClick={openModal}>
        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
      </p>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="w-full p-12 bg-white lg:w-4/12  mx-auto rounded-2xl sm:h-screen overflow-scroll shadow-2xl"
      >
        <span onClick={closeModal} className="text-right text-gray-500 cursor-pointer">
          X
        </span>
        <Post post={post}></Post>
        <TweetForm profilePic={profilePic} placeholder={"Tweet your reply"} replyTo={post._id}></TweetForm>
      </Modal>
    </div>
  );
}

export default ModalContainer;
