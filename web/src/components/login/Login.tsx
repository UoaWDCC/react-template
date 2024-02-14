import { AuthContext } from '@contexts/Auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Email from './Email';
import EmailSent from './EmailSent';
import VerifyCode from './VerifyCode';
import WelcomeUser from './Welcome';
import Create, { UserProfile } from './Create';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [step, setStep] = useState<string>('email');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
  });
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const submitEmail = async () => {
    await authContext.continueAuth(email);
    setStep('sent');
  };

  const submitEmailSent = () => {
    setStep('code');
    return;
  };

  const submitCode = async () => {
    await authContext.verifyAuth(email, code);
    const { data } = authContext.user;
    if (data?.firstName == undefined) {
      // If the user does not exists
      // Let them create a profile
      setStep('create');
    } else {
      // If the user does exist
      // Welcome them back
      setStep('welcome');
    }
  };

  const submitCreate = async () => {
    await authContext.upsertUser(userProfile.firstName, userProfile.lastName);
    navigate('/');
  };

  const submitWelcome = async () => {
    navigate('/');
  };

  const stepMap: Record<string, React.ReactNode> = {
    email: (
      <Email
        value={email}
        setValue={setEmail}
        onSubmit={submitEmail}
      />
    ),
    sent: (
      <EmailSent
        value={email}
        onSubmit={submitEmailSent}
      />
    ),
    code: (
      <VerifyCode
        value={code}
        setValue={setCode}
        onSubmit={submitCode}
      />
    ),
    welcome: (
      <WelcomeUser
        value={authContext.user?.data?.firstName || ''}
        onSubmit={submitWelcome}
      />
    ),
    create: (
      <Create
        value={userProfile}
        setValue={setUserProfile}
        onSubmit={submitCreate}
      />
    ),
  };

  return (
    <div className="w-screen md:w-96 min-h-96 md:rounded-xl ">
      {stepMap[step]}
    </div>
  );
}
