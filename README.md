# 🎵 Alvorada Records - Website

Site moderno e animado para gravadora, produtora e selo musical com estúdio próprio.

## ✨ Características

- 🎨 Design moderno e responsivo
- ⚡ Animações suaves com Framer Motion
- 🎯 Seções completas para todos os serviços
- 📱 100% Mobile-First
- 🚀 Otimizado com Next.js 14
- 💅 Estilizado com Tailwind CSS
- 🎭 Efeitos de hover e scroll
- 🌈 Gradientes e efeitos de glow

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **React Intersection Observer** - Scroll animations
- **mssql** - Cliente SQL Server para Node.js

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar banco de dados (veja seção abaixo)
# Inicializar banco de dados
node scripts/init-database.js

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🗄️ Configuração do Banco de Dados

O sistema de agendamento utiliza SQL Server. Para configurar:

### Pré-requisitos
- SQL Server instalado e rodando
- Acesso com as credenciais configuradas

### Configuração

1. **Opção 1: Script SQL** (Recomendado)
   - Abra o SQL Server Management Studio
   - Execute o arquivo `scripts/init-database.sql`

2. **Opção 2: Script Node.js**
   ```bash
   node scripts/init-database.js
   ```

### Credenciais do Banco

As credenciais estão configuradas em `lib/db.ts`:
- **Server**: localhost
- **Database**: alvoradarecords
- **User**: leonardo
- **Password**: 01042018

⚠️ **Importante**: Altere as credenciais em produção!

### Estrutura da Tabela

A tabela `agenda` possui os seguintes campos:
- `id` - ID único do agendamento
- `data` - Data e hora do agendamento
- `hora` - Horário (formato HH:mm)
- `nomeBanda` - Nome da banda
- `telefone` - Telefone de contato
- `email` - Email de contato
- `observacoes` - Observações adicionais (opcional)
- `dataCriacao` - Data de criação do registro

## 🎯 Seções do Site

1. **Hero** - Apresentação principal com estatísticas
2. **Sobre** - História e diferenciais da empresa
3. **Serviços** - Gravadora, Produtora, Selo, Estúdio, etc.
4. **Estúdio** - Equipamentos e estrutura
5. **Artistas** - Portfolio de artistas
6. **Portfólio** - Trabalhos realizados
7. **Agendar** - Sistema de agendamento de horários para ensaios
8. **Contato** - Formulário e informações

## 🎨 Personalização

### Cores

As cores principais podem ser alteradas em `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Suas cores aqui
  }
}
```

### Conteúdo

Edite os componentes em `components/sections/` para personalizar o conteúdo.

## 📝 Estrutura de Pastas

```
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página home
│   └── globals.css      # Estilos globais
├── components/
│   ├── Navigation.tsx   # Navegação
│   ├── Footer.tsx       # Rodapé
│   └── sections/        # Seções da página
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Studio.tsx
│       ├── Artists.tsx
│       ├── Portfolio.tsx
│       ├── Schedule.tsx
│       └── Contact.tsx
├── app/
│   └── api/
│       └── agenda/          # API routes para agendamento
│           ├── datas-disponiveis/
│           ├── horarios-disponiveis/
│           └── criar/
├── lib/
│   └── db.ts                # Configuração do banco de dados
└── scripts/
    ├── init-database.sql    # Script SQL para criar banco
    └── init-database.js     # Script Node.js para criar banco
└── public/              # Arquivos estáticos
```

## 🚀 Deploy

Este projeto pode ser facilmente deployado em:

- **Vercel** (Recomendado)
- **Netlify**
- **AWS Amplify**
- Qualquer hospedagem que suporte Node.js

### Deploy na Vercel

```bash
npm install -g vercel
vercel
```

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## ⚡ Performance

- Lazy loading de imagens
- Code splitting automático
- Otimização de fontes
- Animações otimizadas com Framer Motion

## 🎭 Animações

O site utiliza várias animações:

- Fade in/out
- Slide animations
- Hover effects
- Scroll animations
- Particle effects
- Gradient animations

## 📄 Licença

Este projeto é propriedade da Alvorada Records.

## 🤝 Suporte

Para suporte, entre em contato através de:
- Email: contato@alvoradarecords.com
- Telefone: (11) 99999-9999

---

Desenvolvido com ❤️ e 🎵 pela equipe Alvorada Records


