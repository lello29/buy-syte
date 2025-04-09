
/**
 * Genera la configurazione SSH per il deployment
 * @returns Configurazione SSH
 */
export function generateSshConfig(): string {
  return `# Configurazione SSH per il deployment
Host production
    HostName server.buysyte.com
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ForwardAgent yes
    StrictHostKeyChecking no

Host staging
    HostName staging.buysyte.com
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ForwardAgent yes
    StrictHostKeyChecking no

# Esempio di configurazione per accesso tramite bastion host
Host bastion
    HostName bastion.buysyte.com
    User jumpuser
    Port 22
    IdentityFile ~/.ssh/bastion_key

Host internal-server
    HostName 10.0.0.5
    User admin
    Port 22
    ProxyJump bastion
    IdentityFile ~/.ssh/internal_key`;
}
