import { Injectable } from '@angular/core';
import { AuthService } from '../API/Auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WindowAuthService {

  constructor(private authService: AuthService, private rout: Router) { }

  private generateRandomBuffer(length: number): Uint8Array {
    const randomBuffer = new Uint8Array(length);
    window.crypto.getRandomValues(randomBuffer);
    return randomBuffer;
  }

  async register(email: string, password: string) {

    const challenge = this.generateRandomBuffer(32);

    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: challenge, 
      rp: {
        name: "OurAwesomeApp" 
      },
      user: { 
        id: this.generateRandomBuffer(16), 
        name: email,
        displayName: "Way Makers "
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 }
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required"
      },
      timeout: 60000,
      attestation: "direct"
    };

    try {
      let auth = {
        email: email,
        password: password
      }

      const credential = await navigator.credentials.create({ publicKey }) as PublicKeyCredential;

      this.authService.signIn(auth).subscribe({
        next: (res: string) => {
          this.storeCredential(credential, challenge, password, email);
          console.log("Registration successful!", credential);
          return credential;
        }, error: () => {
          this.rout.navigate(['/bio'])
        }
      })

    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  }

  async authenticate() {
    const storedCredential = this.getStoredCredential();
    console.log(storedCredential)
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
      let auth = {
        email: storedCredential.email,
        password: storedCredential.password
      }
      console.log(auth)
      this.authService.signIn(auth).subscribe({
        next: (res: string) => {
          localStorage.setItem('token', res)
        }, error: () => {

        }, complete: () => {
          console.log("User Login Successfull")
          this.rout.navigate(['/home'])
        }
      })
      return credential;
    } catch (err) {
      console.error("Authentication failed:", err);
      throw err;
    }
  }

  private storeCredential(credential: PublicKeyCredential, challenge: Uint8Array, password: string, email: string) {
    const credentialData = {
      rawId: Array.from(new Uint8Array(credential.rawId)),
      challenge: Array.from(challenge),
      email: email,
      password
    };
    localStorage.setItem('webauthn_credential', JSON.stringify(credentialData));
  }

  private getStoredCredential(): any {
    const storedCredential = localStorage.getItem('webauthn_credential');
    return storedCredential ? JSON.parse(storedCredential) : null;
  }
}
