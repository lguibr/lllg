import React from "react";
import { Story, Meta } from "storybook";
import Text, { TextProps } from "../../components/Text";
import LayoutTemplate from "../helpers/Template";

export default {
  title: "Components/Text",
  component: Text,
  argTypes: {
    as: {
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "pre",
        "sub",
        "sup",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
      control: { type: "select" },
    },
    weight: {
      options: [
        "normal",
        "bold",
        "bolder",
        "lighter",
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
      ],
      control: { type: "select" },
    },
    textDecoration: {
      options: ["none", "underline", "line-through"],
      control: { type: "select" },
    },
    transform: {
      options: ["none", "capitalize", "uppercase", "lowercase"],
      control: { type: "select" },
    },
  },
} as Meta;

const Template: Story<TextProps> = (args) => (
  <LayoutTemplate>
    <Text {...args}>Sample text</Text>
  </LayoutTemplate>
);

export const Default = Template.bind({});
Default.args = {
  as: "p",
  size: "md",
  weight: "normal",
  textDecoration: "none",
  transform: "none",
};

export const Heading = Template.bind({});
Heading.args = {
  ...Default.args,
  as: "h1",
};

export const Capitalize = Template.bind({});
Capitalize.args = {
  ...Default.args,
  transform: "capitalize",
};

export const Uppercase = Template.bind({});
Uppercase.args = {
  ...Default.args,
  transform: "uppercase",
};

export const Lowercase = Template.bind({});
Lowercase.args = {
  ...Default.args,
  transform: "lowercase",
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  ...Default.args,
  size: "lg",
};
