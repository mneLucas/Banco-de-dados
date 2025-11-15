## API Reference

### Produtos

#### GET /produtos
- **Descrição**: Obtém uma lista de produtos
- **Response**: Array de produtos
- **Parameters**: Busca um único produto pelo idProduto
```
/produto?idProduto=123
```

###POST /produtos
- **Descrição**: Cria um novo produto
- **Body**:
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```
- **Response**:
```
{
    "message": "Produto cadastrado com sucesso!"
}
```
- **Error Response**:
```
{
    "Erro": "Campos obrigatórios não preenchidos."
}
```