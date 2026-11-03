# 🏋️‍♂️ YellowBlack Gym - Arquitetura e Planejamento do Sistema

## 1. Visão Geral do Projeto
Um sistema web responsivo para academias focado na interação e acompanhamento personalizado entre Personal Trainers e Alunos. O sistema possui dois fluxos principais de usuários (Trainer e Client) com um forte apelo visual no modo escuro (Dark Mode).

## 2. Design System (Guia de Estilos)
*   **Tema:** Dark Mode predominante com destaques de alta energia.
*   **Paleta de Cores:**
    *   **Fundo Principal:** Preto Profundo (`#121212`)
    *   **Fundo Secundário (Cards, Menus):** Cinza Escuro (`#1E1E1E` ou `#242424`)
    *   **Cor de Destaque (Ação, Botões, Ícones):** Amarelo Elétrico (`#FFD700` ou `#FACC15`)
    *   **Texto Principal:** Branco Puro (`#FFFFFF`)
    *   **Texto Secundário:** Cinza Claro (`#A0A0A0`)
    *   **Alertas/Erros:** Vermelho Suave (`#EF4444`)
*   **Tipografia:** Fonte sem serifa moderna, agressiva e limpa (ex: *Inter*, *Roboto* ou *Montserrat* para títulos).

---

## 3. Arquitetura da Informação (Sitemap)

*   **/** (Página de Login)
*   **/personal** (Área do Personal Trainer)
    *   /personal/dashboard (Visão geral e lista de alunos)
    *   /personal/aluno/[id] (Detalhes do aluno, meta, ficha de treino semanal)
    *   /personal/mensagens (Chat com alunos)
*   **/aluno** (Área do Cliente)
    *   /aluno/dashboard (Status do plano, Treino do dia)
    *   /aluno/treinos (Histórico e visão semanal)
    *   /aluno/suporte (Chat com PT ou Bot de dúvidas)
    *   /aluno/evolucao (Nova sugestão: Gráficos de peso/medidas)

---

## 4. Detalhamento das Telas (Mock)

### Tela 1: Login (Comum)
*   **Visual:** Fundo preto, logo centralizado em amarelo. Formulário minimalista.
*   **Componentes:**
    *   Input: E-mail / CPF
    *   Input: Senha
    *   Radio Buttons (estilizados): [ ] Sou Aluno  [ ] Sou Personal
    *   Botão Amarelo: "Entrar no Treino"

---

### Módulo do Personal Trainer

#### Tela 2: Dashboard do Personal (Meus Alunos)
*   **Objetivo:** Visão rápida de quem treina hoje e gestão da carteira de clientes.
*   **Componentes:**
    *   **Header:** "Olá, Treinador [Nome]".
    *   **Lista de Alunos (Cards):** Cards clicáveis com foto, nome e status (Treinou hoje / Ausente).
    *   **Filtro:** Dia da semana (Segunda a Domingo) para ver quem tem treino focado hoje.

#### Tela 3: Detalhes do Aluno (A tela de "Cuidado")
*   **Objetivo:** Montar treino e focar na meta individualizada.
*   **Componentes:**
    *   **Header do Aluno:** Nome, Idade, Plano Atual.
    *   **Banner de Meta (Destaque Amarelo):** Um quadro que fica fixo no topo ao rolar a página. Ex: *"META: Hipertrofia de Glúteos. Lembre-se que ela tem condromalácia grau 1, cuidado com a amplitude do agachamento."*
    *   **Calendário Semanal (Fichas):** 
        *   Seg, Qua, Sex: Foco em Glúteos/Inferiores (para o perfil feminino padrão do mock).
        *   Ter, Qui: Superiores/Cardio.
    *   **Construtor de Treino:** Adicionar exercícios, séries, repetições, carga sugerida.

---

### Módulo do Aluno (Cliente)

