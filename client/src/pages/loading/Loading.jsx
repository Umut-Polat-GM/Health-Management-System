import AuthBackground from '../../assets/image/auth/AuthBackGround'
import ClipLoader from "react-spinners/ClipLoader";
const Loading = () => {
  

  const override = `
  text-align: center,
  display: flex,
  justify-content: center,
  align-items: center,
  width: 100%,
  height: 100vh,
  `;

  return (
 
    <>
    <AuthBackground />

    <ClipLoader
        color={"#36d7b7"}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
</>
  )
}

export default Loading