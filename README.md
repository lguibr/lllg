# Large Language Learning Gateway (lllg)

Welcome to the **Large Language Learning Gateway (lllg)**, a platform that integrates Next.js and Python to facilitate conversational interactions with data. This project utilizes large language models like GPT-4 alongside Python's robust back-end capabilities to offer a cloud-based interface for file and database interactions through natural language.

*Note: This project is currently a work in progress and not stable. Features and functionality are in active development, and the interface and capabilities may change.*

## Features

- **Conversational Interface**: Users can interact with data through a conversational interface powered by GPT-4, simplifying complex data queries.
- **File and Database Management**: Upload and manage files and databases with ease, leveraging a straightforward web interface.
- **Basic RAG Pattern**: Implement a basic Retrieve-Augment-Generate (RAG) pattern for data retrieval and interaction using large language models.
- **Real-time Processing**: Enjoy real-time updates and responses, ensuring a smooth user experience.
- **Secure Authentication**: Utilize Firebase for robust user authentication, securing access to the platform.

## Technologies Used

- **Frontend**: React, Next.js, Styled Components
- **Backend**: Python, Flask
- **Database**: Firebase, Google Cloud Firestore
- **Storage**: Google Cloud Storage
- **AI and Machine Learning**: OpenAI GPT-4
- **Development Tools**: Git, Vercel (for deployment), Storybook (for UI testing)

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm
- Python 3.8+
- pip
- Virtual environment (recommended)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourgithub/large-language-learning-gateway.git
cd large-language-learning-gateway
```

2. **Set up the Python virtual environment and install dependencies:**

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. **Install Node modules:**

```bash
yarn install
```

### Running the Application

1. **Start the Next.js development server:**

```bash
yarn dev
```

2. **In a new terminal, start the Flask API server:**

```bash
cd api
flask run
```

3. **Navigate to `http://localhost:3000` to view the app.**

## Project Structure

```
large-language-learning-gateway/
├── api/
│   ├── models/
│   ├── services/
│   ├── routes/
│   └── __init__.py
├── app/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   └── styles/
├── public/
│   ├── icons/
│   └── theme.ts
├── .env
├── .gitignore
├── README.md
├── package.json
└── requirements.txt
```

## Contributing

Contributions are welcome! Here’s how to get started:

1. Fork the repository.
2. Create a new branch for your features or fixes.
3. Commit your changes with descriptive messages.
4. Push the branch to your fork.
5. Submit a pull request describing your changes.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE.md](LICENSE.md) file.
