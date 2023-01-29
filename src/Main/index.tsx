import { useState } from "react";
import { Button } from "../components/Button";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { TableModal } from "../components/TableModal";
import {
	CategoriesContainer,
	Container,
	MenuContainer,
	Footer,
	FooterContainer,
} from "./styles";

export function Main() {
	const [isTableModalVisible, setisTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable]             = useState('');

	function handleSaveTable(table: string) {
		setSelectedTable(table)
	}

	function handleCancelOrder(){
		setSelectedTable('')
	}

	return (
		<>
			<Container>
				<Header
					selectTable={selectedTable}
					onCancelOrder={handleCancelOrder}
				/>

				<CategoriesContainer>
					<Categories></Categories>
				</CategoriesContainer>

				<MenuContainer>
					<Menu />
				</MenuContainer>
			</Container>

			<Footer>
				<FooterContainer>
					{!selectedTable && (
						<Button onPress={() => setisTableModalVisible(true)}>
							Novo Pedido
						</Button>
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
