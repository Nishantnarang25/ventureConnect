# VentuerConnect

**VentuerConnect** is a platform that connects startups with investors and allows entrepreneurs to pitch their startup ideas. The platform enables investors to discover and invest in promising startups. It offers a seamless experience for both founders and investors, from creating a startup profile to connecting with potential backers.

---

## Features

### Startup Pitching  
Entrepreneurs can post their startup ideas, describing the concept, vision, and funding requirements.
  
### Investor Profile  
Investors can create profiles to showcase their investment interests, portfolio, and connect with startups.

### Startup Discovery  
Investors can browse through a list of startups, discover new ideas, and make informed decisions.
  
### Investment Opportunities  
Investors can choose to invest in the startups they find interesting and communicate with founders.

### Secure Authentication  
The platform provides secure login and registration using **NextAuth**.

### User Dashboard  
Both entrepreneurs and investors get personalized dashboards with an overview of their activities.

---

## Technologies Used

### Frontend
- **Next.js**: A React-based framework that provides server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling the application.

### Backend
- **Firebase**: Firebase Authentication for managing users, Firestore for storing startup data and investment records.
- **NextAuth.js**: For implementing authentication with different providers (Google, GitHub, etc.)

---

## Getting Started

To get started with the development environment locally:

1. Clone the repository - git clone https://github.com/yourusername/VentuerConnect.git

2. Navigate into the project directory - cd VentuerConnect

3. Install dependencies - npm install

4. Set up Firebase
   
  Create a Firebase project in Firebase Console.

  Enable Firebase Authentication and Firestore.

  Add your Firebase credentials to the .env.local file:

  NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
  NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>

5. Run the application locally - npm run dev

6. Open the app in your browser - Visit http://localhost:3000 to see the app in action.




