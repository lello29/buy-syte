
/**
 * Genera lo script di setup
 * @returns Script di setup
 */
export function generateSetupScript(): string {
  return `#!/bin/bash

echo -e "\\x1b[0;32mScript di setup per Buy-Syte\\x1b[0m"
echo "------------------------------"

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo -e "\\x1b[0;31mNode.js non è installato. Installalo per continuare.\\x1b[0m"
    exit 1
fi

# Verifica NPM
if ! command -v npm &> /dev/null; then
    echo -e "\\x1b[0;31mNPM non è installato. Installalo per continuare.\\x1b[0m"
    exit 1
fi

# Verifica versione Node.js
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
echo -e "\\x1b[0;33mVersione Node.js: $NODE_VERSION\\x1b[0m"
echo -e "\\x1b[0;33mVersione NPM: $(npm -v)\\x1b[0m"

# Installa dipendenze
echo -e "\\x1b[0;33mInstallazione dipendenze...\\x1b[0m"
npm install
if [ $? -eq 0 ]; then
    echo -e "\\x1b[0;32mDipendenze installate con successo!\\x1b[0m"
else
    echo -e "\\x1b[0;31mErrore durante l'installazione delle dipendenze.\\x1b[0m"
    exit 1
fi

# Verifica esistenza file .env
if [ ! -f .env ]; then
    echo -e "\\x1b[0;33mFile .env non trovato. Creazione di un template...\\x1b[0m"
    echo "VITE_SUPABASE_URL=" > .env
    echo "VITE_SUPABASE_ANON_KEY=" >> .env
    echo -e "\\x1b[0;32mFile .env creato. Compila con le tue credenziali Supabase.\\x1b[0m"
else
    echo -e "\\x1b[0;32mFile .env trovato.\\x1b[0m"
fi

# Istruzioni per l'importazione del database
echo -e "\\x1b[0;33mPer importare il database, esegui:\\x1b[0m"
echo -e "\\x1b[0;33mnode import-database.js\\x1b[0m"

# Build del progetto
echo -e "\\x1b[0;33mVuoi compilare il progetto ora? (s/n)\\x1b[0m"
read -r BUILD_CHOICE
if [[ $BUILD_CHOICE =~ ^[Ss]$ ]]; then
    echo -e "\\x1b[0;33mCompilazione del progetto...\\x1b[0m"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "\\x1b[0;32mProgetto compilato con successo!\\x1b[0m"
        echo -e "\\x1b[0;32mI file compilati sono nella cartella 'dist'.\\x1b[0m"
    else
        echo -e "\\x1b[0;31mErrore durante la compilazione.\\x1b[0m"
    fi
fi

echo -e "\\x1b[0;32mSetup completato!\\x1b[0m"
echo -e "\\x1b[0;33mPer avviare il server di sviluppo:\\x1b[0m npm run dev"
echo -e "\\x1b[0;33mPer compilare per la produzione:\\x1b[0m npm run build"
echo -e "\\x1b[0;33mPer importare il database:\\x1b[0m node import-database.js"
`;
}
