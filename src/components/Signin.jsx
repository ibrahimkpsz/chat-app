import { Card } from "@tremor/react";
import Auth from '../utils/Auth'

function Signin() {
  return (
    <div className="signInContainer">
        <Card className="w-96 text-center">
          <Auth />
        </Card>
    </div>
  )
}

export default Signin