import requests
import threading
import time

api_key = "CHAVE_OPEN_ROUTER"

# Lê a base de conhecimento
with open("base.txt", "r", encoding="utf-8") as f:
    base_conhecimento = f.read()

headers = {
    "Authorization": f"Bearer {api_key}",
    "HTTP-Referer": "https://openrouter.ai",
    "Content-Type": "application/json"
}

# Animação de carregamento
def carregando(stop_event):
    spinner = ["|", "/", "-", "\\"]
    i = 0
    print("🎲 Gerando pergunta...", end="", flush=True)
    while not stop_event.is_set():
        print(f"\b{spinner[i % len(spinner)]}", end="", flush=True)
        time.sleep(0.2)
        i += 1
    print("\b✔️", flush=True)

# Início do jogo
print("\n🧠 Jogo de Perguntas com IA - Múltipla Escolha")
print("Baseado no conteúdo da base.txt")
print("Responda apenas com a letra da alternativa correta (A, B, C ou D).")
print("Digite 'sair' para encerrar.\n")

pontuacao = 0
rodada = 1

while True:
    stop_event = threading.Event()
    t = threading.Thread(target=carregando, args=(stop_event,))
    t.start()

    # Gera pergunta de múltipla escolha
    prompt_gerador = [
        {"role": "system", "content": (
            f"Você é um gerador de perguntas. Com base no texto abaixo, crie uma pergunta objetiva "
            f"de múltipla escolha com 4 alternativas (A, B, C, D). Ao final, diga apenas a letra correta "
            f"separada da pergunta por '###'.\n\n"
            f"Texto:\n{base_conhecimento}"
        )}
    ]

    payload = {
        "model": "mistralai/mistral-small-3.1-24b-instruct:free",
        "messages": prompt_gerador
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)

    stop_event.set()
    t.join()

    if response.status_code != 200:
        print("❌ Erro ao gerar pergunta.")
        break

    resposta_raw = response.json()["choices"][0]["message"]["content"]

    try:
        pergunta_texto, letra_correta = resposta_raw.strip().split("###", 1)
        letra_correta = letra_correta.strip().upper()
    except ValueError:
        print("❌ Erro no formato da pergunta. Pulando para a próxima...\n")
        continue

    print(f"\n🔹 Pergunta {rodada}:\n{pergunta_texto.strip()}")
    user_input = input("👤 Sua resposta (A, B, C ou D): ").strip().upper()

    if user_input in ["SAIR", "EXIT", "QUIT"]:
        print("\n🏁 Fim de jogo!")
        break

    if user_input == letra_correta:
        print("✅ Correto!\n")
        pontuacao += 1
    else:
        print(f"❌ Errado. A resposta correta era: {letra_correta}\n")

    rodada += 1

print(f"🏆 Sua pontuação final: {pontuacao} ponto(s)")