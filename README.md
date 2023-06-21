# lllg - Large Language Learning Gateway

## Project Overview

Welcome to lllg - Large Language Learning Gateway. This project is a unique fusion of Next.js and Python, where Next.js powers the frontend while Flask provides the API backend. This blend allows for the creation of dynamic Next.js applications backed by Python AI libraries.

Our primary objective is to deliver a user-friendly, cloud-based interface. This allows users to upload files, register databases and integrate tools, turning data sources into interactive, conversation-based elements. Employing sophisticated large language models such as GPT-4, lllg invites you to interact with your data in a conversational way never experienced before.

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine for development and testing purposes.

### Setting Up the Environment

We need to create a virtual environment for installing Python dependencies:

```bash
python3 -m venv .venv
```

Then, activate the virtual environment:

```bash
source .venv/bin/activate
```

Next, install the necessary Python dependencies:

```bash
pip install -r requirements.txt
```

Install the required node dependencies using any of the following commands:

```bash
npm install
# or
yarn
# or
pnpm install
```

### Launching the Servers

Run the development server using one of these commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

After the server is running, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In the background, the Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328). If you want to change the port, update it in the `package.json` and `next.config.js` files.

## Explore the new era of data interaction

Start your journey with lllg - Large Language Learning Gateway and interact with your data in a more meaningful, conversation-based way. Whether it's files, databases, or tools, bring them all together under one roof and have productive chat conversations powered by state-of-the-art large language models. Embrace the power of language and turn your data interaction into an insightful conversation. Dive in today!
