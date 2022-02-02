import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "store/hooks";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const router = useRouter()
  const myInfo = useAppSelector(state => state.users.myInfo)

  useEffect(() => {
    if (!myInfo) {
      alert('Only logged-in users can access.')
      router.push('/')
    }
  }, [myInfo, router])

  return (
    <>
      <Head>
        <title>My Profile | Chelstagram</title>
      </Head>
      Profile
    </>
  );
};

export default Profile;
