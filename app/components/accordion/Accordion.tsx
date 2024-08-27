import { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ items }: any) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="d-flex flex-column gap-2">
      {items.map((item: any, index: any) => (
        <AccordionItem
          key={index}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
          name={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default Accordion;
