<div align="center">

# 🎈 Departamento Infantil - Verbo da Vida

Sistema de gerenciamento e cadastro para o Departamento Infantil da igreja Verbo da Vida.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[Demo ao Vivo](https://di-chi.vercel.app) • [Reportar Bug](https://github.com/Joaoof/FRONT-departamento-infantil/issues) • [Solicitar Feature](https://github.com/Joaoof/FRONT-departamento-infantil/issues)

</div>

---

## 📋 Sobre o Projeto

Sistema web moderno desenvolvido para gerenciar o cadastro e acompanhamento de crianças no Departamento Infantil da igreja Verbo da Vida. A aplicação oferece uma interface intuitiva e responsiva para registro de informações, facilitando o trabalho dos coordenadores e professores.

## ✨ Funcionalidades

### Cadastro de Crianças
- Formulário completo com validação em tempo real
- Campos para informações pessoais e responsáveis
- Upload de fotos (opcional)
- Validação de dados com Zod
- Feedback visual com animações

### Interface Moderna
- Design responsivo e acessível
- Tema claro/escuro com next-themes
- Animações suaves com Framer Motion
- Componentes reutilizáveis com Radix UI
- Efeitos visuais com canvas-confetti

### Experiência do Usuário
- Formulários com React Hook Form
- Validação em tempo real
- Mensagens de feedback com Sonner/React Toastify
- Navegação intuitiva
- Carregamento otimizado

## 🎨 Screenshots

### Tela de Cadastro

<div align="center">

<img width="1899" height="914" alt="{DF796593-05B5-4A82-96AB-5B0B6135435F}" src="https://github.com/user-attachments/assets/c423d83d-05f9-42cc-9547-a7d5e63d315c" />


*Interface principal de cadastro com formulário completo e ilustração temática*

</div>

### Formulário Responsivo

<div align="center">

<img width="380" height="818" alt="{02363F84-1E00-4057-8B4D-F38BC1AAF67C}" src="https://github.com/user-attachments/assets/7838b63d-56c6-4825-afc2-c4d0a55616e7" />


*Versão mobile otimizada para tablets e smartphones*

</div>

## 🚀 Tecnologias Utilizadas

### Core
- **Next.js 15.1.6** - Framework React com App Router
- **React 19.0** - Biblioteca para interfaces
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 3.4** - Framework CSS utility-first

### UI Components
- **Radix UI** - Componentes acessíveis e customizáveis
- **Shadcn/ui** - Sistema de componentes
- **Lucide React** - Ícones modernos
- **Framer Motion** - Animações fluidas

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integração Zod + React Hook Form

### Utilitários
- **Axios** - Cliente HTTP
- **date-fns** - Manipulação de datas
- **clsx** - Utilitário para classes CSS
- **canvas-confetti** - Efeitos de celebração

### Qualidade de Código
- **ESLint** - Linting
- **Husky** - Git hooks
- **lint-staged** - Lint em arquivos staged

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/) ou [bun](https://bun.sh/)
- [Git](https://git-scm.com/)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Joaoof/FRONT-departamento-infantil.git
cd FRONT-departamento-infantil
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Outras configurações (se necessário)
NEXT_PUBLIC_APP_NAME="Departamento Infantil"
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📂 Estrutura do Projeto

```
FRONT-departamento-infantil/
├── .husky/                    # Git hooks
├── public/                    # Arquivos estáticos
│   └── images/               # Imagens e assets
├── src/
│   ├── app/                  # App Router do Next.js
│   │   ├── components/       # Componentes da página
│   │   │   ├── Formulario.tsx    # Formulário de cadastro
│   │   │   └── Ilustracao.tsx    # Ilustração temática
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Página de cadastro
│   ├── components/           # Componentes reutilizáveis
│   │   └── ui/              # Componentes UI (shadcn)
│   ├── lib/                  # Utilitários e configurações
│   └── styles/              # Estilos globais
├── .eslintrc.json           # Configuração ESLint
├── .lintstagedrc            # Configuração lint-staged
├── components.json          # Configuração shadcn/ui
├── next.config.ts           # Configuração Next.js
├── tailwind.config.ts       # Configuração Tailwind
└── tsconfig.json            # Configuração TypeScript
```

## 🎯 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento com Turbopack
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linting do código
```

## 🏗️ Arquitetura

### Componentes Principais

#### RegistrationForm
Formulário principal de cadastro com:
- Validação em tempo real com Zod
- Gerenciamento de estado com React Hook Form
- Feedback visual de erros
- Submissão assíncrona

#### Illustration
Componente de ilustração temática que:
- Adiciona identidade visual
- Melhora a experiência do usuário
- Responsivo para diferentes telas

### Padrões de Projeto

- **Component Composition** - Componentes reutilizáveis e compostos
- **Form Validation** - Validação declarativa com schemas
- **Type Safety** - TypeScript em todo o projeto
- **Responsive Design** - Mobile-first approach
- **Accessibility** - Componentes acessíveis (ARIA)

## 🎨 Customização

### Temas

O projeto suporta tema claro e escuro. Para customizar as cores, edite `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores personalizadas
      }
    }
  }
}
```

### Componentes UI

Os componentes shadcn/ui podem ser customizados em `src/components/ui/`. Para adicionar novos componentes:

```bash
npx shadcn@latest add [component-name]
```

## 🔒 Validação de Dados

O projeto utiliza Zod para validação de schemas. Exemplo de schema de cadastro:

```typescript
const registrationSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  birthDate: z.date(),
  parentName: z.string().min(3),
  phone: z.string().regex(/^d{10,11}$/),
  // ... outros campos
})
```

## 🌐 Deploy

### Vercel (Recomendado)

O projeto está otimizado para deploy na Vercel:

1. Faça push do código para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Joaoof/FRONT-departamento-infantil)

### Outras Plataformas

O projeto também pode ser deployado em:
- Netlify
- AWS Amplify
- Railway
- Render

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm run test

# Executar testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:coverage
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Padrões de Commit

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona testes
chore: tarefas de manutenção
```

## 📖 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

## 🐛 Problemas Conhecidos

Nenhum problema conhecido no momento. Se encontrar algum bug, por favor [abra uma issue](https://github.com/Joaoof/FRONT-departamento-infantil/issues).

## 📝 Roadmap

- [ ] Implementar autenticação de usuários
- [ ] Adicionar dashboard administrativo
- [ ] Sistema de relatórios
- [ ] Exportação de dados (PDF/Excel)
- [ ] Integração com sistema de presença
- [ ] Notificações por email/SMS
- [ ] Modo offline (PWA)
- [ ] Testes automatizados

## 👤 Autor

**João**

- GitHub: [@Joaoof](https://github.com/Joaoof)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Igreja Verbo da Vida
- Equipe do Departamento Infantil
- Comunidade Next.js
- Shadcn/ui pela biblioteca de componentes

---

<div align="center">

**Desenvolvido com ❤️ para o Departamento Infantil da Verbo da Vida**

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!

</div>
