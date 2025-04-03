const canvas = document.getElementById('JogoCanvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keypress', (e) => {
    if(e.code=='Space'){
        personagem.saltar()
    }
})

class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade{
    #velocidade_y
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_y = 0 
        this.pulando = false
    }
    saltar(){
        this.#velocidade_y = 15
        this.pulando = true
    }
    atualizar(){
        if (this.pulando)
            this.y -= this.#velocidade_y
            this.#velocidade_y -= Jogo.gravidade
            if(this.y >= canvas.height - 50){
                this.#velocidade_y = 0
                this.y = canvas.height - 50
                this.pulando = false
            }
    }
    verificarColisão(){
        if(
            obstaculo.x < this.x + this.largura &&
            obstaculo.largura + obstaculo.x > this.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + this.altura > obstaculo.y
        ){
            obstaculo.velocidade_x = 0
            this.#velocidade_y = 0
            ctx.fillStyle = 'white'
            ctx.font = '50 px Arial'
            ctx.fillText('GAME OVER', 50, 150)
            Jogo.gameOver = true
            ctx.font = '20px Arial'
            console.log('teste')
            if(pontuacao_atual > pontuacao_maxima){
                localStorage.setItem('PM', pontuacao_atual)
                ctx.fillText(`NOVO RECORD: ${pontuação_atual}`, 50, 150)
                return
            }
            ctx.fillText(`Pontos da jogada: ${pontuação_atual}`, 50, 150)
        }   
    }
}

class Obstaculo extends Entidade{
    #velocidade_x
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_x = 3
    }
    atualizar(){
        this.x -= this.#velocidade_x
    if (this.x <= 0 - this.largura){
        this.x = canvas.width 
        this.#velocidade_x += 1
        let nova_altura = Math.random()* (150-90) + 90 
        this.altura = nova_altura
        this.y = canvas.height - nova_altura
        }
    } 
}

class Jogo {
    static gravidade = 0.5
    static gameOver = false
    constructor() {
        this.loop = this.loop.bind(this)
    }
    loop() {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        obstaculo.desenhar()
        personagem.desenhar()
        personagem.atualizar()
        obstaculo.atualizar()
        personagem.verificarColisão()
        requestAnimationFrame(this.loop)
    }
}

const entidade = new Entidade(100,100,50,50,'red')
const personagem = new Personagem(100, canvas.height-50, 50, 50, 'gray')
const obstaculo = new Obstaculo(canvas.width - 50, canvas.height - 100, 50, 100, 'pink' )

const jogo = new Jogo()
jogo.loop()
