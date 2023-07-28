// src/stories/Modal.stories.tsx
import React, { useState } from "react";
import { Story, Meta } from "storybook";
import Modal, { ModalProps } from "../../components/Modal";
import LayoutTemplate from "../helpers/Template";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen", // or 'padded', 'centered', etc.
  },
} as Meta;

const Template: Story<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleRequestClose = () => {
    setIsOpen(false);
  };

  return (
    <LayoutTemplate>
      <Modal {...args} isOpen={isOpen} onRequestClose={handleRequestClose}>
        <p>This is a sample modal content</p>
      </Modal>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
    </LayoutTemplate>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onRequestClose: () => {},
};
