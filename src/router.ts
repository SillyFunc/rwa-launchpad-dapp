import { createHashRouter } from 'react-router'
import App from './App.tsx'

export const router = createHashRouter([{ path: '/', Component: App }])
