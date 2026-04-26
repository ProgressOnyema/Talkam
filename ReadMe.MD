# Talkam - AI Chat Application
Talkam is a MERN-stack-based (MongoDB, ExpressJS, ReactJS, NodeJS) web application built to provide a safe, anonymous, and real-time counseling experience for students. It features a chatbot to foster open conversations about mental health in schools.

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **OpenAI API** - AI chat functionality
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Joi** - Data validation
- **nodemon** - Development server with auto-restart

### Frontend
- **React 19** - JavaScript library for building user interfaces
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Lottie React** - Animation library
- **Embla Carousel** - Carousel component
- **Swiper** - Touch slider
- **Sonner** - Toast notifications
- **Styled Components** - CSS-in-JS styling

## Folder Structure

```
Talkam-Codebase/
├── backend/
│   ├── models/
│   │   ├── session.js
│   │   └── user.js
│   ├── routes/
│   │   ├── chatbot.js
│   │   ├── login.js
│   │   └── signup.js
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── app-components/
│   │   │   ├── Chatbot.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── carousel.jsx
│   │   │       ├── input.jsx
│   │   │       └── label.jsx
│   │   ├── images/
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## Installation & Running the App

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database
- OpenAI API key

### Backend Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/EBEREGIT/react-nodejs-chatgpt-tutorial
   cd react-nodejs-chatgpt-tutorial
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   PORT=8000
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

The backend server will start on port 8000: http://localhost:8000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will open in your browser at: http://127.0.0.1:5173

## Available Scripts

### Backend Scripts
- `npm start` - Start the development server with nodemon
- `npm test` - Run tests (currently not configured)

### Frontend Scripts
- `npm run dev` - Start the development server with Vite
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally


## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## Dependencies
### Backend
* [OpenAI](https://openai.com/)
* [ChatGPT](https://platform.openai.com/)
* [Readline](https://nodejs.org/api/readline.html)
* [Nodejs](https://nodejs.org/en)

### Frontend
* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)

## Installation
* Clone this repo `https://github.com/EBEREGIT/react-nodejs-chatgpt-tutorial`
* Navigate into the repo `cd react-nodejs-chatgpt-tutorial`

* Navigate into the `backend` folder `cd backend`
* Install the dependencies ``npm install``
* Replace the configuration data with your own data in the `index.js` file
* Run the `index.js` file `node index`

*That will start the backend server on port `8000`: http://localhost:8000/*

* Navigate into the `frontend` folder `cd frontend`
* Install the dependencies ``npm install``
* Start the local server ``npm run dev``

*That will open the project on your default browser: http://127.0.0.1:5173/. You can now chat with the AI from your browser*
