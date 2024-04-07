const firebase = jest.createMockFromModule('firebase/app');

const firestore = jest.fn(() => ({
  collection: jest.fn().mockReturnThis(),
  addDoc: jest.fn().mockResolvedValue({}),
  doc: jest.fn().mockReturnThis(),
  getDoc: jest.fn().mockResolvedValue({ exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue({}) }),
  setDoc: jest.fn().mockResolvedValue({})
}));

const auth = jest.fn(() => ({
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { uid: 'fakeUID', email: 'fakeemail@example.com' } })
}));

firebase.firestore = firestore;
firebase.auth = auth;

export default firebase;
