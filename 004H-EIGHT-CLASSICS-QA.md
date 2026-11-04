# 004H-02 — auditoria individual dos oito clássicos

Checkpoint de auditoria inicial, não conclusão de homologação. Os oito pacotes tiveram tamanho, SHA256, lista de arquivos e documentos associados conferidos. Nenhum binário foi modificado.

| Pacote | Integridade | Execução observada no checkpoint | Pendências |
|---|---|---|---|
| DOOM shareware 1.9 | PASS | Partida, movimento, disparo, pausa e save/load nativo no Chrome | Áudio e Edge pendentes |
| Heretic shareware 1.2 | PASS | Partida, movimento, disparo e save nativo no Chrome | Reabertura/áudio/Edge em revalidação |
| Quake shareware 1.06 | PASS | Partida real e sinal PCM positivo no Chrome | Prompts de CD/joystick, mouse e save/load em verificação |
| Duke Nukem 3D shareware 1.3d | PASS | NOT TESTED | CFG inicial com FXDevice/MusicDevice desativados; testar gameplay e setup |
| Prince demo DOS 1.0 | PASS | NOT TESTED nesta missão | Revalidar Ctrl+K e foco após troca de janela |
| Freedoom/FastDoom | PASS | NOT TESTED | Executar sequência individual |
| Ken's Labyrinth 2.1 | PASS | NOT TESTED | Executar sequência individual |
| SkyRoads 1993 | PASS | NOT TESTED | Executar sequência individual |

Os resultados finais substituirão este estado de checkpoint na matriz 004H. Traces iniciais tiveram erro de exportação no harness e não são usados para comprovar reabertura; o harness foi ajustado para não impedir context.close. O teste anterior apenas de menu não é contado como gameplay.

Licenças: Prince traz descrição de demo, sem permissão inequívoca de redistribuição. Duke tem condições específicas para tipos de distribuição. Quake e Heretic trazem termos com restrições de uso/completude; os pacotes preparados não são automaticamente homologados para redistribuir. Parecer de publicação permanece bloqueado até auditoria final e autorização.
