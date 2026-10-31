# Segurança e privacidade — 003F

Runtime estático/local: sem contas, mensagens enviadas, SSE, bancos expostos,
uploads públicos ou ranking competitivo. Não é homologação do backend arquivado.
Relatórios antigos continuam relevantes se ele for restaurado sob nova autorização.

- Backend e SQLite preservados fora da build; dados ignorados no Git e excluídos
  de ZIP/bundle de código. Não executar archive/social-003e diretamente.
- Frontend sem cliente de autenticação ou requests /api. Testes sociais novos
  bloqueiam /api e verificam zero tentativas nesses fluxos.
- Roteiros fictícios renderizados por React. Não se executa HTML de visitantes.
- Emulador carrega um binário próprio fixo e save de oito bytes; sem uploads de
  EXE/COM/ROM/ISO, instalação de OS ou execução de código remoto arbitrário.
- postMessage confere origem e janela. Iframe usa allow-scripts e allow-same-origin
  para engine/save: não é barreira suficiente para programas hostis. Não oferecer
  upload de executáveis sem redesenhar o isolamento.
- Runtime e fontes self-hosted; filesystem emulado não é disco físico do usuário.
- Links externos são abertos por escolha. Nenhum download automático comercial.
- Preferências, arquivos e tokens sociais legados não foram apagados; tokens não
  são utilizados nem transmitidos. Dados do visitante ficam no seu navegador.

Limites: engine legada não passou por pentest, fuzzing, auditoria profunda de
vulnerabilidades ou rebuild reprodutível. Saves são editáveis via DevTools e não
competitivos. PWA/cache offline permanente não foi implementado. Publicação futura
exige revisão de licenças, segredos/histórico, CSP e nova autorização explícita.
Nenhum push, deploy ou contratação de infraestrutura foi realizado.

A conferência de pacote em evidence/003f/package-audit.json não encontrou bancos
ou .env no dist nem os padrões específicos de credenciais pesquisados no frontend,
adapter e jogo próprios. Não constitui varredura completa de histórico ou backend.
O catálogo original foi comparado e main continua no mesmo commit da versão 002.
