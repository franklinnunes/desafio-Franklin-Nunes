import { cardapio, itensExtras, combos, pagamentosValidos } from './dados/cardapio'

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {

        let valorDaCompra = 0
        let carrinho = {}
        let itensPrincipais = []

        for (let informacoes of itens) {
            let [codigo, quantidade] = informacoes.split(',')

            let item = cardapio.find((item) => {
                return item.codigo === codigo
            })

            if (!item) {
                return 'Item inválido!'
            }

            if (codigo in itensExtras) {

                if (!itensPrincipais.includes(itensExtras[codigo])) {
                    return 'Item extra não pode ser pedido sem o principal'
                }

            } else if (!combos.includes(codigo)) {
                itensPrincipais.push(codigo)
            }

            if (!carrinho[codigo]) {
                carrinho[codigo] = 0
            }
            carrinho[codigo] += quantidade
            valorDaCompra += item.valor * quantidade
        }

        if (!pagamentosValidos.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!'
        }

        valorDaCompra = this.aplicarDescontosEAcrescimos(valorDaCompra, metodoDePagamento);

        if (Object.keys(carrinho).length === 0) {
            return 'Não há itens no carrinho de compra!'
        }

        if (valorDaCompra === 0) {
            return 'Quantidade inválida!'
        }
        return this.formatarValor(valorDaCompra)
    }

    aplicarDescontosEAcrescimos(valorDaCompra, metodoDePagamento) {
        if (metodoDePagamento === 'dinheiro') {
            return valorDaCompra -= valorDaCompra * 0.05
        } else if (metodoDePagamento === 'credito') {
            return valorDaCompra += valorDaCompra * 0.03
        } else {
            return valorDaCompra
        }
    }

    formatarValor(valorDaCompra) {
        return `R$ ${valorDaCompra.toFixed(2).replace('.', ',')}`
    }
}

export { CaixaDaLanchonete }