import { ActivityIndicator } from "react-native";

import { useState }   from "react";
import { Button }     from "../components/Button";
import { Cart }       from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header }     from "../components/Header";
import { Menu }       from "../components/Menu";
import { TableModal } from "../components/TableModal";
import { CartItem }   from "../components/types/CartItem";
import { Product }    from "../components/types/Product";
import { products as mockProducts }   from "../mocks/products";

import {
	CategoriesContainer,
	Container,
	MenuContainer,
	Footer,
	FooterContainer,
	CenteredContainer
} from "./styles";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";

export function Main() {
	const [isTableModalVisible, setisTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable]             = useState("");
	const [cartItems, setCartItems]                     = useState<CartItem[]>([]);
	const [isLoading]                                   = useState(false);
	const [products]                                    = useState<Product[]>([])


	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	function handleResetOrder() {
		setSelectedTable("");
		setCartItems([]);
	}

	// function para colocar ou aumentar um item no cart
	function handleAddToCart(product: Product) {
		if (!selectedTable) {
			setisTableModalVisible(true);
		}

		setCartItems((prevState) => {
			// procurando se existe algum item dentro do array com o msm index/value
			// se ele encontrar algum item dentro do array com o msm index/value ele returnar o numero do index
			// se ele NAO encontrar ele return -1 = false
			const itemIndex = prevState.findIndex(
				(cartItem) => cartItem.product._id === product._id
			);

			// nao encontrou
			if (itemIndex < 0) {
				return prevState.concat({
					quantity: 1,
					product,
				});
			}

			const newCartItems = [...prevState];
			// o produto ja inserido no cart na posicao atual e todos seu atributos
			const item = newCartItems[itemIndex];

			// mantem o item que foi inserido anteriormente, modificando a quantity deste msm item add
			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity + 1,
			};

			return newCartItems;
		});
	}

	// function para diminuir um item no cart
	function handleDecrementCartItem(product: Product) {
		setCartItems((prevState) => {
			// procurando se existe algum item dentro do array com o msm index/value
			// se ele encontrar algum item dentro do array com o msm index/value ele returnar o numero do index
			// se ele NAO encontrar ele return -1 = false
			const itemIndex = prevState.findIndex(
				(cartItem) => cartItem.product._id === product._id
			);

			// pegando as info desse item na position itemIndex
			const item = prevState[itemIndex];
			const newCartItems = [...prevState];

			// se a quantidade de items dento do carrinho for igual a 1
			// remove o item
			if (item.quantity == 1) {
				newCartItems.splice(itemIndex, 1);
				return newCartItems;
			}

			// se for maior que 1, pega o item da vez e remova um an quantity
			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity - 1,
			};

			return newCartItems;
		});
	}

	return (
		<>
			<Container>
				<Header selectTable={selectedTable} onCancelOrder={handleResetOrder} />

				{isLoading && (
					<CenteredContainer>
						<ActivityIndicator color="#d73035" size={"large"}/>
					</CenteredContainer>
				)}

				{!isLoading && (
					<>
						<CategoriesContainer>
							<Categories></Categories>
						</CategoriesContainer>

						{products.length > 0 ? (
							<MenuContainer>
								<Menu onAddToCart={handleAddToCart} products={products}/>
							</MenuContainer>
						): (
							<CenteredContainer>
								<Empty />
								<Text color="#666" style={{ marginTop: 24 }}>
									Nenhum produto foi encontrado!
								</Text>
							</CenteredContainer>
						)}
					</>
				)}
			</Container>

			<Footer>
				<FooterContainer>
					{!selectedTable && (
						<Button
							onPress={() => setisTableModalVisible(true)}
							disabled={isLoading}
						>
							Novo Pedido
						</Button>
					)}

					{selectedTable && (
						<Cart
							cartItems={cartItems}
							onAdd={handleAddToCart}
							onSub={handleDecrementCartItem}
							onConfimOrder={handleResetOrder}
						/>
					)}
				</FooterContainer>
			</Footer>

			<TableModal
				visible={isTableModalVisible}
				onClose={() => setisTableModalVisible(false)}
				onSave={handleSaveTable}
			/>
		</>
	);
}
