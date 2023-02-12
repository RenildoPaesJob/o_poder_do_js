import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderCorfirmModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import {
	Actions,
	Image,
	Item,
	ProductContainer,
	ProductDetails,
	QuatityContainer,
	Sumary,
	TotalContainer,
} from "./style";

interface CartProps {
	cartItems: CartItem[];
	onAdd: (product: Product) => void;
	onSub: (product: Product) => void;
	onConfimOrder: () => void;

}

export function Cart({ cartItems, onAdd, onSub, onConfimOrder }: CartProps) {

	const [isOrderCorfirmModalVisible, setOrderCorfirmModalVisible] = useState(false)

	const total = cartItems.reduce((acc, cartItem) => {
		return acc + cartItem.quantity * cartItem.product.price
	}, 0)

	function handleConfirmOrder(){
		setOrderCorfirmModalVisible(true)
	}

	function handleOk(){
		onConfimOrder()
		setOrderCorfirmModalVisible(false)
	}

	return (
		<>
			<OrderCorfirmModal
				onOk={() => handleOk()}
				visible={isOrderCorfirmModalVisible}
			/>


			{cartItems.length > 0 && (
				<FlatList
					data={cartItems}
					keyExtractor={(cartItems) => cartItems.product._id}
					showsVerticalScrollIndicator={false}
					style={{ marginBottom: 20, maxHeight: 160 }}
					renderItem={({ item: cartItem }) => (
						<Item>
							<ProductContainer>
								<Image
									source={{
										uri: `http://192.168.1.16:3001/uploads/${cartItem?.product?.imagePath}`,
									}}
								/>

								<QuatityContainer>
									<Text size={14} color="#666">
										{cartItem.quantity}x
									</Text>
								</QuatityContainer>

								<ProductDetails>
									<Text size={14} weight="600">
										{cartItem.product.name}
									</Text>
									<Text size={14} color="#666" style={{ marginTop: 4 }}>
										{formatCurrency(cartItem.product.price)}
									</Text>
								</ProductDetails>
							</ProductContainer>

							<Actions>
								<TouchableOpacity
									onPress={() => onAdd(cartItem.product)}
									style={{ marginRight: 24 }}
								>
									<PlusCircle />
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => onSub(cartItem.product)}
								>
									<MinusCircle />
								</TouchableOpacity>
							</Actions>
						</Item>
					)}
				/>
			)}

			<Sumary>
				<TotalContainer>
					{cartItems.length > 0 ? (
						<>
							<Text color="#666">Total</Text>
							<Text size={20} weight="600">
								{formatCurrency(total)}
							</Text>
						</>
					) : (
						<Text color="#999">Seu carrinho esta vazio</Text>
					)}
				</TotalContainer>

				<Button
					onPress={() => handleConfirmOrder()}
					disabled={cartItems.length === 0}
				>
					Confimar pedido
				</Button>
			</Sumary>
		</>
	);
}
