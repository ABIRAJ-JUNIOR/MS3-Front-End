import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowAuthService {

  constructor() { }
  private generateRandomBuffer(length: number): Uint8Array {
    const randomBuffer = new Uint8Array(length);
    window.crypto.getRandomValues(randomBuffer); 
    return randomBuffer;
  }

  async register() {
    const challenge = this.generateRandomBuffer(32);

    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: challenge, 
      rp: { 
        name: "OurAwesomeApp" 
      },
      user: { 
        id: this.generateRandomBuffer(16), 
        name: "user@example.com", 
        displayName: "User Example" 
      },
      pubKeyCredParams: [{ 
        type: "public-key",
        alg: -7
      }],
      authenticatorSelection: { 
        authenticatorAttachment: "platform", 
        userVerification: "required" 
      },
      timeout: 60000, 
      attestation: "direct" 
    };

    try {
      const credential = await navigator.credentials.create({ publicKey }) as PublicKeyCredential;
      this.storeCredential(credential, challenge); // Store the credential details locally for demo purposes
      console.log("Registration successful!", credential);
      return credential; // Return the credential object containing the user's public key and other details
    } catch (err) {
      console.error("Registration failed:", err);
      throw err; // Handle any errors that occur during registration
    }
  }

  async authenticate() {
    const storedCredential = this.getStoredCredential(); 
    if (!storedCredential) {
      throw new Error("No stored credential found. Please register first.");
    }

    const publicKey: PublicKeyCredentialRequestOptions = {
      challenge: new Uint8Array(storedCredential.challenge), 
      allowCredentials: [{ 
        id: new Uint8Array(storedCredential.rawId),
        type: "public-key"
      }],
      userVerification: "required", 
      timeout: 60000 
    };

    try {
      
      const credential = await navigator.credentials.get({ publicKey }) as PublicKeyCredential;
      console.log("Authentication successful!", credential);
      return credential; 
    } catch (err) {
      console.error("Authentication failed:", err);
      throw err; 
    }
  }

  private storeCredential(credential: PublicKeyCredential, challenge: Uint8Array) {
    const credentialData = {
      rawId: Array.from(new Uint8Array(credential.rawId)),
      challenge: Array.from(challenge) 
    };
    localStorage.setItem('webauthn_credential', JSON.stringify(credentialData)); 
  }

  private getStoredCredential(): any {
    const storedCredential = localStorage.getItem('webauthn_credential');
    return storedCredential ? JSON.parse(storedCredential) : null; 
  }
}
