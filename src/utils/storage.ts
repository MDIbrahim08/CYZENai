/**
 * SecureStorage - Encrypted localStorage wrapper
 * Uses Base64 encoding with a simple XOR cipher for obfuscation
 * SECURITY NOTE: This is client-side obfuscation, not cryptographic security.
 * For truly sensitive data, use server-side encryption.
 */

// Simple XOR cipher key derived from a static secret
// In production, this could be enhanced with user-specific keys
const CIPHER_KEY = 'PsyStatSecure2024';

/**
 * XOR cipher for basic obfuscation
 * @param text - Text to encrypt/decrypt
 * @param key - Cipher key
 */
function xorCipher(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
}

/**
 * Encode data to Base64
 */
function toBase64(str: string): string {
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    ));
  } catch {
    console.error('SecureStorage: Encoding failed');
    return '';
  }
}

/**
 * Decode data from Base64
 */
function fromBase64(str: string): string {
  try {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    console.error('SecureStorage: Decoding failed');
    return '';
  }
}

/**
 * Encrypt data for storage
 */
function encrypt(data: string): string {
  const ciphered = xorCipher(data, CIPHER_KEY);
  return toBase64(ciphered);
}

/**
 * Decrypt data from storage
 */
function decrypt(encryptedData: string): string {
  const decoded = fromBase64(encryptedData);
  return xorCipher(decoded, CIPHER_KEY);
}

/**
 * Storage key prefix for namespacing
 */
const STORAGE_PREFIX = 'psystat_';

/**
 * Validate storage key to prevent injection
 * @param key - Storage key to validate
 */
function validateKey(key: string): boolean {
  // Only allow alphanumeric characters, underscores, and hyphens
  const keyPattern = /^[a-zA-Z0-9_-]+$/;
  if (!keyPattern.test(key)) {
    console.error('SecureStorage: Invalid key format');
    return false;
  }
  // Limit key length to prevent DoS
  if (key.length > 100) {
    console.error('SecureStorage: Key too long');
    return false;
  }
  return true;
}

/**
 * Validate data size to prevent storage quota issues
 * @param data - Data to validate
 */
function validateDataSize(data: string): boolean {
  // Limit to 5MB per item (localStorage typical limit is 5-10MB total)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (data.length > MAX_SIZE) {
    console.error('SecureStorage: Data exceeds maximum size');
    return false;
  }
  return true;
}

export const SecureStorage = {
  /**
   * Store encrypted data
   * @param key - Storage key (alphanumeric, underscores, hyphens only)
   * @param value - Value to store (will be JSON stringified)
   */
  set<T>(key: string, value: T): boolean {
    if (!validateKey(key)) return false;
    
    try {
      const jsonString = JSON.stringify(value);
      
      if (!validateDataSize(jsonString)) return false;
      
      const encrypted = encrypt(jsonString);
      localStorage.setItem(STORAGE_PREFIX + key, encrypted);
      return true;
    } catch (error) {
      console.error('SecureStorage: Failed to store data', error);
      return false;
    }
  },

  /**
   * Retrieve and decrypt data
   * @param key - Storage key
   * @param defaultValue - Default value if key doesn't exist
   */
  get<T>(key: string, defaultValue: T): T {
    if (!validateKey(key)) return defaultValue;
    
    try {
      const encrypted = localStorage.getItem(STORAGE_PREFIX + key);
      
      if (!encrypted) return defaultValue;
      
      const decrypted = decrypt(encrypted);
      
      if (!decrypted) return defaultValue;
      
      return JSON.parse(decrypted) as T;
    } catch (error) {
      console.error('SecureStorage: Failed to retrieve data', error);
      return defaultValue;
    }
  },

  /**
   * Remove stored data
   * @param key - Storage key
   */
  remove(key: string): boolean {
    if (!validateKey(key)) return false;
    
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (error) {
      console.error('SecureStorage: Failed to remove data', error);
      return false;
    }
  },

  /**
   * Clear all PsyStat storage data
   */
  clearAll(): boolean {
    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('SecureStorage: Failed to clear data', error);
      return false;
    }
  },

  /**
   * Check if key exists
   * @param key - Storage key
   */
  has(key: string): boolean {
    if (!validateKey(key)) return false;
    return localStorage.getItem(STORAGE_PREFIX + key) !== null;
  },
};

/**
 * Create a typed storage helper for specific data types
 */
export function createTypedStorage<T>(key: string, defaultValue: T) {
  return {
    get: () => SecureStorage.get<T>(key, defaultValue),
    set: (value: T) => SecureStorage.set(key, value),
    remove: () => SecureStorage.remove(key),
    has: () => SecureStorage.has(key),
  };
}
