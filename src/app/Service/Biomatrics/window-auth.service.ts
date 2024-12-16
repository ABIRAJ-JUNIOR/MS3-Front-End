import { Injectable } from '@angular/core';
import { AuthService } from '../API/Auth/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuditLogRequest } from '../../Component/Admin_Pages/student-list/student-list.component';
import { AuditlogService } from '../API/AuditLog/auditlog.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WindowAuthService {

  constructor(private authService: AuthService, 
    private rout: Router , 
    private auditLogService:AuditlogService , 
    private tostr:ToastrService,
    private cookieService: CookieService
  ) { }

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
          this.tostr.success("Registration successful!")
          return credential;
        }, error: () => {
          this.tostr.error("Registration Failed! Check your Email & Password Try again.")
          this.rout.navigate(['/Way/bio'])
        }
      })

    } catch (err) {
      this.tostr.error("Registration Failed! Try again.")
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
          this.rout.navigate(['/Way/bio'])
          this.tostr.error("Biomatrics failed. Please Register again.");
        }, complete: () => {
          const token: string = localStorage.getItem("token")!;
          const decode: any = jwtDecode(token)
          if (decode.Role == "Administrator" || decode.Role == "Instructor") {
            const auditLog: AuditLogRequest = {
              action: 'Login',
              details: `Admin logged in to the system`,
              adminId: decode.Id,
            }
            this.auditLogService.addAuditLog(auditLog).subscribe({
              next: () => { },
              error: (error: any) => {
             
              }
            })
            this.rout.navigate(['/admin-dashboard'])
          } else if (decode.Role == "Student") {
            this.rout.navigate(['/Way/home'])
          }
        }
      })
      return credential;
    } catch (err) {
      console.error("Authentication failed:", err);
      throw err;
    }
  }

  private storeCredential(
    credential: PublicKeyCredential,
    challenge: Uint8Array,
    password: string,
    email: string
  ) {
    const credentialData = {
      rawId: Array.from(new Uint8Array(credential.rawId)),
      challenge: Array.from(challenge),
      email: email,
      password,
    };
  
    const credentialString = JSON.stringify(credentialData);
  
    document.cookie = `webauthn_credential=${encodeURIComponent(
      credentialString
    )}; path=/; max-age=86400; secure; samesite=strict`;
  }
  

  private getStoredCredential(): any {
    const cookieName = 'webauthn_credential=';
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName)) {
        const credentialString = cookie.substring(cookieName.length);
        return JSON.parse(decodeURIComponent(credentialString));
      }
    }
    return null; 
  }
}
