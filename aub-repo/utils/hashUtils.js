import CryptoJS from 'crypto-js';

function sha256Hash(str) {
  return CryptoJS.SHA256(str).toString();
}

module.exports = { sha256Hash };