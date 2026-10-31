# Jogos e licenças — 003L

| Item | Arquivo/engine | Decisão003L | Evidência/limite |
|---|---|---|---|
| Disquete Perdido DOS | DISQUETE.COM original / js-dos6.22.60 | Incluído e testado, inclusive importação e save nativo | MIT própria em games-source; hash preservado; não é jogo comercial histórico |
| SkyRoads | skyroads.zip591011bytes no Anti | Não incluído | README permite distribuição como unidade integral inalterada. Precisa reconciliar pacote exato/origem oficial e homologar execução/save neste shell |
| Ken's Labyrinth | klab.zip957196bytes no Anti | Não incluído | README permite cópia gratuita sem retirar arquivos; página oficial oferece LABFULL940242bytes. Reempacotamento/origem integral precisa conciliação |
| Freedoom + FastDoom | freedoom.zip10658972bytes no Anti | Não incluído | ZIP tem DOOM.BAT, DOOM.WAD, FDOOM.EXE e FREEDOOM_COPYING; faltam na unidade analisada os materiais de licença/fonte correspondentes de FastDoom e créditos a conferir |

Inspeção independente dos três ZIPs feita em memória, sem colocá-los em public/dist.
Inventário de nomes/hash em evidence/003l/anti-assets-review.json. Relatório Anti
chamava Freedoom IWAD de FREEDOOM1.WAD, mas o pacote usa DOOM.WAD; conferir edição
por hash/lump antes de afirmar versão. Não há claim de que o WAD seja comercial:
a procedência/obrigações do conjunto é que não foi homologada nesta entrega.

Fontes primárias: https://advsys.net/ken/klab.htm (freeware e pacote oficial),
https://freedoom.github.io/about.html (dados livres separados da engine; BSD).
https://www.bluemoon.ee/history/skyroads/ não respondeu à consulta e o download
de conferência falhou SSL; termos do README local foram lidos, sem inventar confirmação.
Não há alegação de que os três sejam proibidos em toda situação; ficam pendentes
para preservar condições de redistribuição e evitar homologação fictícia.

O parser recusa BAT; o ZIP Freedoom do Anti requer fluxo diferente antes de ser
montável por esta rota. EXE do Windows, ROMs, ISOs e coleções eXoDOS não foram
integrados. Mantidas as fichas históricas da003F e jogos nativos JavaScript.
Não foram feitos downloads de jogos comerciais ou extrações de ativos Windows.
