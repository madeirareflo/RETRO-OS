import {createRoot} from 'react-dom/client';
import {Desktop} from './desktop/Desktop';
import './styles/retro.css';
import './styles/classic-controls.css';
import './styles/fidelity.css';
import './styles/immersive.css';
createRoot(document.getElementById('root')!).render(<Desktop/>);
