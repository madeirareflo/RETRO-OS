import {describe, it, expect} from 'vitest';
import {CATALOG_37_GAMES, getProfileById, getDosProfiles, getMuseumProfiles} from '../launcher/runtime37/catalog37Games';
import {validateGamePackage, identifyPackageCandidate} from '../launcher/runtime37/packageInstaller';
import {prepareDosFilesystem, buildDosRuntimeConfig} from '../launcher/runtime37/dosRuntimeManager';
import {resolveGameAction} from '../launcher/runtime37/actionResolver';
import {createBatchImportSession} from '../launcher/runtime37/batchImporter';

describe('RETRO OS 003P-ANTI — Suíte de Testes dos 37 Jogos', () => {

  it('deve conter exatamente 37 jogos cadastrados', () => {
    expect(CATALOG_37_GAMES).toHaveLength(37);
  });

  it('deve possuir IDs únicos para todos os 37 jogos', () => {
    const ids = new Set(CATALOG_37_GAMES.map(g => g.id));
    expect(ids.size).toBe(37);
  });

  it('deve categorizar 16 jogos DOSBox, 6 source ports/ScummVM e 15 museu', () => {
    const dos = getDosProfiles();
    const museum = getMuseumProfiles();
    const alternative = CATALOG_37_GAMES.filter(g => g.engineId !== 'dosbox-wasm' && g.engineId !== 'none');

    expect(dos).toHaveLength(16);
    expect(alternative).toHaveLength(6);
    expect(museum).toHaveLength(15);
    expect(dos.length + alternative.length + museum.length).toBe(37);
  });

  it('deve validar pacote válido de DOOM Shareware', () => {
    const files = ['DOOM.EXE', 'DOOM1.WAD', 'DEFAULT.CFG'];
    const result = validateGamePackage('dos-doom-1993', files);

    expect(result.isValid).toBe(true);
    expect(result.status).toBe('valid');
    expect(result.missingRequiredFiles).toHaveLength(0);
  });

  it('deve rejeitar pacote de DOOM faltando DOOM1.WAD', () => {
    const files = ['DOOM.EXE', 'README.TXT'];
    const result = validateGamePackage('dos-doom-1993', files);

    expect(result.isValid).toBe(false);
    expect(result.status).toBe('missing_required');
    expect(result.missingRequiredFiles).toContain('DOOM1.WAD');
  });

  it('deve rejeitar tentativa de instalação de jogo do Museu com mensagem educativa', () => {
    const files = ['MOHAA.EXE', 'MAIN/PAK0.PK3'];
    const result = validateGamePackage('win-mohaa-2002', files);

    expect(result.isValid).toBe(false);
    expect(result.status).toBe('unsupported_platform');
    expect(result.diagnosticMessage).toContain('Modo Museu Histórico');
  });

  it('deve normalizar árvore de arquivos com pasta raiz virtual', () => {
    const mockFiles = [
      { name: 'DOOM/DOOM.EXE', data: new Uint8Array([1, 2, 3]) },
      { name: 'DOOM/DOOM1.WAD', data: new Uint8Array([4, 5, 6]) },
      { name: 'DOOM/DOCS/MANUAL.TXT', data: new Uint8Array([7, 8]) }
    ];

    const mounted = prepareDosFilesystem('dos-doom-1993', mockFiles);
    expect(mounted.entryExecutable).toBe('DOOM.EXE');
    expect(mounted.files.some(f => f.name === 'DOOM.EXE')).toBe(true);
    expect(mounted.files.some(f => f.name === 'DOOM1.WAD')).toBe(true);
    expect(mounted.files.some(f => f.name === 'DOCS/MANUAL.TXT')).toBe(true);
  });

  it('deve resolver corretamente o botão Jogar apenas quando arquivos existirem', () => {
    const doom = getProfileById('dos-doom-1993')!;

    // Sem arquivos
    const stateNotInstalled = resolveGameAction(doom, false, true);
    expect(stateNotInstalled.canPlay).toBe(false);
    expect(stateNotInstalled.buttonAction).toBe('open_installer');
    expect(stateNotInstalled.badgeColor).toBe('yellow');

    // Com arquivos
    const stateInstalled = resolveGameAction(doom, true, true);
    expect(stateInstalled.canPlay).toBe(true);
    expect(stateInstalled.buttonAction).toBe('launch_dosbox');
    expect(stateInstalled.badgeColor).toBe('green');
  });

  it('deve identificar automaticamente candidatos de pacotes ZIP pelo nome do arquivo', () => {
    const matchDoom = identifyPackageCandidate('doom19s.zip', ['DOOM.EXE', 'DOOM1.WAD']);
    expect(matchDoom.status).toBe('matched');
    expect(matchDoom.matchedGameId).toBe('dos-doom-1993');

    const matchDuke = identifyPackageCandidate('3dduke.zip', ['DUKE3D.EXE', 'DUKE3D.GRP']);
    expect(matchDuke.status).toBe('matched');
    expect(matchDuke.matchedGameId).toBe('dos-duke3d-1996');
  });

});
