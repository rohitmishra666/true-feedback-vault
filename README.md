# True Feedback

True Feedback is an anonymous feedback and question-answer platform built with Next.js. It leverages NextAuth.js for authentication and MongoDB for data storage. The platform allows users to provide and receive feedback anonymously, fostering honest and open communication.

## Features

- **Anonymous Feedback:** Users can give and receive feedback without revealing their identity.
- **Question and Answer:** A Q&A feature that allows users to ask questions and get answers from the community.
- **Secure Authentication:** NextAuth.js ensures secure user authentication.
- **Responsive Design:** Built with a modern and responsive UI using Tailwind CSS and Radix UI components.
- **Email Notifications:** Integrated email notifications for various actions using Resend and React Email.

## Tech Stack

- **Framework:** Next.js
- **Authentication:** NextAuth.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Email:** Resend, React Email
- **Form Handling:** React Hook Form, Zod
- **Carousel:** Embla Carousel
- **Date Handling:** Day.js

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/true-feedback.git
   cd true-feedback
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=""
   RESEND_API_KEY=""
   NEXTAUTH_SECRET=""
   MAILTRAP_EMAIL=""
   MAILTRAP_PASSWORD=""
   GOOGLE_GENERATIVE_AI_API_KEY=""
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

## Dependencies

Here's a list of the main dependencies used in the project:

- **Next.js:** `next`
- **React:** `react`, `react-dom`
- **NextAuth.js:** `next-auth`
- **MongoDB:** `mongoose`
- **Form Handling:** `react-hook-form`, `@hookform/resolvers`
- **Validation:** `zod`
- **Styling:** `tailwindcss-animate`, `tailwind-merge`, `@radix-ui/react-*`
- **Email:** `nodemailer`, `react-email`, `@react-email/components`
- **Carousel:** `embla-carousel-react`, `embla-carousel-autoplay`
- **Date Handling:** `dayjs`
- **Miscellaneous:** `axios`, `bcryptjs`, `clsx`, `usehooks-ts`, `uuid`

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Commit your changes with a descriptive commit message.
5. Push your branch to your forked repository.
6. Open a pull request to the main repository.

## License

This project is licensed under the MIT License.

Happy coding!
