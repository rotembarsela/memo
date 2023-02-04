import React from "react";
import { useRouter } from "next/router";

const ErrorPage: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/");
  }, []);

  return <div>Redirecting to home page...</div>;
};

export default ErrorPage;
