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

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 🎯 Seções do Site

1. **Hero** - Apresentação principal com estatísticas
2. **Sobre** - História e diferenciais da empresa
3. **Serviços** - Gravadora, Produtora, Selo, Estúdio, etc.
4. **Estúdio** - Equipamentos e estrutura
5. **Artistas** - Portfolio de artistas
6. **Portfólio** - Trabalhos realizados
7. **Contato** - Formulário e informações

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
│       └── Contact.tsx
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


