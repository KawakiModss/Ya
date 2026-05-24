const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'HIROKO_SUPER_SECRET_KEY_2024';
const GOOGLE_CLIENT_ID = '205977709770-3d0am349pfuhpv45soo1qt5o6h7cbofk.apps.googleusercontent.com';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MONGODB CONNECTION
mongoose.connect('mongodb://localhost:27017/hiroko_ai', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// ========== USER SCHEMA ==========
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  name: { type: String },
  avatar: { type: String, default: '' },
  role: { type: String, default: 'user' },
  premium: { type: Boolean, default: false },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// ========== SESSION SCHEMA ==========
const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Chat Baru' },
  messages: { type: Array, default: [] },
  mode: { type: String, default: 'normal' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Session = mongoose.model('Session', SessionSchema);

// ========== API ENDPOINTS ==========

// REGISTER
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username atau email sudah terdaftar!' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      name: name || username
    });
    
    await user.save();
    
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        premium: user.premium
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error!' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user) {
      return res.status(400).json({ error: 'Username atau password salah!' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Username atau password salah!' });
    }
    
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        premium: user.premium
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error!' });
  }
});

// GOOGLE LOGIN
app.post('/api/google-login', async (req, res) => {
  try {
    const { credential } = req.body;
    
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    
    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    
    if (!user) {
      // BUAT AKUN BARU
      user = new User({
        username: email.split('@')[0] + '_' + Math.floor(Math.random() * 10000),
        email: email,
        name: name,
        avatar: picture,
        googleId: googleId
      });
      await user.save();
    } else if (!user.googleId) {
      // LINK GOOGLE KE AKUN EXISTING
      user.googleId = googleId;
      if (!user.avatar && picture) user.avatar = picture;
      await user.save();
    }
    
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        premium: user.premium
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Google login failed!' });
  }
});

// GET USER SESSIONS
app.get('/api/sessions', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const sessions = await Session.find({ userId: decoded.userId }).sort({ updatedAt: -1 }).limit(50);
    
    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ error: 'Server error!' });
  }
});

// SAVE SESSION
app.post('/api/sessions', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const { sessionId, title, messages, mode } = req.body;
    
    let session;
    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, userId: decoded.userId },
        { title, messages, mode, updatedAt: new Date() },
        { new: true }
      );
    } else {
      session = new Session({
        userId: decoded.userId,
        title: title || 'Chat Baru',
        messages: messages || [],
        mode: mode || 'normal'
      });
      await session.save();
    }
    
    res.json({ success: true, session });
  } catch (error) {
    res.status(500).json({ error: 'Server error!' });
  }
});

// DELETE SESSION
app.delete('/api/sessions/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    const decoded = jwt.verify(token, JWT_SECRET);
    await Session.findOneAndDelete({ _id: req.params.id, userId: decoded.userId });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error!' });
  }
});

app.listen(PORT, () => {
  console.log(` HIROKO Backend running on port ${PORT}`);
});