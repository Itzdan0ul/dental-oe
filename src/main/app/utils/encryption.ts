import crypto from 'crypto';

/**
 * Hash password using PBDKF2 encryption method  
 * @param password 
 * @returns Promise<string>
 */
export const encrypt = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const salt: string = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex') + ':' + salt);
    });
  });
};

export const compareHash = (userPassword: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const [key, salt] = hash.split(':');
    crypto.pbkdf2(userPassword, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex') === key);
    });
  });
};
