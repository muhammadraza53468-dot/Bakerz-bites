BAKERZ BITE - COMPLETE WEBSITE
================================

FILES
- index.html   : Home page, carousel, products and pagination
- about.html   : About page
- contact.html : Contact page (demo form)
- login.html   : Login page
- signup.html  : Signup page
- style.css    : Main website styles
- app.js       : Product cards, pagination, navbar login/logout state
- auth.css     : Login/signup styles
- auth.js      : Demo signup/login and persistent localStorage session

HOW TO RUN
1. Extract all files into the same folder.
2. Open index.html in your browser, or preferably run the folder with VS Code Live Server.
3. Open Sign Up, create an account, and you will be signed in automatically.
4. The navbar will show Logout while signed in. Click Logout to end the session.
5. The session stays saved in this browser until you log out or clear browser storage.

IMPORTANT SECURITY NOTE
This is a front-end learning/demo authentication system. It stores account details, including passwords,
in browser localStorage, which is NOT secure for real customer accounts. Do not use real passwords.
For a live store, use a server-side authentication backend and securely hashed passwords.
Product images are loaded from Unsplash and Bootstrap/fonts use CDNs, so internet access is needed.
