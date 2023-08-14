import {  useParams } from 'react-router-dom'
import AuthBackground from '../../assets/image/auth/AuthBackGround'
const Loading = () => {
  const {email} = useParams()
  return (
    <>
    <AuthBackground />

<div>lütfen {email} adresinize gelen maili onaylayınız</div>
</>
  )
}

export default Loading