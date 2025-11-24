
# 🎮 IndieLabs


**IndieLabs** é uma plataforma moderna dedicada à descoberta de jogos independentes. O projeto foi feito com o intuito de ajudar pessoas a conhecerem jogos de desenvolvedores independentes, podendo procurar jogos indies, criar sua conta e poder interagir com outras pessoas sobre o jogo.
---

## 🚀 Como rodar o projeto na sua máquina


### Pré-requisitos
- Node.js (Versão 18 ou superior)
- NPM
- Uma conta gratuita no [Neon.tech](https://neon.tech/) (para o banco de dados).

### Passo a Passo

1. **Clone o repositório:**
   ```
   git clone https://github.com/WagnerRodriguess/IndieLabs_R.git
   cd IndieLabs_R
   ```

2.  **Instale as dependências:**

    ```
    npm install
    ```

3.  **Configurar o Banco de Dados (Neon):**
    O projeto precisa de um banco de dados para funcionar.

    1.  Crie uma conta e um projeto no [Neon.tech](https://neon.tech/).
    2.  Copie a **Connection String** do seu banco (ex: `postgresql://usuario:senha@...`).
    3.  Crie um arquivo chamado `.env` na raiz do projeto.
    4.  Cole o seguinte conteúdo, substituindo pela sua URL:


    ```env
    # .env

    # Cole a Connection String do SEU banco Neon aqui:
    DATABASE_URL="postgresql://SEU_USUARIO:SUA_SENHA@ep-url-do-neon.aws.neon.tech/neondb?sslmode=require"

    # Chave de segurança (Pode digitar qualquer texto longo e aleatório aqui para encriptar os cookies)
    NEXTAUTH_SECRET="segredo-para-testes-locais-123"
    ```

4.  **Sincronizar o Banco de Dados (Prisma):**
    Este comando vai ler o arquivo do projeto e criar as tabelas (User, Comment, etc.) no **seu** banco de dados Neon automaticamente.

    ```bash
    npx prisma generate
    npx prisma db push

    Comandos alternativos (caso de erro):
    npx dotenv -e .env -- npx prisma generate
    npx dotenv -e .env -- npx prisma db push
    ```

5.  **Inicie o Servidor:**

    ```bash
    npm run dev
    ```

6.  **Acesse:** Abra `http://localhost:3000` no seu navegador.

-----

## 🗄️ Comandos Úteis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Cria a versão de produção do site. |
| `npx prisma studio` | Abre uma interface gráfica no navegador para ver e editar os dados do seu banco. |
| `npx prisma db push` | Atualiza o banco de dados caso você altere o arquivo `schema.prisma`. |

-----

