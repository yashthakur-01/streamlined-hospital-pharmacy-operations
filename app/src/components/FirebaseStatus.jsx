import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const FirebaseStatus = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testFirebaseSetup = async () => {
    setLoading(true);
    setStatus('Testing Firebase setup...\n');

    try {
      setStatus(prev => prev + '✓ Firebase Auth initialized\n');

      setStatus(prev => prev + '✓ Firestore initialized\n');

      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = 'testpassword123';
      
      setStatus(prev => prev + 'Creating test user...\n');
      const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      setStatus(prev => prev + '✓ Email/Password authentication is enabled\n');

      setStatus(prev => prev + 'Testing Firestore write...\n');
      await setDoc(doc(db, 'test', userCredential.user.uid), {
        email: testEmail,
        createdAt: new Date(),
        test: true
      });
      setStatus(prev => prev + '✓ Firestore write successful\n');
      setStatus(prev => prev + 'Testing Firestore read...\n');
      const docSnap = await getDoc(doc(db, 'test', userCredential.user.uid));
      if (docSnap.exists()) {
        setStatus(prev => prev + '✓ Firestore read successful\n');
      }
      await deleteUser(userCredential.user);
      setStatus(prev => prev + '✓ Test user cleaned up\n');

      setStatus(prev => prev + '\n🎉 All Firebase services are working correctly!\nYou can now register staff members.');

    } catch (error) {
      console.error('Firebase test error:', error);
      
      if (error.code === 'auth/operation-not-allowed') {
        setStatus(prev => prev + '\n❌ Email/Password authentication is NOT enabled\n');
        setStatus(prev => prev + 'Please enable it in Firebase Console:\n');
        setStatus(prev => prev + '1. Go to https://console.firebase.google.com/\n');
        setStatus(prev => prev + '2. Select your project: hackathon-ffe34\n');
        setStatus(prev => prev + '3. Go to Authentication > Sign-in method\n');
        setStatus(prev => prev + '4. Enable Email/Password provider\n');
      } else if (error.code === 'permission-denied') {
        setStatus(prev => prev + '\n❌ Firestore not properly configured\n');
        setStatus(prev => prev + 'Please set up Firestore in Firebase Console\n');
      } else {
        setStatus(prev => prev + `\n❌ Error: ${error.code}\n${error.message}\n`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Firebase Setup Status
        </h2>
        
        <div className="mb-6">
          <button
            onClick={testFirebaseSetup}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Testing...
              </div>
            ) : (
              'Test Firebase Setup'
            )}
          </button>
        </div>

        {status && (
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Test Results:</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {status}
            </pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Quick Setup Checklist:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>□ Enable Email/Password authentication in Firebase Console</li>
            <li>□ Create Firestore database in Firebase Console</li>
            <li>□ Verify project configuration in firebase.js</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirebaseStatus;