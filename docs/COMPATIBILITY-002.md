# Compatibilidade 002

Windows, Node 24.22.1, Playwright 1.64.1. Data: 30/10/2026.

| Navegador | Versão no ambiente | Situação |
| --- | --- | --- |
| Microsoft Edge | 156.0.4314.50 | Testes reais de aplicação, jogos, arquivos, mídia e resoluções |
| Google Chrome | 156.0.8078.79 | Testes reais de aplicação, jogos, arquivos, mídia e resoluções |
| Firefox de teste Playwright | 157.0, build 1555 | Instalado e tentado; bloqueado antes de abrir páginas |

O Firefox retornou `browserType.launch: spawn UNKNOWN`. A execução direta retornou “configuração lado a lado incorreta”. O log SideBySide do Windows indicou que o assembly dependente `mozglue`, versão 1.0.0.0, não pôde ser localizado, embora mozglue.dll esteja presente. As arquiteturas de firefox.exe e mozglue.dll foram verificadas como AMD64. Não foram desabilitadas proteções, substituídas DLLs ou alterados componentes do Windows para contornar o erro. Não há evidência suficiente para declarar compatibilidade ou incompatibilidade da aplicação com Firefox.

Resoluções verificadas no Edge e Chrome: 800×600, 1024×768, 1366×768, 1920×1080. Os três temas foram exercitados em cada resolução. A adaptação móvel usa emulação 390×844; não houve teste em dispositivo físico nem Safari. As capturas em evidence/002/compat identificam navegador, largura e tema. As capturas antes/depois usam Edge e altura explícita no nome.

Para repetir apenas a matriz utilizável neste ambiente:

```powershell
npm run test:e2e
```

Para repetir também Firefox após corrigir sua instalação no Windows:

```powershell
npx playwright install firefox
npm run test:e2e:all
```

O som de mídia foi verificado por reprodução, pausa e avanço de tempo de um WAV gerado pelos testes. O timbre dos efeitos e modem não foi auditado por audição humana. Autoplay continua dependente de gesto e políticas do navegador. Telas pequenas preservam o desktop e permitem rolagem em aplicativos que precisam de espaço, especialmente Paciência.
