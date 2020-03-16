export interface IFirebaseAuthModel {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean
}

export type UserFormData = {
  email: string;
  password: string
}

export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {

  }

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }

    return this._token;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }
}
