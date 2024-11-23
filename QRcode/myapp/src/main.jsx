import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './QrCode.css'
import { QrCode } from './QrCode'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QrCode/>
    {/* <App /> */}
  </StrictMode>,
)
