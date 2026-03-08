# Diário do Professor (PWA + Google Sheets)

Bem-vindo ao **Diário do Professor**! Este é um sistema simples e seguro para professores gerenciarem suas turmas, alunos, avaliações e desempenho escolar utilizando o poder e a flexibilidade do **Google Sheets**.

O sistema é um **Progressive Web App (PWA)**, o que significa que ele pode ser instalado no seu computador ou celular.

## 1. O que é o sistema?

O Diário do Professor agora funciona como um "hub" centralizado para todas as suas planilhas do Google. Em vez de ter várias abas abertas no navegador, você pode incorporar suas planilhas diretamente dentro do aplicativo, organizadas por categorias (Turmas, Alunos, Avaliações, etc).

## 2. Como configurar suas planilhas

Para que suas planilhas apareçam dentro do aplicativo, você precisa configurá-las corretamente no Google Sheets:

1. Abra a sua planilha no Google Sheets.
2. Clique no botão verde **Compartilhar** no canto superior direito.
3. Em "Acesso geral", altere de "Restrito" para **"Qualquer pessoa com o link"**.
   - Se você quiser apenas visualizar a planilha no app, deixe como **Leitor**.
   - Se você quiser editar a planilha diretamente por dentro do app, mude para **Editor**.
4. Clique em **Copiar link**.
5. Abra o Diário do Professor, vá no menu **Configurações** e cole o link no campo desejado.
6. Clique em **Salvar Configurações**.

**Dica de Ouro:** Você não precisa criar um arquivo diferente para cada página. Você pode usar uma única planilha com várias abas (ex: Aba Turmas, Aba Alunos). Basta copiar o link enquanto estiver na aba específica (o link terá um `&gid=...` no final que identifica a aba).

## 3. Como instalar como aplicativo

Para ter o Diário do Professor como um aplicativo no seu computador ou celular:

**No Computador (Chrome ou Edge):**
1. Abra o sistema no navegador.
2. Na barra de endereços (onde fica o link do site), procure por um ícone de "Instalar aplicativo" (geralmente um monitor com uma setinha para baixo ou um sinal de "+").
3. Clique no ícone e depois em **Instalar**.
4. O aplicativo será aberto em uma janela própria e um atalho será criado na sua área de trabalho.

**No Celular (Android/iOS):**
1. Abra o sistema no navegador do celular (Chrome no Android, Safari no iOS).
2. No Android: Toque nos 3 pontinhos do menu e selecione **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
3. No iOS: Toque no botão de compartilhar (quadrado com seta para cima) e selecione **"Adicionar à Tela de Início"**.

## 4. Como publicar no GitHub Pages (Automático)

O projeto já está configurado para ser publicado automaticamente no GitHub Pages! Siga os passos abaixo:

1. Faça um **Fork** deste projeto para a sua conta do GitHub.
2. No seu novo repositório, vá até a aba **Settings** (Configurações).
3. No menu lateral esquerdo, clique em **Pages**.
4. Na seção "Build and deployment", em "Source", mude para **GitHub Actions**.
5. Vá até a aba **Actions** (no topo do repositório) e clique em "I understand my workflows, go ahead and enable them" (se aparecer).
6. Pronto! Toda vez que você fizer uma alteração na branch `main` (ou `master`), o GitHub Actions compilará o projeto e publicará automaticamente. O link do seu site aparecerá na aba Settings > Pages.

*Nota técnica: O sistema utiliza `HashRouter` e `base: './'` no Vite para garantir que a navegação funcione perfeitamente em qualquer subdiretório do GitHub Pages sem erros 404.*
