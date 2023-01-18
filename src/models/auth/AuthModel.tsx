import { UserCredential } from 'firebase/auth';

export default interface AuthModel {
    toggleIsLogin: React.MouseEventHandler<HTMLDivElement>,
    setUser: any

}