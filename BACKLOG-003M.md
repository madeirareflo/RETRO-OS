# Backlog003M — estabilização, sem expansão automática

1. Homologar pacote histórico exato e condições integrais de redistribuição; começar
   por SkyRoads ou Ken com origem verificada. Freedoom precisa engine/fonte/licenças
   correspondentes e edição de IWAD conferida; manter fora até concluir.
2. Save nativo por jogo histórico, novos arquivos/slots, subpastas e limite de volume;
   hoje comprovação independente é do Disquete Perdido original.
3. Contrato genérico completo de pausa/resume/shutdown para DOS diversos. P/R dependem
   do jogo; não anunciar funções vazias. Descritores de engine não são instâncias.
4. Unificar metadados e pacote numa transação IndexedDB futura, com migração; recuperação
   explícita de órfãos de crash e recuperação de pacote removido sem reimportar. Hoje
   saves permanecem exportáveis, mas reimportação cria novo gameId e exige associação.
5. Importação em lote de verdade, se homologada; hoje um pacote por operação. Não
   reativar assistente cosmético nem executar BAT/AUTOEXEC arbitrário para compensar.
6. Restauração/exclusão de save com jogo aberto deve ter interlock, hoje orientação
   explícita para fechar a sessão. Atomicidade em crash e persistência de histórico
   de contagem total além dos50 eventos ainda não prometidas.
7. Melhorar navegação espacial em grades, UI de propriedades de pacote e reconciliação
   de atalhos após remoção. Atalhos preservados podem apontar para pacote ausente e
   mostrar erro recuperável; não podem iniciar outro jogo silenciosamente.
8. Firefox funcional, dispositivos físicos, DPI/zoom e medição de memória com pacotes
   grandes; não alegar mobile físico ou antifraude online.
9. Continuar fidelidade histórica por medidas: tipos de letra dependem de fallback,
   applets e alguns símbolos/emoji continuam aproximados. Não copiar ativos Microsoft.
10. Manter003L privada; push/deploy exigem nova autorização e revisão dos arquivos e
    do histórico exato. Não adicionar backend social para fechar estes itens.

11. Snapshot genérico deve modelar arquivos vazios e exclusões, além de bytes novos;
    essas operações ainda não são persistidas. Validar antes de ampliar compatibilidade.

12. Avaliar divisão do chunk inicial do Launcher sem alterar ordem de CSS histórico:
    build atual avisa JS521.29kB (~146.77kB gzip). Não silenciar aviso sem medir.
    Fontes de cabeçalhos internos/alguns símbolos do Launcher seguem aproximadas.
