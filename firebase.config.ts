import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAA2j_8XeNPJPx5gKn5ePvfQgDAPCaPn38',
  authDomain: 'camping-review-6133b.firebaseapp.com',
  projectId: 'camping-review-6133b',
  storageBucket: 'camping-review-6133b.appspot.com',
  messagingSenderId: '250289566985',
  appId: '1:250289566985:web:d0d1393a6bda34b9544fd8',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