#### Tela 4: Dashboard do Aluno
*   **Objetivo:** Saber o que fazer no dia e o status da matrícula.
*   **Componentes:**
    *   **Widget de Assinatura (Topo):** "Plano Trimestral - Ativo (Restam 45 dias)". Barra de progresso amarela.
    *   **Card Principal: Treino de Hoje:** Exibe o dia da semana e o grupo muscular. Ex: "Hoje é dia de GLÚTEOS E POSTERIOR".
    *   **Lista de Exercícios:** Checklists para marcar o que já fez. Ex: Agachamento Livre (4x12) [ ] Concluído.

#### Tela 5: Suporte e Tira-Dúvidas (Chat / Bot)
*   **Objetivo:** Auxiliar o aluno quando o PT não está fisicamente ao lado.
*   **Componentes:**
    *   **Seleção de Atendimento:** Botões "Falar com meu Personal" ou "GymBot (Dúvida Rápida)".
    *   **Interface do GymBot (IA):**
        *   *Aluno:* "Como faz o Stiff corretamente?"
        *   *GymBot:* Responde com dicas de postura (coluna reta, flexão leve do joelho) e embute um **iframe/thumbnail de um vídeo do YouTube** com a execução perfeita.
    *   **Chat com Personal:** Mensagens assíncronas para relatar dores, pedir mudança de treino, etc.

#### Tela 6: Evolução (Sugestão Extra)
*   **Objetivo:** Gamificação e motivação.
*   **Componentes:** Gráfico de linhas em amarelo mostrando o aumento de cargas nos principais exercícios ou evolução de medidas corporais.

---

## 5. Mock Data (Os 5 Exemplos de Alunos)

Dados simulados para o Banco de Dados preencher a interface do Personal Trainer:

| ID | Nome | Sexo | Plano | Foco Semanal Principal | Meta Cadastrada (Banner de Cuidado) |
|---|---|---|---|---|---|
| 01 | **Ana Clara** | F | Trimestral | Glúteos e Quadríceps | *Meta:* Ganho de volume no glúteo para o verão. *Obs:* Tem leve desconforto na lombar, preferir exercícios com apoio. |
| 02 | **Carlos Eduardo** | M | Mensal | Peito, Costas e Braços | *Meta:* "Ficar largo" (Hipertrofia superior). *Obs:* Muito focado, pode passar treinos intensos e técnicas avançadas (Drop-set). |
| 03 | **Beatriz Silva** | F | Diário | Glúteos e Abdômen | *Meta:* Definição muscular pós-emagrecimento. *Obs:* Focar em contração de pico e treinos metabólicos. Aluna nova, precisa de vídeos educativos. |
| 04 | **Marcos Vinícius**| M | Trimestral | Superiores e Core | *Meta:* Melhorar a postura e ganhar braço. *Obs:* Trabalha sentado o dia todo, incluir mobilidade de ombros no aquecimento. |
| 05 | **Juliana Costa** | F | Mensal | Inferiores Completo | *Meta:* Recuperação de força pós-lesão no joelho. *Obs:* Carga progressiva lenta. O cuidado com a execução é 100% da meta atual. |

---

## 6. Fluxo de Interação com o Bot (Exemplo de Caso de Uso)

1. Juliana (Aluno 05) está no Leg Press e esqueceu onde posicionar os pés para foco em glúteo.
2. Ela abre o app > Suporte > GymBot.
3. Digita: *"Posição dos pés no leg press para glúteo"*.
4. O Bot processa e responde:
   > *"Olá, Juliana! Para focar mais nos glúteos e posteriores no Leg Press, posicione seus pés **mais acima** na plataforma, na largura dos ombros. Mantenha o calcanhar firme e empurre por ele! Veja este vídeo curtinho de 1 minuto mostrando a execução na prática:"*
   > `[Card clicável com vídeo do YouTube sobre Leg Press Alto]`

## 7. Requisitos Técnicos Sugeridos para o Agente Desenvolvedor
*   **Frontend:** React, Next.js ou Angular (fácil componentização).
*   **Estilização:** Tailwind CSS (ótimo para padronizar o dark mode e as cores amarelas usando `bg-zinc-900` e `text-yellow-400`).
*   **Ícones:** Lucide React ou FontAwesome (ícones de halteres, mensagens, gráficos).
*   **Vídeos:** Integração via `iframe` da API do YouTube.