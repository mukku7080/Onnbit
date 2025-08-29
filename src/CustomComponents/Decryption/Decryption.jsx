async function decryptWithKey(encryptedData, customKey) {
    try {
        // Step 1: Base64 decode the encrypted data
        const decodedData = atob(encryptedData);
        const iv = new Uint8Array(decodedData.slice(0, 16).split('').map(c => c.charCodeAt(0)));
        const ciphertext = new Uint8Array(decodedData.slice(16).split('').map(c => c.charCodeAt(0)));

        // Step 2: Derive the key (SHA-256 hash of customKey)
        const encoder = new TextEncoder();
        const keyMaterial = encoder.encode(customKey);
        const keyHash = await crypto.subtle.digest('SHA-256', keyMaterial);

        // Step 3: Import the key
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyHash,
            { name: 'AES-CBC' },
            false,
            ['decrypt']
        );

        // Step 4: Decrypt the data
        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: 'AES-CBC', iv: iv },
            cryptoKey,
            ciphertext
        );

        // Step 5: Convert decrypted data to string
        const decoder = new TextDecoder();
        const decryptedData = decoder.decode(decryptedBuffer);

        // Step 6: Parse JSON if possible
        try {
            return JSON.parse(decryptedData);
        } catch (e) {
            return decryptedData;  // Return as plain text if not JSON
        }
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Decryption failed.');
    }

}
export default decryptWithKey;