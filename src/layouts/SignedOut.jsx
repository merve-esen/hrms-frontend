import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

export default function SignedOut({signIn}) {
    return (
        <div>
            <Menu.Item>
               <Button color="yellow" onClick={signIn}>Giriş yap</Button>
               <Button color="yellow" style={{marginLeft:'0.5em'}}>Kayıt Ol</Button> 
            </Menu.Item>
            
        </div>
    )
}