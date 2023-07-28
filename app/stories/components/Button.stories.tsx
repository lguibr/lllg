// Button.stories.tsx
import React from "react";
import { Story, Meta } from "storybook";
import StyledButton, { ButtonProps } from "../../components/Button";
import LayoutTemplate from "../helpers/Template";

export default {
  title: "Components/Button",
  component: StyledButton,
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <LayoutTemplate>
    <StyledButton {...args} />
  </LayoutTemplate>
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary Button",
  variant: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled Button",
  variant: "primary",
  disabled: true,
};
