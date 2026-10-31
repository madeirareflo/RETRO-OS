import {AddGameWizard} from './AddGameWizard';import type {GameEntry} from './types';
export function BatchImportModal({isOpen,onClose,onImportComplete}:{isOpen:boolean;onClose:()=>void;onImportComplete:(games:GameEntry[])=>void}){return <AddGameWizard isOpen={isOpen} onClose={onClose} onGameAdded={g=>onImportComplete([g])}/>}
