# Space Dodger

Jogo simples onde o jogador controla uma nave que deve desviar de asteroides infinitamente. A dificuldade aumenta com o tempo.

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm start
```

A aplicação será aberta com `live-server` em `src/index.html`.
O fundo do jogo agora é gerado por um pequeno starfield em
Canvas 2D, sem dependências externas.

## Construir para produção

```bash
npm run build
```

Os arquivos prontos para distribuição estarão no diretório `dist`.

### Android (Opcional)

É possível empacotar o jogo utilizando [Capacitor](https://capacitorjs.com/). Após construir o projeto, execute `npx cap add android` e siga as instruções para gerar o APK.
