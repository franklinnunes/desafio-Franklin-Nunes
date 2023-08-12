import { cardapio, itensExtras, combos, pagamentosValidos } from './dados/cardapio'

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {

        let valorDaCompra = 0
        let carrinho = {}
        let itensPrincipais = []

        for (let informacoes of itens) {
            let [codigo, quantidade] = informacoes.split(',')

            let item = cardapio.find((item) => {
                //retorna true se o código for igual ao código procurado
                return item.codigo === codigo
            })

            if (!item) {
                return 'Item inválido!'
            }

            //verifica se o código esta na lista de extras
            if (codigo in itensExtras) {

                //caso true, verifica se foi adicionado ao carrinho
                if (!itensPrincipais.includes(itensExtras[codigo])) {
                    return 'Item extra não pode ser pedido sem o principal'
                }

                //se nao estiver na lista de combos, adiciona na lista de principais
            } else if (!combos.includes(codigo)) {
                itensPrincipais.push(codigo)
            }

            //se o codigo nao esta no carrinho
            if (!carrinho[codigo]) {
                carrinho[codigo] = 0
            }

            carrinho[codigo] += quantidade
            valorDaCompra += item.valor * quantidade
        }

        //verificar se o metodo de pagamento esta incluido no array pagamentosValidos
        if (!pagamentosValidos.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!'
        }

        if (metodoDePagamento === 'dinheiro') {
            valorDaCompra -= valorDaCompra * 0.05
        } else if (metodoDePagamento === 'credito') {
            valorDaCompra += valorDaCompra * 0.03
        }

        //verifica se o carrinho esta vazio a partir da lista de chaves do objeto
        if (Object.keys(carrinho).length === 0) {
            return 'Não há itens no carrinho de compra!'
        }

        if (valorDaCompra === 0) {
            return 'Quantidade inválida!'
        }

        return `R$ ${valorDaCompra.toFixed(2).replace('.', ',')}`
    }
}

export { CaixaDaLanchonete };


//dinheiro -5%
//credito +3%

