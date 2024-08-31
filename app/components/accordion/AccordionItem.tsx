"use client"

import { useRef, useState } from "react";
import styles from "@/app/styles/Accordion.module.css";

const AccordionItem = ({ name, content, isOpen, onClick }: any) => {
  const contentHeight: any = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.question_container} ${
          isOpen ? styles.active : ""
        }`}
        onClick={onClick}
      >
        <p className={`${styles.question_content}`}>{name}</p>
        <span className={`${styles.arrow} ${isOpen ? styles.active : ""}`}>
          <i className="fas fa-chevron-down ms-2"></i>
        </span>
      </button>

      <div
        ref={contentHeight}
        className={`${styles.answer_container} flex-column `}
        style={
          isOpen
            ? { height: contentHeight.current.scrollHeight + 10 }
            : { height: "0px" }
        }
      >
        {content}
      </div>
    </div>
  );
};

export default AccordionItem;
