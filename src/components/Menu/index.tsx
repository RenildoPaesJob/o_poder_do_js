import { useState } from "react";
import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { PorductModal } from "../ProductModal";
import { Text } from "../Text";
import { Product } from "../types/Product";
import {
	AddToCardButton,
	ProductContainer,
	ProductDetails,
	ProductImage,
	Separator,
} from "./styles";

interface MenuProps {
	onAddToCart: (product: Product) => void;
}

export function Menu({onAddToCart}: MenuProps) {

	const [isProductModalVisible, setProductModalVisible] = useState(false)
	const [selectProduct, setSelectProduct] = useState<null | Product>(null)

	function handleOpenModal(product: Product){
		setProductModalVisible(true)
		setSelectProduct(product)
	}

	return (
		<>
			<PorductModal
				visible={isProductModalVisible}
				onClose={() => setProductModalVisible(false)}
				product={selectProduct}
				onAddToCart={onAddToCart}
			/>

			<FlatList
				style={{ marginTop: 32 }}
				contentContainerStyle={{ paddingHorizontal: 24 }}
				data={products}
				keyExtractor={(product) => product._id}
				ItemSeparatorComponent={Separator}
				renderItem={({ item: product }) => {
					return (
						<ProductContainer onPress={() => handleOpenModal(product)}>
							<ProductImage
								source={{
									uri: `http://192.168.1.16:3001/uploads/${product.imagePath}`,
								}}
							/>

							<ProductDetails>
								<Text weight="600">{product.name}</Text>

								<Text size={14} color="#667">
									{product.description}
								</Text>

								<Text size={14} weight="600" style={{ marginVertical: 8 }}>
									{formatCurrency(product.price)}
								</Text>
							</ProductDetails>

							<AddToCardButton onPress={() => onAddToCart(product)}>
								<PlusCircle />
							</AddToCardButton>
						</ProductContainer>
					);
				}}
			/>
		</>
	);
}
