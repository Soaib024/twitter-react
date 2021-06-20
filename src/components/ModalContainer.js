import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import React from "react";

import Modal from "react-modal";
import TweetForm from "./TweetForm";
import Post from "./Post";


Modal.setAppElement(document.getElementById("root"));

function ModalContainer({ profilePic, post }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(e) {
    e.stopPropagation()
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
   
  }

  function closeModal(e) {
    e.stopPropagation()
    setIsOpen(false);
  }

  return (
    <div className="">
      <p onClick={openModal} className="cursor-pointer">
        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
      </p>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
  
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
