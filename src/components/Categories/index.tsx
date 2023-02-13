import { useState } from "react";
import { FlatList } from "react-native";
import { Text } from "../Text";
import { Category } from "../types/Category";
import { CategoryContainer, Icon } from "./styles";

interface CategoriesProps{
	categories: Category[];
	onSelectCategory: (categoryId: string) => Promise<void>
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {

	const [selectedCategory, setSelectedCategory] = useState('')

	function handleSelectCategory (categoryId: string) {
		const category = selectedCategory === categoryId ? '' : categoryId

		onSelectCategory(category)
		setSelectedCategory(category)
	}

	return (
		<>
			<FlatList
				horizontal={true}
				contentContainerStyle={{ paddingRight: 24 }}
				showsHorizontalScrollIndicator={false}
				data={categories}
				keyExtractor={category => category._id}
				// o item e o retorno da function do flatlist, porem por boas
				// praticas renomeia pelo o objeto que dejesa renderizar
				renderItem={({item: category}) => {

					const isSelected = selectedCategory === category._id

					return (
						<CategoryContainer onPress={() => handleSelectCategory(category._id)}>
							<Icon>
								<Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
							</Icon>

							<Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
						</CategoryContainer>
					)
				}}
			/>
		</>
		// o mesmo codigo abaixo foi feito com o elemento nativo do RN
		// chamado FLATLIST
		// categories.map((category) => (
		// 	<Category key={category._id}>
		// 		<Icon>
		// 			<Text>{category.icon}</Text>
		// 		</Icon>

		// 		<Text size={14} weight="600">{category.name}</Text>
		// 	</Category>
		// ))
	)
}