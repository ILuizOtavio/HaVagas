# 🚀 Deploy Rápido

Este projeto está pronto para deploy no Vercel!

## Links importantes:
- 📖 **[Guia Completo de Deploy](DEPLOY-VERCEL.md)** - Passo a passo detalhado
- 🔗 **Vercel:** https://vercel.com

## Deploy em 3 passos:

1. **Commit e push:**
   ```bash
   git add .
   git commit -m "Deploy no Vercel"
   git push origin correcoes
   ```

2. **Backend:**
   - Importe no Vercel
   - Root: `backend`
   - Adicione variável: `DB_DATABASE=database.sqlite`

3. **Frontend:**
   - Importe no Vercel novamente
   - Root: `frontend`
   - Adicione variável: `NEXT_PUBLIC_API_URL=<URL_DO_BACKEND>`

✅ Pronto! Veja o [guia completo](DEPLOY-VERCEL.md) para detalhes.
